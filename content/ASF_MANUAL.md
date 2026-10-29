# Adorn Seller Framework manual

ASF adds outfit and recipe orders to Adorn, using one assigned NPC and local authored content. This manual covers installation, player progression, seller setup, dialogue authoring, voice selection, microphone/import/trim, compilation, recipes, riddles, packaging and troubleshooting. For ordinary outfit assignments, see the [Adorn guide](ADORN_MANUAL.md).

## Contents

- [Requirements](#requirements)
- [Installation](#install-the-framework)
- [Player order walkthrough](#play-an-order)
- [Recipes and finished delivery](#recipes-and-finished-outfits)
- [Orders and fixed offers](#pending-orders-and-fixed-offers)
- [Saves, reset and recovery](#save-reset-and-recover)
- [Author access and seller setup](#author-setup)
- [Author workspace](#author-workspace)
- [Recipe maker](#author-recipe-templates)
- [Dialogue authoring](#write-the-seller-dialogue)
- [The seven core exchanges](#the-seven-core-exchanges)
- [Reply sources and voice folders](#reply-sources-and-voice-folders)
- [Recording and importing](#record-or-import-audio)
- [Trimming and take management](#trim-and-manage-takes)
- [Extra clue dialogue](#prepare-an-extra-clue)
- [Build and activate](#build-and-activate-dialogue)
- [Riddle maker and tiers](#riddle-maker-and-tier-configuration)
- [Optional OpenRouter](#openrouter-author-assistance)
- [Files and provider output](#files-and-provider-output)
- [Sharing](#share-a-finished-seller-setup)
- [Troubleshooting](#troubleshooting)
- [Complete acceptance walkthrough](#complete-acceptance-walkthrough)

## Requirements

**Players:** Adorn with SKSE64, Address Library, Prisma UI and its requirements, SkyUI, MCM Helper and SkyPatcher; runtime-matched [Fuz Ro D-oh](https://www.nexusmods.com/skyrimspecialedition/mods/15109); any NPC/content dependencies named by the seller pack. Follow Adorn's BodySlide and outfit-asset setup as well.

**Use MO2 for these instructions.** Adorn and ASF have only been tested within an MO2 modlist on Windows. Other managers and installations outside MO2 are untested.

**Already included with ASF's complete author bundle:** the self-contained dialogue compiler, FFmpeg and portable eSpeak NG/data. No additional copies of these tools or separate .NET SDK are needed for in-game Build.

**Install separately only when building changed dialogue/audio:** Python 3 and the [Creation Kit](https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/). LipGenerator, xwmaencode and LIPFuzer come from that CK installation; they are not separate ASF downloads. Players using prepared content need none of this authoring toolchain.

**Required for authors using stock Skyrim replies:** download the [BSArch command-line tool](https://www.nexusmods.com/newvegas/mods/64745?tab=files) and place `BSArch.exe` at `<MO2 instance folder>\tools\xEdit\BSArch.exe`. It is not bundled with ASF or the Creation Kit, and the xEdit editor itself is not required. ASF calls it automatically to extract the installed `Skyrim - Voices_en0.bsa` for stock recordings. See the [BSArch setup instructions](SELLER_NEXUS_REQUIREMENTS.md#bsarch-requirement-for-stock-skyrim-voice-replies). Entirely silent or custom-audio-only setups do not use stock extraction.

**Already have xEdit/SSEEdit? BSArch is included with xEdit builds.** Check for `BSArch.exe` in that installation before downloading it separately. If it is already in the required MO2 location, no additional installation is needed. ASF does not need you to run the xEdit editor.

Manual riddle/recipe text editing needs no audio toolchain; preparing native Clue replies uses the dialogue build tools.

OpenRouter is optional for writing drafts and unnecessary for gameplay or a manually authored build. See [requirements](SELLER_NEXUS_REQUIREMENTS.md) for download links and exact author-tool paths.

## Install the framework

Install Adorn and its [runtime requirements](SELLER_NEXUS_REQUIREMENTS.md), then ASF and the runtime-matched Fuz Ro D-oh build. Enable **AdornSlots.esp** and **Adorn Seller Framework.esp**. Put the supplied personal configuration or authored output below the runtime mods in MO2's left pane, and check for existing Overwrite files with higher priority.

The clean generic setup has no assigned NPC and seller mode is off. If your modlist supplies a seller pack, follow that pack's instructions and dependencies. Otherwise complete **Author setup** below. A particular follower is not a generic framework requirement.

## Play an order

1. Press **F6**, choose an installed or custom look in **Outfits**, then open **Assign → Player**.
2. Choose **Order recipe**. If the author enabled finished pieces, **Order outfit** is also available. Name the order when asked.
3. On the first encounter, follow **Find [seller's name]**. Speak to the seller using the Adorn outfit-planning choice; simply standing nearby does not complete the introduction. The riddle is hidden until you speak to them.
4. Read the riddle in the Player order panel. Solve it and bring all answer items in the required quantities. The payment is an item hand-in, not a typed answer.
5. If offered, ask the seller for a **Clue**. It repeats an extra hint for this order and does not charge or change the payment.
6. Use the seller's hand-in choice. Adorn checks every required item before attempting payment. An incomplete collection should not receive a reward or partial payment deduction; report a failure with the exact items and quantities.
7. For a recipe, collect and **read the named parchment**. Then gather its separate crafting materials and use the correct station. For a finished outfit, the selected pieces are delivered directly.

The exact dialogue wording may vary by authored pack. The NPC's normal merchant/follower dialogue remains separate.

### Recipes and finished outfits

| Order | What you receive | What remains to do |
| --- | --- | --- |
| Recipe | A named note teaching the selected outfit when read | Read it, collect the recipe materials and craft each piece. Armour uses a forge; clothing uses a tanning rack. Follow any named-location restriction on the parchment. |
| Finished outfit | The selected pieces directly | Wear them or save the look. No recipe piece slots are consumed. |

Riddle payment and crafting ingredients are separate costs. Recipe ingredients are specified **per crafted piece**. Recipe orders share **32 craftable piece slots per save**; a multi-piece order uses capacity for its pieces. A completed recipe note must be read before its completed card is archived/replaced. Dropping a learned note does not unlearn it.

ASF generates native crafting entries for the supported clothing/armour pieces in the chosen reward, including pieces whose original mod supplies no crafting recipe. It uses Adorn-owned recipe slots; it does not copy or edit the outfit mod's original recipes. No separate per-outfit recipe patch is needed for this route, but the mods supplying the reward pieces remain required. Previous learned outfits retain their entries when later orders are completed, within the same 32-piece capacity.

Each recipe order has a distinct note identity. Its displayed page contains the outfit name, authored instructions, any named station-location restrictions and the seller's signature. Read the newly delivered note to learn that order; reading an older note does not substitute for it.

Recipes-only mode hides/rejects new finished-outfit orders. Turning that setting on does not invalidate an already accepted outfit delivery.

### Earning and wearing pieces

With seller mode enabled, **Give** and **Wear** on an unsaved selection reject direct grants and ask you to place an order. **Wear** on a saved look requires all its selected pieces to be in the player's inventory. It does not create missing pieces. Ordinary Adorn without seller/developer mode permits direct grants; enabling ASF's seller mode deliberately changes that player acquisition workflow.

### Pending orders and fixed offers

Accepted orders snapshot their riddle, requested items and recipe information. Editing shared content does not rewrite the accepted deal. Pending answer/debug details stay hidden, including with author tools unlocked.

In **tiered mode**, an offer is remembered by seller, selected pieces, recipe/outfit type and classified tier within the current save. Cancelling or resetting the encounter does not reroll that offer. A new game has its own journal. Author rules that change the reward's tier create a different offer identity; changing rules is an author balance decision.

The journal holds up to **512 distinct tiered offers** and 64 recent-history entries; repeat avoidance looks at the last five IDs/families when alternatives exist. Hitting the offer limit reports an error. Legacy flat selection does not have the tiered fixed-offer guarantee.

## Save, reset and recover

| Shared setup across saves using the files | Personal progress in the loaded save |
| --- | --- |
| Assigned seller, enabled/options, dialogue drafts, selected recordings, prepared output, riddle/recipe pools, tier rules, NPC/faction assignments | Player saved looks, seller introduction/discovery, pending/completed order state, learned recipes, tiered offers/history |

Save the game after personal changes and keep the matching `.skse` co-save. Loading an earlier save restores its earlier personal state. Starting a new game keeps authored setup but starts a fresh personal wardrobe and seller encounter. Using two characters with the same name does not intentionally share their personal progress.

For recovery, use **MCM → Adorn → Troubleshooting → Reset seller encounter…**. Confirming restarts introduction/discovery and cancels this save's pending order. It keeps saved outfits, learned recipes, completed rewards and tiered offer prices. It does not clear the shared author configuration. Back up the save first and save again after the intended reset.

Old shared wardrobes can be copied through **Assign → Player → Saved outfits → Recover old saved outfits…**. This is explicit recovery, not an automatic new-game import.

## Author setup

1. In **MCM → Adorn → Developer access code**, enter the author code supplied by the project/modlist author. After acceptance, **Developer tools unlocked** appears. Unlocking is a local authoring convenience, not a security boundary.
2. Open **Seller → Setup → Choose seller from NPCs**. Choose a placed NPC reference and confirm **Assign as seller**. If no placed reference resolves, load the NPC's area and try again; selecting a base record alone does not create an actor.
3. Enable seller mode. Choose whether to **Allow finished outfit orders**; off means recipes only.
4. Verify the assigned name, location and voice information. Keep the seller reachable in your intended playthrough. Use relocation controls only when you intend to move an actor/player in your test save.
5. Test one ordinary recipe order with the default replies before adding custom dialogue or tiers.

The unlock persists through local MCM settings across saves/restarts. An empty code field does not mean locked: the field clears after use. Untick **Developer tools unlocked** to clear the saved credential and lock tools. Do not distribute your personal MCM settings file.

One placed NPC holds the role at a time. Draft conversations are stored per NPC base and retained when switching sellers. A custom provider is matched to that base, so another placed reference of the same base can use its authored content. Switching sellers resets the custom-path preference for the new choice; check its own prepared state.

## Author workspace

| View/control | Responsibility |
| --- | --- |
| **Seller → Setup** | Placed seller, enabled role and finished-order permission |
| **Seller → Dialogue** | Per-NPC conversation, core exchanges, installed/draft state and build |
| **Use my prepared seller replies** | Prefer installed NPC provider; generic path remains without valid output |
| **Edit default player choices** | Generic fallback prompts, not a second editor for an existing custom conversation |
| **Author details** | Effective VoiceType folder and future-seller template action |
| **Riddles** | Payment, initial wording, extra clue/question, tiers and writing assistance |
| **Recipes** | Parchment, materials per piece and station-location choices |
| **Assign → Player** | Player orders and wardrobe |
| **MCM → Troubleshooting** | Current-save encounter recovery |
| **Open build logs** | Publisher diagnostics |

Dialogue has four panes for seller/voice, exchanges, text/build state and audio. Left-stick focus moves between controls; left/right reaches same-row actions and adjacent panes. Long focused text can scroll before focus leaves. Browse a voice dropdown with up/down and close with Accept/Back. The mouse wheel scrolls hovered content.

Riddles has its own four fixed panes; right-stick up/down scrolls its focused pane.

### Default choices and future-seller templates

**Edit default player choices** edits fallback prompts while custom output is unavailable/inactive. It does not rewrite the selected seller's custom conversation. **Save lines** applies those choices to a subsequent eligible conversation; check Playing now.

Under Author details, **Use these player choices for future sellers** copies only those prompts into the starting template. Existing NPC conversations remain unchanged. It does not clone recordings, reward logic or all sellers' text.

### Changing or disabling the seller

Turning seller mode off retains the selected NPC and authored work. It is not a reset. Choosing another seller retains previous drafts, but only one placed actor is active. Check the new seller's prepared preference and voice folder. Inspect pending order snapshots before testing reassignment; a new seller should not be assumed to reprice or inherit an accepted deal.

## Author riddles and tiers

Use the [quick start](RIDDLE_TIERS_QUICK_GUIDE.md) for a first entry and the [full riddle manual](RIDDLE_AUTHORING.md) for every field, tier calculation, JSON examples and troubleshooting.

Choose payment items first, write the initial riddle and optional extra clue, then **Save riddle**. Old entries remain Unclassified. New entries start Easy. Enabling tier selection is a separate pool-wide action under **Tier settings → Save tier rules**; it does not happen when you classify one riddle.

The starter pool contains three legacy ingot riddles. It is deliberately not a balanced Easy/Medium/Hard progression. Build and test eligible content in all three tiers, at the lowest supported level and for both allowed order types, before enabling tiers for players.

## Author recipe templates

Open **Recipes** with author tools unlocked:

1. Choose **New recipe** or a saved entry. Give it a name and write the parchment instructions.
2. Under **Materials per piece**, choose 1–8 distinct materials and quantities 1–99. These are crafting costs for each reward piece, not the riddle hand-in.
3. Keep **All forges / All tanning racks** for ordinary access, or choose a named location separately for each station type. Check in game that the location actually has the needed station. A location search result alone does not establish that.
4. Describe any location restriction clearly on the parchment. Select **Save recipe**.
5. Place a new recipe order, complete the hand-in, read the note, and craft both an armour and a clothing example at the intended stations.

New orders choose a valid template from the pool. Accepted orders keep their saved recipe; changing a template is not a way to repair an already accepted order. Keep stable IDs when updating content and review defining-plugin dependencies before sharing.

The material and location pickers search loaded game records and retain the required internal references. You do not need to enter FormIDs or author recipe JSON manually for this workflow. A named-location restriction controls the eligible station location; it does not place a missing forge or tanning rack in the world.

## Write the seller dialogue

Open **Seller → Dialogue**. The summary **Playing now → Selected draft → Next** distinguishes installed replies from your edits.

Each of the seven core exchanges has player choices and one seller reply. Put player choices on separate lines in **What you say**; they lead to the same reply for that exchange. Automatic delivery moments do not create extra menu choices. The framework's order/payment logic remains fixed.

| Action | Result |
| --- | --- |
| **Preview Skyrim recordings**, Hear again, Stop | Listen only. Browsing does not choose a draft recording. |
| **Choose this reply and recording** | Copy the exact stock reply and recording choice into the selected exchange. |
| **Choose [voice] for all 7 replies** | Select that stock style for the seven core exchanges after confirmation. It does not voice every extra clue. |
| **Save draft** | Persist the conversation and choices; installed playback stays as it was. |
| **Build [seller]'s seller dialogue** | Save the draft, build records/audio and install after Skyrim exits. Restart to activate. |

Editing a stock reply's words invalidates its exact stock recording choice; select another recording or use silent preparation. Borrowing Skyrim recordings for a custom-voice NPC also needs Build: having the source clip is not the same as having a seller-specific dialogue route.

Prepared replies cover Adorn's seller exchanges. They do not replace the NPC's whole VoiceType or ordinary conversations. A preference for custom dialogue with no installed provider keeps the generic path active while the author works.

### The seven core exchanges

| Exchange | Role | Writing guidance |
| --- | --- | --- |
| Opening / planner | Start planning through the seller | Welcome without claiming payment/delivery happened |
| Hand-in | Offer collected answer items | Ask to check; native logic determines the result |
| Missing items | Incomplete payment | Do not claim partial payment or reward |
| Recipe delivery | Recipe success | Refer to receiving and reading the note |
| Outfit delivery | Finished-piece success | Refer to finished pieces, not an unread recipe |
| Leaving | Pending-order defer/leave | Keep compatible with an existing pending order |
| Style banter | Pending-order flavour | Avoid inventing quest/payment mechanics |

Leaving and style banter are pending-order gated. Automatic result moments are not arbitrary new menu branches. Clue replies are additional per-riddle versions authored through Riddles.

All player alternatives in a moment lead to its one seller reply. Keep them compatible. A first-prompt fallback exists in the built records; rotation depends on matching runtime/provider state and still needs in-game acceptance.

### Start and revise a draft

Use **Start with this voice's replies** to seed a Skyrim style, or **Start without Skyrim recordings** for silent/custom work. Review replacement feedback and save wanted edits before restarting a draft. Mix stock, silent and recorded moments as needed.

**Undo edits since last save** reloads saved draft choices; it does not uninstall the current prepared build. **Current exchange in Skyrim** expands the installed snapshot independently of the text being edited.

## Reply sources and voice folders

The stock catalogue contains **42 Skyrim voice styles with seven core replies each: 294 recording candidates**. Preview a clip before choosing it, choose a single exchange, or seed the seven core moments from one style and replace individual moments. Different exchanges can use different source styles or mix stock recordings with selected takes and silent replies. These are catalogued sources; audible playback for every NPC/style combination remains an in-game acceptance check.

| State | Meaning | Next step |
| --- | --- | --- |
| Original/generic | Framework fallback handles the actor | Keep it or author a custom provider |
| Stock chosen | Exact audited words/recording selected in draft | Build seller route, exit/install, restart |
| Silent authored | Subtitle intended for silent FUZ/lip | Build, restart and test lips/subtitles |
| Selected take | Source and trim bound to reply | Build into final output |
| Staged FUZ | Converted audio/lip data exists | Finish installation/restart |
| Installed provider | Required routing/records detected | Verify actual branches, sound and lips |

Source style and final voice folder are distinct. A Skyrim style supplies recordings; the NPC's **effective VoiceType** determines where built FUZ files go. Borrowing a seller clip does not replace the NPC's ordinary voice or require changing it.

Inspect **Author details → NPC voice type used for the final audio**. Pending/unresolved voice data prevents reliable placement. Correct only after checking the actor's winning voice. If an overhaul changes the VoiceType, rebuild/recheck the pack.

## Record or import audio

Select an exchange and microphone device, then **Record take → Stop & save**. Alternatively place a WAV, FLAC, MP3, AAC or M4A in the displayed take folder and refresh. Preview, trim and choose the take. The original recording is retained; choosing a take normalizes audio for preparation.

Review both the current subtitle and the words actually recorded. ASF does not transcribe speech automatically. For the seven core exchanges it can bind an intentional difference with a warning; lip generation follows recorded words. If the subtitle changes later, reselect the take to bind it again. **Riddle clues are stricter: recorded words must match the saved extra clue.**

Raw take folders are author sources. Skyrim plays the built `.fuz` files in the final voice path, not an MP3/WAV dropped into a take folder.

### Trim and manage takes

Select a take to display its waveform. Adjust **Start** and **End**, preview that range and keep complete words. **Use selected take as audio** saves the range for conversion/lips and retains the original source.

Capture remains bound to the selected NPC/exchange until Stop & save. Finish capture before changing targets. Refresh devices after a hardware change, select the intended input and listen to a short test first.

The reliable sequence is **Refresh → select take → Preview take → trim → review spoken words → Use selected take as audio → Save draft → Build**. Listening alone never chooses audio.

Clearing the chosen take binding and deleting a source take are different operations. Back up useful recordings before deletion. A selected file that has gone missing is a build error, not an intentional silent choice.

## Prepare an extra clue

1. Assign the intended seller. In **Riddles**, save the initial riddle, extra clue and player's clue question.
2. Expand **Clue dialogue & optional recording**. For silent help, select **Prepare clue dialogue**.
3. For recorded help, choose **Record / choose audio for this clue**, select a matching take, then build through the normal ASF process.
4. Wait for **Build complete**, save and exit Skyrim. Allow installation to finish before restarting.
5. In game, ask the assigned seller for help on an accepted, discovered order. Confirm the words, subtitles, audio and actual lip movement match.

Edit clue words/question in **Riddles**. The recorder is bound to that clue version. The builder retains archived help for older accepted orders; removing a pool entry does not intentionally replace an old order's help with a new riddle. Exact matching guards hide unavailable/stale help rather than offering the wrong reply.

Silent preparation uses bundled eSpeak only as a temporary timing guide. The packaged reply is silent with lip data. This is not audible synthetic speech or neural TTS. In-game lip movement remains an acceptance check.

## Build and activate dialogue

Authors need [the author tools](SELLER_NEXUS_REQUIREMENTS.md#authoring-tools). Players using a finished pack do not.

The builder creates the NPC-conditioned native dialogue records, correct INFO voice filenames, SEQ data, provider/voice manifests and prepared FUZ/lip files from saved drafts. Authors do not manually create each dialogue record or calculate its voice-file name. These generated files are a matching build and must stay together; preparing audio alone does not activate a new conversation. The bundled self-contained compiler avoids a separate .NET SDK requirement; Python and installed Creation Kit audio tools are still required as described above.

1. Review all saved NPC drafts, recordings and clue versions. The publisher builds saved drafts together, so another NPC's missing audio/tool dependency can fail the build.
2. Select **Build [seller]'s seller dialogue** or **Prepare clue dialogue**. Skyrim can remain open while preparation runs.
3. Wait for the result. On failure, use **Open build logs**; do not repeatedly rebuild without reading the error.
4. After the build completes, save and exit Skyrim. The publisher installs the checked records/audio after the process exits. Wait for installation/status to complete.
5. Check the winning ESP, SEQ, provider/voice manifests and FUZ output remain together in the intended user-data destination. Restart through SKSE and test the dialogue.

Current writes use enabled Adorn Configs or Overwrite according to the [user-data rules](ADORN_USER_DATA.md). Existing personal Overwrite content can keep the whole author output there. Do not clear it to force a different destination.

For a failed build, **Seller → Dialogue → Open build logs** opens `%LOCALAPPDATA%\Nymph Nerds\Adorn\seller-build`, selecting `publish-log.txt` if present. Use Alt+Tab if Explorer is behind Skyrim. If the log does not exist, the folder opens with an explanation. Keep the original error text and send the relevant log.

## Share a finished seller setup

Use a clean authored configuration/output mod separate from Adorn and ASF. Include only the intended seller options, reviewed content, drafts or prepared files appropriate to the pack. Prepared ESP, SEQ, provider/voice manifests and FUZ files must describe the same build. Keep the authored output below the framework so it wins.

List required NPC, answer-item and clothing plugins. JSON references do not install those mods. Test on an installation that lacks your private caches and recordings, and distinguish a finished player pack from source drafts that need building.

Exclude personal saves, legacy player looks, unrelated assignment files, private MCM settings, credentials, unapproved takes and Local AppData caches. Do not redistribute locally extracted Skyrim clips or Creation Kit executables/data without permission. Preserve bundled tool notices and source obligations. Assignment-pack export does not export seller content.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| Seller controls absent | Confirm ASF ESP and matched core are loaded, then unlock author tools. Ordinary players normally use the Player order panel, not author setup. |
| Seller mode inactive | Check the assigned placed reference, enabled setting and winning `AdornSeller.json`; existing Overwrite may override a blank starter. |
| Still says Find seller | Speak through the outfit-planning dialogue. Reaching the marker alone does not introduce you. |
| No finished-outfit option | The setup is recipes-only. Authors can enable finished orders in Seller setup. |
| No eligible tier error | Add valid same-tier entries available at this level and order type. Check missing answer plugins. Save tier rules separately. |
| Cancelling gives the same riddle | Expected for the same tiered offer. Encounter reset also preserves those prices. |
| No Clue question | Check nonempty saved hint, matching assigned seller/order, completed introduction, exact prepared version and post-build restart. No-hint orders have no question. |
| New reply does not play | Check Playing now versus Selected draft; build, exit/install and restart. Verify the authored output wins over the generic framework. |
| Build cannot find a tool | Read `publish-log.txt`. Check Python and installed CK audio tools. Bundled eSpeak/FFmpeg must remain with their data/notices; stock sources can require BSArch and the local game's voice archive. |
| Recipe not craftable | Read the delivered note first; check ingredients per piece, forge versus tanning rack, any location restriction and recipe capacity. |
| Other NPC draft breaks Build | The publisher processes all saved drafts. Resolve its missing recording or tool requirement and rebuild. Preserve the draft/takes while diagnosing. |

Report your versions, seller/base mod, order type, selected reward, save/new-game steps, expected versus actual result and relevant logs. Include the selected model and error for assistance failures, never the key. The latest generic seller, save-isolation, clue playback and live-generation acceptance boundaries are listed in the [release documentation index](docs/nexus/README.md#publication-status).



## Riddle maker and tier configuration

Choose **Riddles → New riddle**. The library, Answers & challenge, Writing & clue and rightmost Assistance remain visible. There is one draft and one Save riddle action.

1. Choose the exact loaded MISC answer and quantity.
2. Add another required answer only when it adds a fair challenge. All 1–8 distinct items are needed together, quantities 1–99 each.
3. Set reward tier, clue difficulty and acquisition effort separately. New entries start Easy; legacy entries stay Unclassified.
4. Add theme/family, optional minimum level and delivery type, and checked availability facts. Prose does not enforce quest/faction access.
5. Write the initial riddle and separate optional extra clue/question. Save, then prepare native help if used.

Initial text has a 500 UTF-8-byte limit; extra clue 300; question 80; ID/theme/family 80 each; availability facts 500. Multibyte text can reach limits before its visible character count.

### Enabling tiers

Tiers default off. Flat mode chooses valid loaded entries without tier/level/delivery filters. To enable, save reviewed content in all three buckets, open **Tier settings**, check **Use tiered selection for new orders**, then **Save tier rules**.

Default reward classification counts each distinct selected record's base armour. Medium starts at 40 total or 20 on the strongest piece; Hard at 80 total or 40 on one piece. Zero-armour clothing defaults Easy, with a configurable clothing tier. Exceptional-piece overrides raise minimum tiers.

Skills, temporary effects, decorative piece count, enchantment power, price and prestige are not inferred. Calibrate thresholds/overrides for the actual modlist. A powerful zero-armour robe needs author review.

Difficulty and acquisition effort are ratings, not automatic tier calculation. Minimum level and recipe/outfit eligibility apply in tier mode. Test every tier at the lowest supported level for every allowed delivery type; a three-bucket coverage count alone cannot prove eligibility.

Missing coverage stops the new offer and preserves the existing order. Recent-ID/family avoidance relaxes if all candidates are recent. Accepted tiered prices persist as described earlier.

Use [the riddle reference](RIDDLE_AUTHORING.md) for all field/schema details and a complete JSON example. Keep IDs unique and stable; do not use a runtime load-order prefix as a portable answer reference.

## OpenRouter author assistance

This optional author tool drafts saved writing. It never runs when the player asks the seller for help and does not choose rewards, FormIDs or payment quantities.

1. Under **Assistance → Set up assistance**, save a dedicated limited-credit key. The input clears; saved dots confirm Windows storage, not account validity.
2. Choose a Free/Paid recommendation or custom Model ID supporting structured outputs. Selecting a model sends no inference request.
3. Set optional writing voice and checked availability facts. Model/persona/provider preference autosave; wait for confirmation.
4. Choose real answers/quantities and Easy/Medium/Hard. Missing prerequisites appear together. What is sent is optional readable context, with no mandatory Review/JSON step.
5. Select **Generate suggestions (uses API credit)**. Read pending/error feedback. Cancellation ignores a result but can still leave a sent request billable.
6. Review **Suggestion 1 of 3** and apply Use riddle, Use extra clue or Use both. Mix alternatives and edit manually, then Save riddle explicitly.

Applying never saves or sends another request. Wording edits retain suggestions; answer/profile changes clear obsolete ones. Context changes invalidate pending results.

Requests contain chosen item names/quantities, profile/tier-rule summary, persona and availability facts. Existing riddle/hint/question text, answer FormIDs/plugin references, piece-override registry, local paths, saves and recordings are excluded. The key authenticates outside the writing prompt. Free-text facts/persona go as written.

Key and preferences are separate Windows Credential Manager entries for the same account/PC. They are excluded from Configs, saves and exports. **Remove key** deletes the key explicitly; relocking tools is separate.

Provider data collection is disallowed by Adorn's default routing preference. **Allow providers that may store or train on writing requests** broadens it deliberately; account policy can still restrict routing. Free availability and compatible structured-output routes vary. There is no paid fallback. See [provider policies](https://openrouter.ai/docs/guides/routing/provider-selection) and [structured outputs](https://openrouter.ai/docs/guides/features/structured-outputs).

Manual writing/gameplay need no key or internet. Successful live generation remains acceptance work; synthetic free checks hit privacy/rate/output limits.

## Files and provider output

Paths below are Data-relative under the resolved user-data root.

| File/directory | Responsibility |
| --- | --- |
| SKSE/Plugins/Adorn/AdornSeller.json | Placed seller and options |
| SKSE/Plugins/Adorn/AdornSellerAuthorDrafts.json | Conversations per NPC base |
| SKSE/Plugins/Adorn/AdornSellerDialogue.json | Generic/start template and migration input |
| SKSE/Plugins/Adorn/AdornRiddles.json | Riddles/profiles/rules |
| SKSE/Plugins/Adorn/AdornRecipes.json | Recipe templates |
| SKSE/Plugins/Adorn/AdornSellerAuthorRecordings | Sources, selections, trims and bindings |
| SKSE/Plugins/Adorn/publish-job.json and publish-status.json | Build request/result |
| SKSE/Plugins/Adorn/AdornSellerProviders.json | Installed NPC routing |
| SKSE/Plugins/Adorn/AdornSellerVoiceJobs.json | Exact INFO/reply/audio jobs |
| Adorn Seller Framework.esp and matching SEQ | Prepared dialogue records/sequence |
| Sound/Voice/Adorn Seller Framework.esp/VoiceType/*.fuz | Final playable voice/lip files |
| Windows Local AppData seller-build folder | Logs, temporary stages and extracted stock cache |
| Game save and matching .skse | Personal looks/progress, recipes and offer journal |

FUZ filenames derive from INFO records, not take names or runtime IDs. Preserve the matching plugin, SEQ, manifests and voice tree. The provider format remains version 2 with additive clue metadata; author riddle/recipe documents remain version 1. Progress serialization is version 6. These are format versions, not public mod versions.

### Advanced providers and compatibility

Automatic Build is the normal route. An author placing seller INFOs in an NPC mod/patch must preserve ASF conditions/actions and exact voice paths. Required INFO existence is not proof of correct conditions, fragments, audio or winning files.

Use [the advanced author kit](SELLER_AUTHOR_KIT.md) for provider manifests/build diagnostics and [the dialogue contract](SELLER_DIALOGUE_VOICE_CONTRACT.md) for integration boundaries. Preserve ordinary follower/quest dialogue. If an older mod already adds Adorn-specific opening/hand-in choices, adapt or disable the obsolete duplicate in a compatibility patch.

## Complete acceptance walkthrough

1. Install clean runtime/author tools and confirm the required plugins load.
2. Unlock tools, assign a reachable placed NPC and test recipes-only first.
3. Place the first order, follow Find seller, introduce yourself, and complete one ordinary recipe.
4. Write all seven exchanges. Choose stock, silent and one recorded reply; preview/trim and save.
5. Build, exit/install, restart and test each branch plus ordinary NPC conversations.
6. Author a recipe with clear per-piece materials and a tested location; receive/read its note and craft intended armour/clothing.
7. Allow finished orders and confirm one correct delivery. Switch recipes-only on while an outfit order is pending and verify that accepted delivery completes.
8. Author a complete tier pool and two different extra clues. Test level/delivery restrictions, missing coverage and answer dependencies.
9. Prepare clues, restart, ask repeatedly, save/reload and cancel/reorder. Edit/delete a pool entry and check archived help for the earlier offer.
10. Switch sellers and check retained drafts, preference, voice folder and clue isolation.
11. Start a genuine New Game without deleting setup, then switch characters/saves including identical names. Verify personal isolation.
12. Reset this save's encounter; check preserved outfits, learned recipes, completed rewards and fixed prices.
13. Test optional assistance with no key, a deliberate limited-key request, cancellation/context changes and errors.
14. Package reviewed authored output without private caches/settings; install and retest the full player loop.

Compilation/staging does not establish the complete sequence. Track pending acceptance in [release status](docs/nexus/README.md#publication-status) and the focused game-test plans.
