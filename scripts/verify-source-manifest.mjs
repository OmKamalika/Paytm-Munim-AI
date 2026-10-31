import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const paths = [
  'data/synthetic',
  'data/synthetic-v3',
  'data/synthetic-v4',
  'specs/prds',
  'specs/workbooks',
  'specs/legacy-fixture',
  'specs/source-notes',
];
const manifestPath = join(root, 'specs', 'SOURCE_MANIFEST.json');

async function filesIn(folder) {
  const entries = await readdir(join(root, folder), { withFileTypes: true });
  const found = [];
  for (const entry of entries) {
    const child = join(folder, entry.name);
    if (entry.isDirectory()) found.push(...await filesIn(child));
    else if (entry.isFile()) found.push(child.replaceAll('\\', '/'));
  }
  return found;
}

const files = (await Promise.all(paths.map(filesIn))).flat().sort();
const records = await Promise.all(files.map(async (path) => {
  const bytes = await readFile(join(root, path));
  return {
    path,
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
}));
const counts = {
  prdMarkdown: records.filter((item) => /^specs\/prds\/\d{2}-.*\.md$/.test(item.path)).length,
  excelWorkbooks: records.filter((item) => item.path.endsWith('.xlsx')).length,
  syntheticCsv: records.filter((item) => /^data\/synthetic\/.*\.csv$/.test(item.path)).length,
  sourceGenerators: records.filter((item) => /^data\/synthetic\/.*\.py$/.test(item.path)).length,
  syntheticV3Csv: records.filter((item) => /^data\/synthetic-v3\/csv\/.*\.csv$/.test(item.path)).length,
  syntheticV3Generators: records.filter((item) => /^data\/synthetic-v3\/.*\.py$/.test(item.path)).length,
  syntheticV3InvoiceJson: records.filter((item) => /^data\/synthetic-v3\/invoices\/.*\.json$/.test(item.path)).length,
  syntheticV3RebitFiles: records.filter((item) => /^data\/synthetic-v3\/rebit\/.*\.(json|xml)$/.test(item.path)).length,
  syntheticV4Csv: records.filter((item) => /^data\/synthetic-v4\/csv\/.*\.csv$/.test(item.path)).length,
  syntheticV4Generators: records.filter((item) => /^data\/synthetic-v4\/.*\.py$/.test(item.path)).length,
  syntheticV4InvoiceJson: records.filter((item) => /^data\/synthetic-v4\/invoices\/.*\.json$/.test(item.path)).length,
  syntheticV4RebitFiles: records.filter((item) => /^data\/synthetic-v4\/rebit\/.*\.(json|xml)$/.test(item.path)).length,
  legacyJsonFixture: records.filter((item) => /^specs\/legacy-fixture\/.*\.txt$/.test(item.path)).length,
};
const expected = { prdMarkdown: 25, excelWorkbooks: 5, syntheticCsv: 15, sourceGenerators: 2,
  syntheticV3Csv: 18, syntheticV3Generators: 4, syntheticV3InvoiceJson: 7, syntheticV3RebitFiles: 2,
  syntheticV4Csv: 20, syntheticV4Generators: 5, syntheticV4InvoiceJson: 7, syntheticV4RebitFiles: 4, legacyJsonFixture: 1 };
if (JSON.stringify(counts) !== JSON.stringify(expected)) {
  throw new Error(`Source set incomplete: ${JSON.stringify(counts)}; expected ${JSON.stringify(expected)}`);
}
const manifest = { description: 'User-supplied synthetic source files and project references; all hashes are SHA-256.', counts, files: records };

if (process.argv.includes('--write')) {
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote ${relative(root, manifestPath)} with ${records.length} source files.`);
} else {
  const stored = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (JSON.stringify(stored) !== JSON.stringify(manifest)) throw new Error('Source manifest does not match the bundled files.');
  console.log(`Verified ${records.length} source files: ${counts.prdMarkdown} PRD markdown, ${counts.excelWorkbooks} Excel, ${counts.syntheticCsv + counts.syntheticV3Csv + counts.syntheticV4Csv} CSV, ${counts.sourceGenerators + counts.syntheticV3Generators + counts.syntheticV4Generators} generators, ${counts.syntheticV3InvoiceJson + counts.syntheticV4InvoiceJson} invoice JSON, ${counts.syntheticV3RebitFiles + counts.syntheticV4RebitFiles} ReBIT files, and the legacy fixture.`);
}
