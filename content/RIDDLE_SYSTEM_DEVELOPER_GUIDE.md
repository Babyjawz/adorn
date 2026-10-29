# Riddle system developer guide

Current implementation reference for 29 October 2026. This is the maintenance companion to the [ASF manual](ASF_MANUAL.md) and [riddle authoring reference](RIDDLE_AUTHORING.md). The [combined plan](SELLER_RIDDLES_AND_OPENROUTER_PLAN.md) retains historical proposals; this guide describes the implemented contract.

## Source map

| Area | Source |
| --- | --- |
| Profile validation, tier rules/classification, candidate selection, offer identity/history, prompt and response validation | `src/RiddleSystem.h`, `src/RiddleSystem.cpp` |
| Loaded-item resolution, config reads/saves, order acceptance, clue synchronization, recorder/build bridge | `src/PrismaMain.cpp` |
| Save-specific progress, migration and reset | `src/PlayerProgress.cpp`, `src/PlayerProgress.h` |
| HTTPS, key/preferences persistence and provider routing | `src/OpenRouterAuthor.cpp`, `src/OpenRouterAuthor.h` |
| Personal destination and Overwrite precedence | `src/ConfigPaths.cpp`, `src/ConfigPathPolicy.h` |
| Shared author draft, fixed panes, request revision, suggestion application and controller scroll | `app.js`, `ui/index.html`, `ui/style.css` |
| Stable native clue records, manifests and archived versions | `tools/seller-dialogue-build/Program.cs` |
| Silent/recorded FUZ and lip staging | `tools/seller-voice-prepare.py`, `tools/build-seller-custom-voice-stage.ps1` |

`xmake.lua` identifies the active Prisma implementation. Historical experimental files are not the runtime entry point.

## Data and compatibility

Riddle documents remain version **1**, with additive entry `profile` and top-level `tierRules`. The old single `request` is accepted; new content uses `requests`, which wins when both exist. Payment accepts 1–8 distinct loaded MISC items, quantities 1–99. Answers use plugin-qualified six-digit local hexadecimal IDs; tier overrides use decimal `local` numbers.

