# PRD-12 · Language layer (Hindi, Hinglish, English)

**Product:** PayTMunim · **Phase:** 0 (typed) · voice in Phase 2 (PRD 21) · **AI:** Yes
**Depends on:** none · **Feeds:** 02 Munim agent, 16 Rules by voice, 21 Soundbox voice
**Status:** v1 · 30 Oct 2026

---

## 1. Summary

Owners write the way they talk: "Diwali ke liye kitna maal uthaun", "दिवाली के लिए कितना माल उठाऊं", or English. This layer detects the language and script, keeps shop vocabulary intact (maal, udhaar, kiraya, tankhwah), and makes sure answers come back in the owner's language with rupees in lakh and crore. Numbers are formatted by code, never translated by the LLM.

## 2. Problem

Most kirana owners don't run their business in English. A Hindi question answered in English, or "₹184,500" instead of "₹1.84 lakh", breaks trust. Translation is also where numbers go wrong.

## 3. Scope

**In (Phase 0):** Hindi in Devanagari, Hindi in Latin script (Hinglish), English; reply language setting; Indian number formatting; a shop glossary.
**Phase 2:** Marathi; speech-to-text and text-to-speech (PRD 21).
**Out:** other Indian languages until the pilot shows demand.

## 4. User journey

1. First open: "Which language should your Munim reply in? Hindi · Hinglish · English" (default: match how you write).
2. Owner types in Hinglish; reply comes in Hinglish (or the chosen language).
3. Owner switches to English mid-chat; the next reply follows the setting, not the switch, unless the setting is "match how I write".
4. More > Language changes it any time.

## 5. Functional requirements

| ID | Requirement |
|---|---|
| FR-01 | Detect language and script per message: `hi-Deva`, `hi-Latn`, `en`, `mixed`. Code-mixed text with any Hindi words counts as `hi-Latn`. |
| FR-02 | Reply language = setting; if "match", the language of the owner's last message. |
| FR-03 | All amounts are formatted by code: ≥ ₹1 lakh as "₹1.8 lakh" (one decimal) in prose, "₹1,84,500" in tables; ≥ ₹1 crore as "₹1.2 crore". Digits stay Western (0-9) in every script. |
| FR-04 | Dates as "5 Nov" in English and Hinglish, "5 नवंबर" in Devanagari. |
| FR-05 | The glossary maps shop words to meanings for tool selection: maal (stock), udhaar (credit), kiraya (rent), tankhwah/salary (salary), kharcha (expense), galla (cash drawer), hisaab (accounts), beopari/supplier, byaaj (interest), kist (EMI). |
| FR-06 | Translation of the answer happens before numbers are filled in; the ground check (PRD 02) runs on the final localised text. |
| FR-07 | Names of people, shops, lenders and suppliers are never translated. |
| FR-08 | UI strings are in resource files per language; no machine translation of UI at runtime. |
| FR-09 | If detection confidence is low, reply in the setting's language and never guess a third language. |

## 6. Edge cases

| ID | Case | Expected |
|---|---|---|
| EC-01 | One-word message: "kiraya?" | Detected Hinglish; answers next rent date and amount. |
| EC-02 | Hindi with English numbers: "2 lakh ka loan" | Parsed as ₹2,00,000. |
| EC-03 | Numbers in words: "do lakh", "dedh lakh", "dhai hazaar" | Parsed to 2,00,000; 1,50,000; 2,500. |
| EC-04 | Marathi message (Phase 0) | "Marathi is coming soon. Shall I reply in Hindi?" |
| EC-05 | Spelling variants: "kitna/kitnaa/kitni", "maal/mal" | Same intent. |
| EC-06 | Mixed scripts in one message | Treated as Hinglish. |
| EC-07 | Lakh vs million confusion in English | Always lakh/crore in output; English input "200k" parsed as ₹2,00,000. |

## 7. Acceptance criteria

```gherkin
AC-01 Hinglish in, Hinglish out
  Given reply language is "match how I write"
  When the owner types "Diwali ke liye kitna maal uthaun?"
  Then the reply is in Hindi written in Latin script

AC-02 Devanagari in, Devanagari out
  Given reply language is "match how I write"
  When the owner types "दिवाली के लिए कितना माल उठाऊं?"
  Then the reply is in Devanagari
  And amounts use Western digits, e.g. "₹1.8 लाख"

AC-03 Setting wins
  Given reply language is set to English
  When the owner types in Hinglish
  Then the reply is in English

AC-04 Number words
  Given the owner types "dedh lakh ka maal kam karun toh?"
  When the question is parsed
  Then the tool receives 150000

AC-05 Numbers survive translation
  Given an English answer with ₹1,84,500 and 5 Nov
  When it is rendered in Devanagari
  Then the same amount and date appear, in Indian grouping

AC-06 Names untouched
  Given an answer naming Gupta Distributors and Lender A
  When rendered in Hindi
  Then both names appear unchanged
```

## 8. Textual wireframes

**First-run language picker**
```
┌──────────────────────────────────────────┐
│ Your Munim speaks your language          │
├──────────────────────────────────────────┤
│ ( ) हिंदी                                 │
│ ( ) Hinglish (Hindi in English letters)  │
│ ( ) English                              │
│ (●) Match how I write                    │
├──────────────────────────────────────────┤
│ Marathi coming soon                      │
│ [ Continue ]                             │
└──────────────────────────────────────────┘
```

**More > Language** shows the same options with the current one ticked.

## 9. Evals

| ID | Eval | Data | Pass (hackathon) | Pass (pilot) |
|---|---|---|---|---|
| EV-01 | Language and script detection | 150 messages (50 each) incl. 30 code-mixed | ≥ 98% | ≥ 98% |
| EV-02 | Reply language match | agent golden set (PRD 02) | ≥ 98% | ≥ 98% |
| EV-03 | Parity | tool-selection accuracy in Hindi and Hinglish vs English on the same 20 questions | within 3 points | within 2 points |
| EV-04 | Number parsing | 80 amount phrases (do lakh, dedh lakh, 2.5L, 200k, ढाई हज़ार) | 100% | 100% |
| EV-05 | Number formatting | every rendered amount in the golden answers | 100% Indian grouping | 100% |
| EV-06 | Glossary understanding | 40 questions using shop words | ≥ 95% correct tool | ≥ 95% |
| EV-07 | Fluency | 2 native Hindi speakers rate 30 answers (1-5) for naturalness | ≥ 4.0 | ≥ 4.2 |
| EV-08 | Fidelity | numbers and names identical across language versions of the same answer | 100% | 100% |

## 10. Metrics (pilot)

Share of questions by language; fallback to English rate; owner switches of language setting; thumbs down by language.

## 11. Open questions

1. Which speech provider for Hindi and Marathi in Phase 2? Evaluate against EV-04 and EV-07 on recorded shop audio.
2. Should Hinglish replies use English for financial terms (APR, EMI) or Hindi (byaaj dar, kist)? Default: English terms, Hindi sentence.
