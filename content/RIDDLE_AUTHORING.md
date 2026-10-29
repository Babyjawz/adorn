# Adorn riddle maker manual

Create an item payment first, then write a fair riddle that points to it. The current editor supports manual writing, optional OpenRouter suggestions, reward tiers, and an extra clue spoken or subtitled by the assigned seller.

Updated for 29 October 2026. For a first entry, use the [quick start](RIDDLE_TIERS_QUICK_GUIDE.md); for seller setup, recordings and recipes, use the [ASF guide](docs/nexus/ASF_GUIDE.md). The tier/Clue workflow is implemented and checked offline. Complete Skyrim hand-ins, playback/lip movement and successful live generation remain acceptance work: see [test evidence](RIDDLE_TIERS_TEST_RESULTS.md).

## Open the editor

Unlock author tools through **MCM → Adorn → Developer access code** using the code supplied by the project/modlist author, then open **Riddles**. The code is a convenience gate. The accepted unlock persists in local MCM settings; the input clears after use. Untick **Developer tools unlocked** to lock it again.

Four panes remain visible throughout editing:

| Pane | Use it for |
| --- | --- |
| Riddle library | Select, search or create an entry; expand pool-wide **Tier settings** |
| **Answers & challenge** | Payment items, quantities, tier, difficulty, effort and access/delivery metadata |
| **Writing & clue** | Initial riddle, extra clue, clue dialogue and **Save riddle** |
| **Assistance** | Optional key/model setup, writing voice, suggestions and apply controls |

There is one shared writing draft. Assistance does not replace it. Advanced sections collapse within their panes, and dropdowns open below their field.

With a controller, move focus with the left stick/D-pad and change panes with shoulder buttons. Right-stick up/down scrolls the **focused pane**. Accept chooses a menu item; Back closes it. Scroll long writing/expanded settings inside their pane, including at enlarged text sizes.

## Make your first riddle

1. Choose **New riddle** from the library.
2. Select **Choose answer item**. Search loaded miscellaneous items by name, EditorID or plugin and choose the exact item. Set its quantity beside the selector.
3. Keep one item for the first test. **Add another required item** appears after the first choice; every listed item is required together. Cancelling an additional picker keeps earlier choices.
4. New entries start **Easy**. Set clue difficulty and acquisition effort to reflect your payment.
5. Write the **Riddle** in **Writing & clue**. Explain quantity fairly without naming the answer. Add an optional **Seller's extra clue** that narrows the answer without simply giving it away.
6. Select **Save riddle** and read the result. Adorn supplies an internal ID for a new entry.
7. Test on a new offer with a collectable answer. Existing accepted orders and remembered tiered offers keep their terms.

For one iron ingot, an initial clue might be: “Drawn from stone and tempered by fire, I wait for the smith's next design. Bring one.” An extra clue might be: “Look for a common metal already cast into a bar.”

This is a writing exercise, not a balance recommendation. Ask someone who has not seen the answer whether it points to the intended material rather than several metals. Sharpen ambiguous wording before release.

## Understand the fields

| Field | Meaning and behavior |
| --- | --- |
| Answer item / Quantity | Exact MISC record and count consumed at hand-in; 1–8 distinct items, 1–99 of each |
| Reward tier | Matches this payment to an Easy/Medium/Hard reward when tiers are enabled; Unclassified supports legacy content |
| Clue difficulty | 1 direct, 2 some deduction, 3 subtle. Does not automatically change reward tier |
| Acquisition effort | 1 accessible, 2 collection/travel, 3 substantial effort. Does not inspect rarity or quest access |
| Theme | Writing context, such as metalwork or wilderness |
| Answer family | Shared label such as `ingots` used to reduce related answers in tier mode; use consistent spelling/case |
| Minimum player level | Tier-mode eligibility, from 1–1000 |
| Order type | Tier-mode eligibility for recipe, finished outfit or both |
| Verified availability / writing facts | Facts for writing/assistance. Prose creates no quest, faction, location or inventory condition |
| Riddle | Initial player-facing wording; JSON calls this `clue` |
| Seller's extra clue | Optional help reply; JSON calls this `profile.hint` |
| Player's clue question | Prompt leading to help; defaults to “Could you give me a clue?” |
| Internal riddle ID | Stable unique identity. Keep stable for updates; do not reuse for unrelated content |

