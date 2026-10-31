# PayTMunim: 3-minute demo video script

**Title card idea:** "PayTMunim: an AI munim that can't move money on its own."
**Length:** 3:00 · about 430 spoken words · screen recording with voiceover.
**One idea to land:** the AI plans, the code checks, only the owner approves.

## Before you hit record

1. Restart the dev server so the evidence log starts empty. Run `npm run dev`.
2. Make sure the PIN is configured (`npm run configure:pin`) and you know it.
3. Window A, left: the merchant app at `/`. Window B, right: `/simulator`. Side by side, browser zoom about 90%.
4. Start on Home. Do not reload the merchant tab during the take. RiskOps cases live in the page, and a reload clears them.
5. Rehearse the order: **request in A, then dispatch in B.** A dispatch sent before the request is ignored.
6. Add a small on-screen caption for the whole video: "Synthetic data. Every payment is simulated."

## Script

### 0:00–0:20 · The scene (Window A, Home)

**On screen:** Home. Hold on the amber card "Cash may run short on 5 Nov −₹1,84,500". Point to "Above zero on 7 Nov".

**Voiceover:**
"Meet Rakesh Sharma. Three outlets in Mumbai, and Diwali is days away. He has lakhs of stock to buy, then salaries, rent and bonus. Today he finds out he's short on the day, at the counter. PayTMunim tells him on the thirtieth: a projected shortfall of one lakh eighty-four thousand, on the fifth of November."

### 0:20–0:45 · The plan (Window A, Plan)

**On screen:** Tap "Review relief options & scenarios". Show the three-point chart, then scroll to "Three ways to cover the gap".

**Voiceover:**
"It doesn't just warn him. It lays out three ways out, ordered by cost. Ask the supplier to defer: free, if he agrees. Draw two lakh from Lender A: about twenty-six hundred rupees. Or cut the stock order, at roughly twenty-eight thousand in margin. Every figure comes from code, not from the model."

### 0:45–1:40 · The guarded drawdown (split screen)

**On screen:** Tap the Lender A option, or go to Capital. Tap "Request lender offers". The card shows "Requested - waiting (simulated)".

**Voiceover:**
"Rakesh asks for lender offers. Now watch the right side. This simulator is the outside world: the lender, the bank, the supplier."

**On screen:** Window B, tap "Lenders: A, B and C". Back in A, the three offers appear with "Under cap" pills. Lender A is selected. Tap "Review guard and owner PIN".

**Voiceover:**
"Offers arrive. Lender A is under his EMI cap. Before any money moves, the Intent Guard runs."

**On screen:** Guard screen. Scroll slowly down the rule list: owner destination, amount limit, EMI cap, duplicate check, PIN configured. Let the green ticks show.

**Voiceover:**
"Is the money going to his own verified account? Within his two-lakh limit? Under the EMI cap? Not a duplicate? All checks pass in code. The AI can stop an action. It can never approve one."

**On screen:** Type the PIN, tap "Approve and simulate". Hold on "Done (simulated) - 5 Nov now ₹15,500".

**Voiceover:**
"Only Rakesh's PIN approves it. The fifth of November goes from minus one lakh eighty-four thousand to plus fifteen thousand five hundred."

### 1:40–2:20 · The attack (split screen, supplier)

**On screen:** Go to Supplier terms. Tap "Request supplier response". Window B: tap "Supplier: changed account". Back in A, the reply appears. Tap "Check received response".

**Voiceover:**
"Now the dangerous part. Gupta, his supplier, replies, and quietly says: pay our new account, ending nine-nine-one-zero."

**On screen:** Guard screen turns to "This action cannot proceed". Zoom on the failing account line ("differs from the verified account"). Then on "Needs verification" for the invoice.

**Voiceover:**
"Blocked. The account doesn't match the one Rakesh verified. And the invoice body is missing, so it refuses to guess. It fails closed. Terms that drift, like shorter credit or no buyback, escalate with the exact change spelled out."

### 2:20–2:45 · Proof and control (Evidence, then RiskOps)

**On screen:** Open Evidence. Show "Hash chain verified" and the entries. Then tap "Open RiskOps trace", or the RiskOps view button. Show the case, then the original goal against the supplier's proposal, then the pause control. Toggle pause.

**Voiceover:**
"Every attempt leaves evidence, hash-chained, so tampering shows up. And RiskOps sees the same case, original intent against what the supplier proposed, with one switch to pause the delegate."

### 2:45–3:00 · The close (back to Home, or the title card)

**On screen:** Return to Home, or cut to the closing card: "Rules in code. The owner decides. Paytm holds no money."

**Voiceover:**
"Every seth had a munim. Now every outlet gets one: one that plans the cash, lines up credit, and moves money only inside the owner's rules. All data here is synthetic and every payment is simulated."

## What not to say

- Do not call "Ask Munim" a live AI. It is a scripted matcher in this build.
- Do not describe the AI intent check as an LLM. It is deterministic here.
- Do not try to complete a supplier payment. It always ends in "Needs verification", which is the point of the attack segment.

## Backup cuts if you run over

- Drop the stock-cut option sentence in the plan segment (about 6 seconds).
- Skip the "Terms that drift" sentence in the attack segment (about 8 seconds).
- Skip the RiskOps pause toggle and end on "Hash chain verified" (about 10 seconds).
