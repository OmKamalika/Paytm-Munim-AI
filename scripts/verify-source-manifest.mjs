import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const paths = [
  'data/synthetic',
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
  legacyJsonFixture: records.filter((item) => /^specs\/legacy-fixture\/.*\.txt$/.test(item.path)).length,
};
const expected = { prdMarkdown: 25, excelWorkbooks: 3, syntheticCsv: 15, sourceGenerators: 2, legacyJsonFixture: 1 };
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
  console.log(`Verified ${records.length} source files: ${counts.prdMarkdown} markdown, ${counts.excelWorkbooks} Excel, ${counts.syntheticCsv} CSV, ${counts.sourceGenerators} generators, and the legacy JSON fixture.`);
}
