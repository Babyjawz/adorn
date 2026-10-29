# Riddle maker quick start

Updated 29 October 2026 for the fixed four-pane editor, tiered payments, extra clues and optional OpenRouter assistance. Detailed fields, JSON and troubleshooting: [Riddle maker manual](RIDDLE_AUTHORING.md). Seller setup/voice builds: [ASF guide](docs/nexus/ASF_GUIDE.md).

## Make a riddle without AI

1. Unlock author tools in **MCM → Adorn** with the supplied author code. Open **Riddles → New riddle**.
2. In **Answers & challenge**, select **Choose answer item** and quantity. One item is enough. Use **Add another required item** for more: 1–8 distinct miscellaneous items, quantities 1–99 each. All are required together; cancelling an extra picker keeps earlier choices.
3. New entries start **Easy**. Set reward tier, clue difficulty and acquisition effort separately. Theme/family and access/delivery fields are under advanced settings. Availability prose guides writing; it creates no quest conditions.
4. In **Writing & clue**, write the initial **Riddle** and optional **Seller's extra clue**. Make every item/quantity fairly deducible without naming the answer.
5. Select **Save riddle**. Existing accepted orders and remembered tiered offers keep their original terms.

The four panes are library, answers/challenge, writing/clue and Assistance. There is one shared draft. Controller right-stick up/down scrolls the focused pane; shoulder buttons change panes. Accept selects a dropdown item; Back closes its list.

## Get optional writing suggestions

1. In rightmost **Assistance → Set up assistance**, save your own OpenRouter key and select a free, paid or custom model. Dots and **Key saved** confirm local Windows storage, not account validity. The real input clears. **Remove key** deletes it.
2. Model, writing voice and provider-data preference autosave for the same Windows account/PC. Wait for saved-status feedback. Preferences and the separate key are outside mods, saves and exports.
3. Choose real items, quantities and Easy/Medium/Hard. Missing prerequisites appear together. No required Review/JSON step exists; **What is sent** optionally explains context.
4. Select **Generate suggestions (uses API credit)** once. Model selection alone sends no request. Pending feedback and **Cancel generation** appear; a sent request may still cost credit after cancellation.
5. Browse **Suggestion 1 of 3**. **Use riddle**, **Use extra clue** or **Use both** copies only that wording into the shared editor. Combine alternatives and edit, then **Save riddle** yourself. Applying does not save or make another request.

Manual wording edits keep alternatives; answer/profile changes clear obsolete ones. Late replies are rejected after context changes. Errors preserve your draft and saved pool.

Requests send answer names/quantities, profile/tier-rule context, persona and writing facts to OpenRouter and its provider. Existing riddle/hint/question wording, FormIDs, paths, saves and recordings are excluded. The key authenticates the request. Keep private information out of free-text context.

**Allow providers that may store or train on writing requests** defaults off. Enable only if you intend that broader policy; account restrictions still apply. Free capacity and structured-output support vary, with no paid fallback. See [assistance details](RIDDLE_AUTHORING.md#optional-openrouter-assistance) and the [dated model guide](OPENROUTER_AUTHOR_MODEL_GUIDE.md).

## Enable a balanced tier pool

1. Save reviewed entries in **all three tiers**. Existing entries remain **Unclassified**; tiers are off by default.
2. Expand library **Tier settings**. Review coverage/thresholds, enable tiered selection, then **Save tier rules**. Saving one riddle does not enable tiers.
3. Test every allowed delivery type at the lowest supported level. Minimum-level/delivery filtering applies only in tier mode. Unclassified entries do not fill classified buckets.

Default classification uses total base armour and strongest piece: **Medium at 40 total or 20 on one piece; Hard at 80 total or 40 on one piece**. Zero-armour clothing defaults Easy. Skills, temporary effects and decorative piece count add no cost. Enchantment power/prestige are not inferred: calibrate and add minimum-tier overrides as needed.

Missing eligible coverage stops the new order and preserves the current one. Recent IDs/families are avoided when alternatives exist. Same seller + pieces + order type + classified tier keeps its accepted offer within the save, including after cancellation/reset. Limits are 512 distinct offers and 64 history entries.

## Prepare an extra clue

1. Assign the intended seller. Save the extra clue/question in **Riddles**.
2. Expand **Clue dialogue & optional recording**. Choose **Prepare clue dialogue** for silent subtitles/lip data, or **Record / choose audio for this clue** for a take matching the saved hint.
3. Use normal ASF Build. After **Build complete**, save, exit Skyrim, allow installation to finish, then restart. Python/installed CK audio tools remain author requirements; portable eSpeak and FFmpeg are bundled.
4. Ask for help on a pending, discovered order. Exact prepared help must match seller/order. Repeating it charges nothing and does not reroll. No hint or stale preparation means no Clue question.

Edit words in Riddles. Archived prepared versions support earlier accepted orders; preserve matching output when updating. No recording is required. Silent preparation packages silence/lip data, not audible generated speech.

## Test before sharing

Use a backup save and check first-order **Find [seller]**, complete/incomplete hand-ins, both delivery types, save/reload, fixed offers, archived hints and two-seller isolation. Start a genuine New Game to check fresh personal progress with shared setup retained. For recovery use **MCM → Adorn → Troubleshooting → Reset seller encounter…**; it preserves outfits, learned recipes, completed rewards and fixed prices.

Check silent and recorded clues in Skyrim, including actual mouth movement. Manual writing/gameplay must work without a key. For assistance, test errors, cancellation and changing an answer while a reply is pending. Never send your key.

Development checks pass; the full Skyrim tier/Clue loop and successful live generation still need acceptance. Synthetic free checks encountered privacy/rate/output limits. Record results against [the current test evidence](RIDDLE_TIERS_TEST_RESULTS.md).