**Tier, difficulty and effort are separate decisions.** A cryptic clue for a common object is not automatically an expensive payment. A rare answer is not accessible just because its wording is obvious.

| Text | Maximum UTF-8 bytes |
| --- | --- |
| Internal ID | 80 |
| Initial riddle | 500 |
| Extra clue | 300 |
| Player clue question | 80, nonempty |
| Theme / family | 80 each |
| Availability facts | 500 |
| Assistance writing voice | 1000 |

Native validation counts UTF-8 **bytes**. Accented text, emoji and some punctuation use several bytes per character; shorten text if a visually short entry is rejected.

## Use tiers deliberately

### Legacy mode

Tiers are **off by default**. Entries without profiles remain **Unclassified**. With tiers off, Adorn randomly chooses valid loaded entries; profile tier, minimum-level and order-type filters and recent-family avoidance are not applied. Setting one entry to Hard does not enable the pool-wide system.

The three starter ingot riddles are functional examples, not a complete tiered economy.

### Enable tier selection

1. Save reviewed Easy, Medium and Hard entries. Include alternatives rather than one repetitive answer per tier.
2. Expand **Tier settings** in the library. Review coverage and thresholds.
3. Check **Use tiered selection for new orders**, then **Save tier rules**. This is separate from **Save riddle**.
4. Test every tier at the lowest supported level for each allowed order type. Basic coverage cannot prove every combination is eligible.

Unclassified entries do not fill a classified bucket. Missing same-tier content stops the new order with an explanation and preserves the current order, rather than substituting an easier bucket.

### How rewards are classified

The classifier counts each distinct selected reward record once, using its **base armour rating**. It considers total rating and the strongest individual piece. Skills, temporary effects and the player's worn armour total are excluded.

| Default condition | Minimum tier |
| --- | --- |
| Total at least 80, or any one piece at least 40 | Hard |
| Otherwise, total at least 40, or any one piece at least 20 | Medium |
| Otherwise | Easy |
| Total base armour is zero | Configured clothing tier, Easy by default |
| Explicit piece override | At least the override tier |

With defaults, a single 20-rating piece is Medium; a single 40-rating piece is Hard; four distinct 10-rating pieces total 40 and are Medium. Zero-rating accessories add no piece-count fee. A prestigious zero-armour robe is ordinary clothing unless you review its override or clothing rule.

Enchantment strength, prestige, armour class, monetary value and quest access are not inferred. Calibrate for the modlist. Hard total and strongest-piece thresholds must each exceed their Medium equivalents.

### Exceptional piece overrides

Expand **Exceptional piece overrides** under Tier settings. For example:

~~~json
[{"plugin":"Example.esp","local":2048,"tier":"hard"}]
~~~

This sets a floor for hexadecimal local FormID `000800`, expressed here as decimal `2048`. Override `local` is a decimal number; answer `localFormId` is a six-digit hexadecimal string. Neither uses the runtime load-order prefix.

Overrides raise floors, not discount stronger rewards. Supported tiers are `easy`, `medium`, `hard`; up to 2000 distinct overrides are accepted. Use the actual defining plugin and valid piece in your installation.

### Repeats and accepted offers

Tier mode avoids the last five riddle IDs and nonempty answer-family labels when eligible alternatives exist. If all candidates are recent, it reuses eligible content. A varied pool makes this useful.

Accepted tiered offers are remembered by seller, set of reward pieces, order type and classified tier within the save. Reordering pieces, cancellation and encounter reset do not reroll the price. A new game starts empty. Changing author rules so a reward changes tier creates a different offer identity.

Up to 512 distinct offers and 64 history entries are retained. A new distinct offer at the limit reports an error. Accepted wording/items remain snapshots after pool edits or deletion.

## Prepare the seller's extra clue

The initial riddle in the order panel and a compiled seller help reply are separate. Saving text does not install dialogue.

