# Assignment sharing

Adorn exports and imports NPC/faction assignment packs from inside the game. **Export pack** opens Save As so you choose a location; **Import pack** opens a file chooser so you can select a downloaded JSON anywhere. The chosen import opens for review before any assignments change. Folder copying and a game restart are not required for either action.

Recipients merge accepted targets into their own `rules.json`. Imports use the existing assignment save, retirement, live dressing, child policy, and generated SkyPatcher paths. Installing a contribution never applies it automatically.

## Contribute

1. Dress NPCs or factions through Assign as usual.
2. Open **Assignments → Share assignments** and enter a pack name, contributor name, and optional description.
3. Tick **Include in export** beside the assignments to share, or choose **Select all assignments**. Select all includes assignments outside the current search.
4. Choose **Export pack**, choose a filename and location in Save As, and save. Share that JSON. Windows asks before replacing an existing file.

The export goes to the location you chose, such as Downloads or Desktop. Exporting changes neither saved assignments nor generated SkyPatcher files. Cancelling Save As saves no file. Export refuses the active SKSE settings locations to avoid accidentally replacing working configuration; the optional AssignmentPacks folder remains an allowed destination.

## Review and merge

1. Open **Assignments → Share assignments → Import pack** while Skyrim is running.
2. Select the downloaded/exported JSON in the Windows Open dialog. Adorn opens its review screen directly; the original file does not need to be copied into a mod folder. Cancelling file selection imports nothing and preserves an existing review.
3. Review the outfit, pieces, recipient, enabled state, required plugins, faction exclusions, and custom-slot capacity. Each row is one recipient, so part of a mixed group can be accepted while the rest stays unchanged.
4. New recipients default to **Add contribution**. Overlapping direct assignments default to **Keep existing**; explicitly choose **Use contribution** to replace them. Identical assignments are skipped. Missing records or incompatible record types block the affected recipients.
5. Choose **Import selected contributions**. Adorn rechecks the current assignments and dependencies, stages all selected groups, allocates local IDs and outfit slots, captures this installation's original outfits, and saves the batch through its existing commit path. Validation, capacity, or baseline-capture failure before commit leaves the saved files unchanged. The existing commit path attempts rollback if a file write fails.

Accepted contributions become ordinary assignments in `rules.json`; removing the source JSON does not uninstall them. Edit, disable, or delete them through Assignments. A review becomes invalid when working assignments change; review again before importing. Contributor credit is shown on imported rows and preserved by edits and re-export.

Nearby matching NPCs can dress after import. A full Skyrim restart is a separate check that the generated SkyPatcher rules apply on launch.

### Optional installed-pack library

Modlist authors can still supply JSON at `SKSE/Plugins/Adorn/AssignmentPacks/` in an enabled MO2 mod, Adorn Configs, or Overwrite. Expand **Installed packs (optional)**, refresh, select a file, and review it. The `Exports` subfolder is excluded from automatic discovery, but **Import pack** can open a file there directly. This library is optional; normal sharing uses the Open and Save dialogs.

## Preserved behavior and limits

- Installed outfits and custom looks of up to 32 pieces are shareable. NPC/faction groups, group names, enabled states, preview/body sex choices, source labels, and faction exclusions travel with them. Disabled contributions stay disabled.
- Direct NPC assignments retain priority over factions. Accepting a faction does not erase separate direct NPC choices. Replacing one recipient in a group retains the other recipients. An explicitly empty incoming faction exclusion list replaces prior exclusions when that faction's contribution is accepted.
- Faction outfits retain the existing exclusion of child races. Direct child outfits can be exported but are blocked in import review: preview and explicitly approve a compatible outfit locally through Assign. Contributor approval is never treated as local approval.
- Saved player outfits, seller assignments, dialogue, recordings, recipes, and riddles keep their separate stores and are outside an assignment pack. No game saves, generated INIs, local rule IDs, slot numbers, runtime FormIDs, restoration history, or original-outfit snapshots are exported.
- Plugin names and local FormIDs identify records. Compatible defining plugins and records must exist in the active order; compaction, renaming, or changed FormIDs can require reassignment. Mods, meshes, and textures are not bundled.
- The bank remains **64 custom outfit slots**. One accepted source group shares one slot across accepted recipients. Disabled custom rules reserve slots too. Imported groups need free slots as they are staged; a full bank can reject a custom replacement until space is freed. Installed outfits use no custom slots. Sharing changes no slot-bank ESP or plugin records.
- Version 1 supports up to 512 assignment groups, 4096 total recipients, and 8 MB per file. Split larger contributions into multiple packs.

## Format and implementation

Version 1 contains `format: "AdornAssignmentPack"`, `version: 1`, `name`, `author`, `description`, derived `requiredPlugins`, and `assignments`. Each assignment carries `targets`, `outfit`, and optional carried-forward contributor credit. Portable normalization discards unknown fields and derives dependencies from the records themselves. Duplicate recipients in one pack are rejected as ambiguous.

`src/AssignmentPack.cpp` owns normalization, export, conflict review, and selection. `src/RuleStage.cpp` contains the existing validation, slot allocation, recipient replacement, and retirement algorithm shared by ordinary Save and batch import. `src/RuleStore.cpp` owns discovery, immutable review snapshots, and the single commit. `src/PackFileDialog.cpp` runs the Windows Open/Save chooser on its own STA worker; `PackTransfer.cpp` handles bounded reads, UTF-8 path reporting, and completed-file replacement. Selected export content is captured before Save As opens. Review and game-state work return through Skyrim's task interface; live dressing happens only after successful commit. The native dialog follows Microsoft's [Common Item Dialog](https://learn.microsoft.com/en-us/windows/win32/shell/common-file-dialog) API.

## Verification boundary

Use the [step-by-step sharing test checklist](ASSIGNMENT_SHARING_TEST_PLAN.md), starting with its real-life Open/Save workflow. The 27 October file-chooser build passes compilation, 72 offline checks, and 29 sharing UI checks at 1080p and 720p, plus existing layout/controller probes. These include external and Unicode paths, cancellation events, settings protection, and failed-export preservation. Native dialog display/focus and actual Skyrim outfit behavior still need in-game verification.

Offline regressions cover mixed groups, exclusions, disabled state, installed/custom outfits, stripped local state, dependencies, conflict defaults, identical imports, partial groups, credit, malformed addresses, duplicate recipients/choices, and version refusal. Browser probes exercise actual UI controls, requests/events, blocked rows, feedback, review invalidation, layout, and controller reachability. Existing layout and seller controller regressions are also run.

These checks do not establish Skyrim runtime behavior. In game, test a faction with an excluded member and two direct NPC overrides. Export and reimport it, accept a changed faction with a direct recipient skipped, and check exclusions and direct overrides now and after a full Skyrim restart. Repeat import for duplicate detection. Exercise edit/disable/delete restoration on an existing save, missing-plugin refusal, and a full custom-slot bank. Capture `AdornLive.log` and `SkyPatcher.log` for failures.
