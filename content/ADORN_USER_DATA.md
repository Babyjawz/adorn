# Adorn user data in MO2

Adorn keeps authored configuration separate from runtime defaults. On MO2, current reads prefer an existing per-file override in **Overwrite**, then enabled **Adorn Configs**, before shipped defaults. If `overwrite/SKSE/Plugins/Adorn/` already contains personal author data, subsequent author saves/builds stay together in **Overwrite**. Otherwise an enabled, existing **Adorn Configs** mod is the write destination; without it, writes use Overwrite. A blank starter does not supersede personal Overwrite files. Files appear when their feature is first saved.

`mods/Adorn Configs/SKSE/Plugins/Adorn/`

When Overwrite is the resolved destination, replace `mods/Adorn Configs/` with `overwrite/` in every path below. Files are created when their feature saves, not all at startup. Keep this mod's exact name **Adorn Configs** for the current resolver. Inspect winning files before moving content; preserve existing work.

| Author data | Path below Adorn Configs or Overwrite |
| --- | --- |
| Assignments and drafts | `SKSE/Plugins/Adorn/rules.json`, `drafts.json` |
| Optional installed assignment packs | `SKSE/Plugins/Adorn/AssignmentPacks/*.json` (normal Import/Export uses files chosen anywhere through Open/Save) |
| Old shared player outfits (recovery only) | `SKSE/Plugins/Adorn/player-outfits.json`; new personal wardrobes live in each SKSE co-save |
| Seller and edited content | `SKSE/Plugins/Adorn/AdornSeller.json`, `AdornRiddles.json`, `AdornRecipes.json`, `AdornSellerDialogue.json` |
| Per-NPC dialogue drafts | `SKSE/Plugins/Adorn/AdornSellerAuthorDrafts.json` |
| Raw takes, reply bindings, chosen take and trim | `SKSE/Plugins/Adorn/AdornSellerAuthorRecordings/<seller>/takes/<moment>/` |
| BodySlide output-folder choice | `SKSE/Plugins/Adorn/settings.json` |
| Generated assignment patches | `SKSE/Plugins/SkyPatcher/{npc,outfit}/zzzzAdorn/zzAdornRules.ini` |
| Seller build request and results | `SKSE/Plugins/Adorn/publish-job.json`, `publish-status.json`, `AdornSellerProviders.json`, `AdornSellerVoiceJobs.json` |
| Prepared seller records and audio | `Adorn Seller Framework.esp`, `SEQ/Adorn Seller Framework.seq`, `Sound/Voice/Adorn Seller Framework.esp/<voice type>/*.fuz` |
| MCM settings | `MCM/Settings/AdornSlots.ini` (written by MCM Helper; Overwrite fallback needs an in-game check) |

It holds outfit assignments (`rules.json`), the selected seller and seller options (`AdornSeller.json`), edited player dialogue (`AdornSellerDialogue.json`), riddles, recipes, per-NPC author drafts, recording takes, and the BodySlide output-folder choice (`settings.json`). Review author content before distributing a Configs mod; personal legacy outfit files are not needed for a fresh player. Do not copy user data into either runtime mod.

Personal saved outfits, seller introduction/unlock, discovery, orders, learned recipes and tiered offer/history journals belong to the loaded save's `.skse` companion. New games start empty and locked while keeping shared author setup. Loading an earlier save restores its earlier personal state. Back up the matching game save and co-save together. Save after personal changes or an encounter reset. Old `player-outfits.json` files remain read-only recovery sources: **Assign → Player → Saved outfits → Recover old saved outfits…** copies them after confirmation. **MCM → Adorn → Troubleshooting → Reset seller encounter…** resets introduction/discovery and cancels a pending order, preserving outfits, learned recipes, completed rewards and fixed tiered offers. See [the save-state test plan](SELLER_SAVE_STATE_TEST_PLAN.md).