1. Assign the intended seller and save a nonempty extra clue.
2. Expand **Clue dialogue & optional recording** in **Writing & clue** and review the question.
3. For silent help, select **Prepare clue dialogue**. ASF builds the seven core exchanges plus authored clues, with silent audio/lip data using its bundled timing guide.
4. For voiced help, select **Record / choose audio for this clue**. Record/import, trim, preview and choose a take matching the saved hint. Edit wording in **Riddles**, not the recorder.
5. Use normal ASF Build. After **Build complete**, save, exit Skyrim, allow installation to finish, then restart.
6. Ask the assigned seller for help on a pending, discovered order. Check words, sound, subtitles and actual mouth movement, including after save/reload.

Only exact matching prepared help is offered for that seller/order. No hint means no question. Asking repeats the accepted hint without payment, rerolling or order progression. Missing/stale help hides the option rather than playing another hint.

Archived prepared versions support earlier accepted orders after edits/deletion. Preserve matching records, manifests and audio when updating. Reselect recorded audio after wording changes to bind the new clue version.

Silent preparation needs the [ASF author dependencies](SELLER_NEXUS_REQUIREMENTS.md#authoring-tools). eSpeak makes a temporary timing guide; its speech is not packaged. Live AI conversation, voice cloning and neural TTS are outside this workflow.

## Optional OpenRouter assistance

### Set up once

Under **Assistance → Set up assistance**, save your own key and choose a Free/Paid recommendation or custom **Model ID**. Model selection alone sends no generation request. Use a dedicated key with an account-side credit limit.

The real input clears after saving. Dots and **Key saved** confirm local storage, not account validity/credit. **Replace key** changes it; **Remove key** deletes it. Model, writing voice and provider preference autosave; wait for saved-status feedback.

Key and preferences use separate Windows Credential Manager entries for the same Windows user/PC. They survive restarts and are outside mods, exports and saves. Sharing Configs does not configure someone else's key/model. Relocking author tools is separate from **Remove key**.

Choose a model/provider supporting the structured-output request; plain chat/JSON support alone is insufficient. Free listings do not guarantee capacity. See [OpenRouter structured outputs](https://openrouter.ai/docs/guides/features/structured-outputs) and the [dated model guide](OPENROUTER_AUTHOR_MODEL_GUIDE.md). Prices/endpoints can change.

### Generate and combine

1. Choose real answer items/quantities, a classified tier, saved key and model. Missing prerequisites are listed together. Manual Unclassified entries remain supported.
2. Optionally set **Seller's writing voice** and checked availability facts. **What is sent** gives a readable summary; no required Review gate or raw JSON step exists.
3. Select **Generate suggestions (uses API credit)** once. Pending feedback and **Cancel generation** show the state. Errors preserve the editor and saved pool.
4. Use **Suggestion 1 of 3** to compare. **Use riddle** replaces initial wording only; **Use extra clue** replaces the hint only; **Use both** changes both. Other fields stay intact.
5. Mix alternatives and edit manually, then **Save riddle** yourself. Applying never saves or sends another request.

Manual wording edits and background pool refreshes keep alternatives. Answer/profile context changes clear obsolete alternatives. Wording edits invalidate an outstanding result so a late reply cannot apply to a newer draft. Cancel ignores the result; a request already sent may still consume credit.

### What leaves the PC

| Sent as writing context | Excluded from writing context |
| --- | --- |
| Item display names/quantities; tier, difficulty, effort, theme/family, level/delivery metadata; availability facts; writing voice; tier-rule summary | Existing riddle/hint/question text; FormIDs and answer plugin references; exceptional-piece registry; paths, saves and recordings |

The key is sent for authentication outside the writing prompt. OpenRouter and its selected provider receive the request. Free-text fields are sent as written: do not put private information into facts/persona.

**Allow providers that may store or train on writing requests** defaults off and persists when changed. Enabling broadens routing for the selected model, without switching free to paid; account restrictions still apply. The stricter default is a provider-policy filter, not an independent guarantee about a provider's actual handling. See [OpenRouter provider policies](https://openrouter.ai/docs/guides/routing/provider-selection).

## Edit JSON outside the game

Back up first. Personal content is at `SKSE/Plugins/Adorn/AdornRiddles.json` under the resolved Configs/Overwrite root. Shipped fallback is `SKSE/Plugins/AdornRiddles.json`. Existing personal Overwrite files win; see [User data](ADORN_USER_DATA.md). Author saves write personal content, not the runtime default.

Keep top-level `"version": 1` and a `riddles` array. `tierRules` and entry `profile` are optional for legacy files. This complete example leaves tiers off because one entry cannot cover all tiers:

~~~json
{
  "version": 1,
  "tierRules": {
    "version": 1,
    "enabled": false,
    "mediumArmor": 40,
    "hardArmor": 80,
    "mediumPiece": 20,
    "hardPiece": 40,
    "clothingTier": "easy",
    "overrides": []
  },
  "riddles": [
    {
      "id": "smiths_iron_01",
      "clue": "Drawn from stone and tempered by fire, I wait for the smith's next design. Bring one.",
      "requests": [
        {"plugin":"Skyrim.esm","localFormId":"05ACE4","count":1}
      ],
      "profile": {
        "tier": "easy",
        "difficulty": 1,
        "effort": 1,
        "theme": "metalwork",
        "family": "ingots",
        "minLevel": 1,
        "delivery": "both",
        "access": "Verify ordinary smith access in the target modlist before release.",
        "hint": "Look for a common metal already cast into a bar.",
        "question": "Could you give me a clue?"
      }
    }
  ]
}
~~~

The older single-item format is still accepted as an entry's payment property:

~~~json
{"request":{"plugin":"Skyrim.esm","localFormId":"05ACE4","count":1}}
~~~

Use `requests` for new entries, including single-item entries. Do not specify both: `requests` wins. For multiple items add distinct records; raise `count` instead of repeating one record. Use the defining plugin and six local hex digits including leading zeroes. Runtime IDs are not portable.

Invalid/unloaded answers, duplicate items, malformed text/profiles and duplicate valid IDs can make entries unavailable. A broken document or no valid entries prevents selection. **Reload file** explicitly replaces the active editor from disk; save/copy an unsaved draft first. External edits do not rebuild compiled clues automatically.

## Review and share

Before shipping, check:

- A tester can identify every exact answer without debug data, and quantities are fairly communicated.
- Acquisition is possible at the supported level in the intended modlist. Test quest access rather than assuming a prose note enforces it.
- Tier reflects practical cost; difficulty/effort labels do not balance automatically.
- Extra hints help and match prepared audio/subtitles.
- All three tiers work at supported levels and for both allowed delivery types.
- Incomplete hand-ins remove nothing; complete ones give exactly the intended reward. Test save/reload, cancellation, archived clues and another seller.

Collect contributor entries/JSON, review IDs/dependencies and merge into a clean content mod. Sharing a code does not synchronize installations or update a built modlist. Assignment-pack exports exclude riddles. Keep personal settings, keys, takes and unrelated configuration out of content-only packs.

## Troubleshooting

| Symptom | Check or action |
| --- | --- |
| Item unavailable | Payment supports loaded MISC records. Check the defining plugin and use the active-game picker. |
| Short-looking text rejected | UTF-8 byte limits can be reached before the visible character count. |
| Tiers cannot enable | Save valid Easy/Medium/Hard entries, then test level/delivery coverage. |
| Restricted entry appears with tiers off | Legacy selection ignores profile filters; enable a reviewed tier pool to use them. |
| No eligible Hard payment | Check tier entries, answer plugins, minimum level and delivery. Fill missing content rather than discounting the reward. |
| Same riddle after cancel/reset | Expected for the same tiered offer. Test a different offer or new test game. |
| Clue question missing | Save exact wording, prepare for this seller, finish Build/exit/install/restart; check the accepted snapshot. |
| Key saved but Generate unavailable | Review item, classified-tier and model prerequisites. Stored does not mean account-valid. |
| Privacy rejection / no compatible route | Check structured-output support and model/account policy. Broader provider permission is a deliberate choice, not a guaranteed fix. |
| Rate limit | Wait for capacity or intentionally choose another route. Repeated retries cannot create free capacity. |
| Output budget / incomplete drafts | No complete three-draft response arrived. Continue manually or deliberately try another compatible model. |
| Bad key / credit | Check the account and replace/remove the key in Assistance. Never send it in a report. |

Reports should include model/error text, seller, delivery type, items/quantities, expected tier and save/new-game steps. Build errors also need `publish-log.txt` from **Seller → Dialogue → Open build logs**. Compilation and browser checks do not prove Skyrim behavior.