Profile fields are tier, difficulty, effort, theme, family, minLevel, delivery, access, hint and question. Missing tier is Unclassified. New editor drafts default Easy, while existing unclassified entries remain unchanged. Native text validation uses UTF-8 byte lengths. See the complete [author schema/example](RIDDLE_AUTHORING.md#edit-json-outside-the-game) rather than inventing additional fields.

The provider manifest stays version **2** with additive clue metadata. Progress serialization is version **6**, adding per-save offers/history while preserving earlier accepted progress through migration. Internal format versions are separate from the public mod version. Old-save behavior still needs targeted Skyrim acceptance.

## Selection and order acceptance

1. Read the active document and resolve valid loaded payment records.
2. Normalize rules. Disabled tiers select flat valid content: profile tier, minimum level, delivery and recent-family filters are bypassed.
3. When enabled, classify distinct reward pieces by total and strongest base armour. Defaults are Medium 40/20 and Hard 80/40. Zero-armour clothing uses its configured tier, Easy by default; explicit piece overrides establish floors.
4. Form the canonical offer identity from seller, set of pieces, delivery kind and tier. Use a remembered offer if present.
5. Otherwise choose same-tier candidates eligible at the player's level and delivery kind. Avoid the last five IDs/families if alternatives exist; relax only repetition when exhausted.
6. Snapshot accepted text/payment and associated data. Missing eligibility or journal capacity must fail without replacing the current order.

There is no automatic enchantment, prestige, armour-class or piece-count price. Availability prose is writing data, not a quest-condition system. A pool having all three tiers does not prove every level/delivery combination is eligible.

Offer memory is bounded at 512 distinct offers and history at 64 entries. Cancellation and encounter reset preserve fixed tiered prices. New Game clears personal state. Changing author rules so the same pieces classify differently changes the offer identity; do not describe that as ordinary cancellation rerolling.

## Clue presentation

Clue is additional to the seven core seller moments. The content key binds ID, initial wording, hint and question; runtime exact-text checks add seller/order matching. Current and archived prepared versions retain stable native IDs so earlier accepted orders can keep their help.

Only a pending, discovered order on the assigned seller with matching prepared data enables the branch. No hint, missing preparation or stale data suppresses it. Asking has no payment/hand-in fragment, reward, reroll or completion side effect. Repeated asks return the same saved hint.

Riddles owns hint/question text. The existing recorder binds a selected take to that clue version, and recorded words must match. The automatic silent path uses a temporary eSpeak timing guide, generates LIP and packages silent audio; it does not ship the guide speech. Both sources require the normal Build → exit/install → restart route for changed native dialogue.

Preserve archived records, manifests and audio together. Do not claim a draft change is active, an archive hit proves voice coverage, or a staged FUZ proves audible playback/lip animation.

## Current editor contract

Four panes are always present: library, answers/challenge, shared writing/clue and Assistance. No optional-pane count switch, separate assistant editor, large assistance toggle, mandatory Review gate or raw JSON display remains.

Dropdowns expand below fields inside their pane. Tier rules are expandable in the library; connection/persona settings collapse in Assistance. Right-stick up/down scrolls the focused pane, and focus movement reveals controls at large text scale.

Only Save riddle commits content. Applying a suggestion changes only the chosen riddle/hint text; answers/profile stay intact. Manual writing retains delivered alternatives, while answer/profile context changes clear them. Manual edits invalidate an outstanding generation context. Background pool refreshes update the library without resetting the active editor or alternatives. Explicit selection/reload can replace the draft.

## External requests and persistence

Generation is one explicit bounded request for three suggestions. Native code controls validated answers/rules and response shape; model output supplies wording and an editorial note only. HTTPS work stays off the game thread and stale/cancelled results must not modify the new context.

Writing context includes item display names/quantities, profile without hint/question, tier-rule summary without the override registry, persona and access facts. Existing authored initial/hint/question wording, answer plugin/FormIDs, paths, saves and recordings are excluded. Keep local duplicate checking local. The API key authenticates outside the prompt and must not be logged.

The persistent key and preferences are separate Windows Credential Manager entries. Model/custom ID, persona and provider-data choice persist for the same user/PC. Versioned load/save acknowledgements protect newer edits from late restores. Key indicators expose presence, not the secret. Remove key is the explicit deletion action.

Provider data collection defaults to deny. The optional persisted allow setting broadens only the selected model's policy; account restrictions and structured-output requirements still apply. There is no paid fallback. Distinguish privacy rejection, unavailable compatible routing, rate limit, account errors and output exhaustion. A catalog listing is not a successful generation test.

## Configuration resolution

Existing per-file Overwrite overrides win before enabled Adorn Configs. Existing nonempty personal Adorn author data in Overwrite also retains a coherent Overwrite write/build root. Otherwise use the enabled exact-name Configs mod or Overwrite fallback. Do not clear personal files to reproduce the old blank-starter regression.

## Verification and remaining acceptance

| Test source | Concern |
| --- | --- |
| `src/tests/RiddleTests.cpp` / AdornRiddleTests | Profiles, classification, eligibility, offers, prompt/response bounds |
| `src/tests/PlayerProgressTests.cpp` / AdornPlayerProgressTests | Version 6 state/migration, reset and personal isolation |
| `src/tests/ConfigPathTests.cpp` / AdornConfigPathTests | Overwrite/Configs policy |
| `src/tests/AuthorPreferencesTests.cpp` / AdornAuthorPreferencesTests | Isolated Windows preference persistence |
| `ui/test-riddle-authoring.js` | Actual editor events, fixed panes, suggestions, context protection and scrolling |
| `tools/test-riddle-clue-build.py` | Stable/archived records, conditions and manifests |
| `tools/test-riddle-audio-stage.py` | Silent/recorded staging and payload checks |

Use the established build scripts and isolated test targets. A documentation-only edit does not require rebuilding the DLL or invoking an API. Do not run live probe targets as routine offline verification: they can use a saved credential and external capacity.

Latest build/install/test provenance is in [RIDDLE_TIERS_TEST_RESULTS.md](RIDDLE_TIERS_TEST_RESULTS.md). Still pending: actual generic seller tiered hand-ins, clue audio/subtitles/lips including archived help, physical controller behavior in Skyrim, New Game/cross-save acceptance and successful live assistance. Synthetic free requests observed privacy/rate/output failures; do not convert those into a successful-generation claim.