The Adorn mod contains clean defaults and read-only stock voice catalogs. The clean Configs mod begins with editable copies of the starter seller, dialogue, riddles, and recipes plus empty assignment and draft files. An older empty player-outfit file may still be present; it is no longer the live wardrobe. Editable author JSON in the user-data folder takes precedence over shipped defaults and author saves go there. Personal progress is saved with the game. Custom dialogue provider and voice-job manifests still belong under `SKSE/Plugins/Adorn/` in the authored output mod.

The same destination also holds `MCM/Settings/AdornSlots.ini`, both generated `SKSE/Plugins/SkyPatcher/{npc,outfit}/zzzzAdorn/zzAdornRules.ini` files, and prepared ASF output (`Adorn Seller Framework.esp`, matching `SEQ` and `Sound/Voice` files). MCM Helper's actual fallback write into Overwrite still needs an in-game check. These paths are imposed by MCM Helper, SkyPatcher, and Skyrim. The game save carries order progress and other save-bound state. The ASF publisher keeps its temporary build stage and extracted stock-audio cache under Windows Local AppData, outside the shareable data.

The ASF runtime mod contains the framework ESP, scripts, FFmpeg, portable eSpeak and author tools. Its clean generic distribution contains no selected NPC, personal recordings or NPC-specific provider. Authored INFO and FUZ output needs Build, post-exit installation and restart. In-game playback must then be checked.

OpenRouter's API key and model/persona/provider preferences are separate Windows Credential Manager entries for the same Windows account/PC. Neither belongs to these folders, game saves or exports. Use **Assistance → Remove key** to delete the key explicitly. Review [the riddle maker manual](RIDDLE_AUTHORING.md) before using optional assistance.

## Share selected assignments

For selected NPC/faction contributions instead of sharing the whole configuration, use **Assignments → Share assignments**. Packs carry installed/custom looks, mixed recipient groups, enabled state, and faction exclusions; the recipient reviews conflicts before merging. See [ASSIGNMENT_SHARING.md](ASSIGNMENT_SHARING.md) for paths, limits, and the local child-approval rule.

**Export pack** opens Save As so you choose the output location. **Import pack** opens a file chooser and reviews a JSON directly from Downloads, Desktop, or another folder while Skyrim is running. Copying into Adorn Configs and restarting are not required to select/import a file. The AssignmentPacks folder is an optional modlist-supplied library, available under **Installed packs (optional)**.

Imported assignments become part of `rules.json`. Removing their source pack does not remove accepted assignments. Test in a separate configuration: another save or MO2 profile can still use the same Adorn Configs directory. Follow [ASSIGNMENT_SHARING_TEST_PLAN.md](ASSIGNMENT_SHARING_TEST_PLAN.md) for the faction/exclusion/restart checks.

## Reset with Adorn Configs

For a character's seller encounter, use the MCM recovery action instead of changing installation files. Confirming Reset cancels a pending order and clears introduction/discovery for the current save, preserving completed rewards and fixed tiered offers. The next first order says Find seller until you speak to them; pending answers remain hidden even for authors. New games do not require manual reset. The user confirmed the replacement reset/discovery start; the full New Game/cross-save checks remain in the test plan.

For an intentional clean author test, first back up and identify all Adorn-generated files in Configs and Overwrite, including SkyPatcher INIs, MCM settings, JSON and matching ASF ESP/SEQ/voices. Isolate that known set in a separate configuration; do not delete or clear Overwrite. Existing Overwrite files can otherwise override the starter. Disabling Configs alone does not remove those overrides or personal save progress. Clean shipped seller JSON is disabled with no NPC. **Developer tools unlocked** shows local author state after acceptance; unticking clears the credential. A blank input alone does not mean locked.

This resets installation-level author data. An existing Skyrim save still contains its own order history, learned recipes, quest state, and any actor changes already saved by the game. Use a new save for a completely blank gameplay state. Share Adorn Configs as a third MO2 mod **below Adorn and ASF in MO2's left pane**; do not include unrelated Overwrite files or the Local AppData build cache.
