# Adorn manual

Adorn lets you browse installed outfits, assemble custom looks, dress NPCs or factions, and keep a personal wardrobe. This guide covers standalone Adorn. For outfit orders and author tools, use the [ASF guide](ASF_MANUAL.md).


## Contents

- [Requirements](#requirements)
- [Interface reference](#interface-reference)
- [Installation](#install-and-open)
- [Outfit selection](#choose-an-outfit)
- [Preview](#read-the-preview)
- [NPC assignments](#assign-to-one-npc)
- [Factions and groups](#assign-to-a-faction-or-group)
- [Managing assignments](#edit-or-remove-assignments)
- [Player wardrobe](#use-the-player-wardrobe)
- [Assignment sharing](#share-an-assignment-pack)
- [Controls](#controls)
- [Updates and removal](#updates-and-backups)
- [Troubleshooting](#troubleshooting)
- [Worked example](#worked-example)
- [Files and limits](#files-and-limits)

## Requirements

| Component | Purpose |
| --- | --- |
| [SKSE64](https://skse.silverlock.org/) | Native plugin loading; use the build matching your Skyrim executable |
| [Address Library](https://www.nexusmods.com/skyrimspecialedition/mods/32444) | Native address resolution |
| [Prisma UI](https://www.nexusmods.com/skyrimspecialedition/mods/148718) | In-game interface |
| [SkyUI](https://www.nexusmods.com/skyrimspecialedition/mods/12604) | MCM |
| [MCM Helper](https://www.nexusmods.com/skyrimspecialedition/mods/53000) | Persistent settings and key bindings |
| [SkyPatcher](https://www.nexusmods.com/skyrimspecialedition/mods/106659) | Assignment rules on launch |

Follow Prisma UI's own requirements, currently including Media Keys Fix SKSE **or** Keyboard Shortcuts Fix, and Microsoft Visual C++ Redistributable 2022 x64. Original clothing mods supply the actual items, meshes and textures. BodySlide and a body replacer are needed where required by that clothing/workflow, not universally for plugin-outfit browsing.

ASF is an optional module with its own additional requirements. It is not needed for standalone assignments or the ordinary player wardrobe.

## Interface reference

| View/control | Responsibility |
| --- | --- |
| **Outfits** | Browse installed looks and assemble custom pieces |
| **Assign → NPCs** | Nearby actors, active-modlist search and NPC selection |
| **Assign → Factions** | Faction/member browsing and exclusions |
| **Assign → Player** | Save/wear personal looks and use optional seller orders |
| **Selected recipients** | Review the entire NPC/faction group before saving |
| **Assignments** | Existing rules, edit/disable/delete and contribution sharing |
| **Their outfit / Your outfit** | Compare the recipient's existing look with your draft |
| **Auto / Female / Male** | Preview body sex |
| Header **+ / −** | Text scale |
| Preview colour dots | Pine, sky, grey or pink |
| **Play / Pause game** | Interface play/pause control |
| **X** or opening key | Close/toggle Adorn |
| **Quick saved outfits** | Compact player wardrobe, with a separately bound MCM key |
| **Seller / Riddles / Recipes** | Author tools, documented in the ASF manual |

Previewing prepares a choice. Save assignment, Save outfit, Give items and Wear now have different effects. Read the action/status before assuming an actor or saved rule has changed.


## Install and open

1. Install the [runtime requirements](SELLER_NEXUS_REQUIREMENTS.md#runtime-requirements-for-adorn). Use builds matching your Skyrim executable.
2. Install and enable Adorn in MO2. Enable `AdornSlots.esp` in the Plugins pane.
3. If supplied, enable **Adorn Configs** below Adorn in the left pane. That folder holds editable configuration separately from runtime updates.
4. Launch SKSE through MO2, load your save and press **F6**. Change the key in **MCM → Adorn → Open / close Adorn** if needed.

The documented workflow is MO2 on Windows. The current test profile uses Skyrim 1.7.104. Other runtimes/mod managers need separate validation.

## Choose an outfit

Start in **Outfits**. **Installed outfit → Browse outfits** searches the active modlist. Choose a result, inspect its pieces and preview, then select **Use this outfit** where offered.

Switch to **Custom outfit** to choose individual pieces. You can also add an installed set to the custom look and edit it. A custom look supports up to 32 pieces. Armour and clothing still need compatible body slots and meshes; combining them does not resolve clipping or two items using the same slot.

Where available, **BodySlide** and **Plugin outfits** select the browsing source. BodySlide groups help find built content. If the wrong build folder is detected, use **Output folder → Scan this folder** and choose the folder containing the built meshes. **Refresh builds** rescans; Adorn does not run BodySlide or build missing meshes.

### Build a custom look step by step

1. Choose **Custom outfit → Add armor piece**.
2. Search by name, EditorID or source plugin. Check the intended variant and equipment slots.
3. Add compatible pieces, or start from an installed set with **Add full set to custom outfit**.
4. Review each row in the custom-piece list beside the preview. Remove unwanted pieces through that row's remove action.
5. When selecting replacements for a BodySlide look's occupied slots, inspect the resulting kept/replaced pieces before saving.
6. Name the look where offered, choose recipients or Player, then use the appropriate Save action.

A custom look combines item records. It does not create new mesh assets, convert bodies, alter enchantments or resolve incompatible slot definitions.

### Understand BodySlide source warnings

A detected project/output is not proof that its mesh wins every conflict. Pay attention to overridden/ambiguous warnings: another mod can replace output, and several projects can produce the same file. Adorn's preview uses the current winning game meshes.

Male/Female filters narrow availability; they do not create missing variants. The originating plugin and the mod currently winning the meshes may differ. Check the output folder and source labels before rebuilding anything.

## Read the preview

Drag the model or use its right-stick control to rotate. **Auto**, **Female** and **Male** select preview body sex. When inspecting an NPC or faction member, **Their outfit / Your outfit** compares the existing and proposed look. A preview is not an equip action.

Meshes and textures come from the active installation. A blank body part, wrong shape or clipping should first be checked against the clothing's body requirements, available meshes and your BodySlide build. The preview is not a guarantee that every race, child body or physics combination will render identically on an actor in game.

Use **+ / −** in the header to change text size. The four colour dots choose the interface palette. **Pause game** and **Play** control the interface's play/pause flow; follow the visible focus state when returning to gameplay.

## Assign to one NPC

1. Choose the outfit first.
2. Open **Assign → NPCs**. Use **Nearby now**, search the active modlist, or use the crosshair NPC where offered.
3. Add the intended recipient and review **Selected recipients**. Clear unintended recipients before saving.
4. Inspect the preview and select **Save assignment**.
5. Open **Assignments** to find the saved rule. Check the actor now and after a complete Skyrim restart.

An NPC assignment targets the **base NPC**, even when selected through a nearby reference. Other copies of that base can receive the same outfit. It is not a rule limited to the one actor standing in front of you.

Location information is available when Adorn can resolve a loaded or previously observed actor. **Last seen in** is session information, not continuous tracking. **Teleport to** appears only when an available reference is unambiguous; it moves the player to that reference and does not create an NPC.

## Assign to a faction or group

In **Assign → Factions**, choose the faction, inspect its members and exclude those who should keep their own clothes. Add the faction to **Selected recipients**. NPC and faction recipients can share one named group and look. Save when the entire recipient list is correct.

A direct NPC assignment takes priority over its faction assignment. If a member keeps a different Adorn outfit, check for an existing direct rule before changing the faction. Faction rules exclude child races. A direct child assignment needs compatible child meshes, local preview and explicit approval; approval from someone else's shared pack does not carry over.

The native custom bank has **64 slots**. A custom recipient group shares one slot; disabled custom rules still reserve slots. Installed plugin outfits use none of that custom bank. Free capacity by removing unused custom rules through Adorn, then follow any retirement/restart instructions shown.

## Edit or remove assignments

Use **Assignments** to select, edit, disable or delete saved rules. Saving updates eligible nearby actors and writes the next-launch SkyPatcher rules. Restart Skyrim to verify the persistent result for actors outside the current area.

Keep Adorn installed while removing rules you no longer want. Generated patches and actor changes can outlive disabling a runtime folder. Another outfit manager or actor script can also reapply clothing. Do not use deletion of `rules.json` or all of Overwrite as routine troubleshooting.

Assignments are installation configuration. All saves using those files see them. A new character does not reset NPC/faction assignments, and a separate MO2 profile may still use the same physical Configs or Overwrite files.

## Use the player wardrobe

Choose the look, then open **Assign → Player**. Name it and select **Save outfit**. The saved list belongs to the loaded save; save the game before exiting. Back up the matching `.ess` and `.skse` files together.

| Mode | Item and wear behavior |
| --- | --- |
| Ordinary standalone play | **Give items** supplies chosen pieces. **Wear now** and saved **Wear** supply missing base pieces before equipping. |
| Developer tools unlocked | Give is hidden/rejected; Wear requires already owned pieces. This mode is intended for authoring. |
| Seller mode active | Direct Give and unsaved Wear are blocked; saved Wear requires ownership. Obtain new pieces through the seller/crafting loop. |

To use the compact picker, bind **MCM → Adorn → Quick saved outfits** to a key different from the main opening key. It starts unbound. The picker uses this save's saved looks and the same ownership rules.

If upgrading from the old shared wardrobe file, **Recover old saved outfits…** explicitly copies those looks into the current save. Use it only on the intended character. It leaves the old file intact and grants no items; new games do not import it automatically.

## Share an assignment pack

In **Assignments → Share assignments**, enter a pack name and contributor, select assignments, then **Export pack**. Save the JSON where you want and share that file.

To use someone else's pack, select **Import pack**, open its JSON, review each NPC/faction, dependencies and conflicts, then **Import selected contributions**. Overlaps default to **Keep existing**. Missing mods or records block affected rows. Importing allocates local slots; it does not download the original mods.

Accepted contributions become ordinary saved assignments. Removing the downloaded JSON does not remove them. Player looks, seller setup, riddles and recordings are outside these packs. See [Assignment sharing](ASSIGNMENT_SHARING.md) for exclusions, capacity and format limits.

## Controls

Mouse users can scroll the pane under the pointer. Controller users move focus with the left stick/D-pad and use the displayed Accept/Back actions. Shoulder buttons move between panes where available; right-stick behavior depends on the current view, rotating the outfit preview or scrolling an authoring pane. In Riddles, right-stick up/down scrolls the focused pane.

If text or settings extend below a pane, scroll that pane rather than the whole workspace. Enlarged-text and browser controller checks have passed; embedded Skyrim input and native file-dialog focus still need acceptance testing.

## Updates and backups

Before replacing runtime files, exit Skyrim and back up the saves/co-saves, Adorn Configs and Adorn-generated Overwrite files. Keep the release's DLL, UI and scripts together. Preserve personal JSON and generated assignment patches. ASF authors must also preserve their prepared ESP/SEQ/audio as a matching set.

Current config reads prefer an existing file in **Overwrite**, then enabled **Adorn Configs**, before shipped defaults. Existing personal author data in Overwrite also keeps subsequent author writes/builds there. A blank Configs starter therefore does not erase or supersede existing Overwrite content. Review actual winning files before consolidating folders. See [User data](ADORN_USER_DATA.md).

For removal, back up first, retire unwanted assignments through the UI and verify restoration after restarting. Inspect generated Adorn files separately from runtime files. A return to a save made before installation is the clearest rollback; no clean mid-save uninstall guarantee is made.

## Troubleshooting

| Symptom | Check and next action |
| --- | --- |
| F6 does nothing | Check the MCM binding, launch through SKSE, confirm `AdornSlots.esp` is enabled and Prisma UI plus its input/runtime requirements load. Read `AdornLive.log` and `skse64.log`. |
| MCM or author tabs missing | Check SkyUI/MCM Helper and matched scripts/config. Seller/Riddles/Recipes are author tools; ordinary use needs no author unlock. |
| Outfit does not appear in browsing | Confirm its defining plugin is active. Search by name, EditorID or source; for BodySlide content refresh and check Output folder. |
| Preview incomplete or wrong body | Check installed clothing/body meshes and actual BodySlide output. Include the selected body sex, pieces and source mod in a report. |
| Clothes change back | Check direct-versus-faction rules, another outfit manager/follower script and later SkyPatcher rules. Verify generated-file priority and retest after a full restart. |
| Custom bank full | Disabled custom assignments still reserve slots. Remove unused rules and follow retirement feedback, or use an installed outfit. |
| Wardrobe appears on the wrong character or disappears | Confirm the intended save and matching co-save. New wardrobes are save-specific; use explicit legacy recovery only on the intended character. |
| Starter config appears ignored | Check Overwrite for personal files that correctly take precedence. Back them up before any move; do not clear unrelated Overwrite content. |
| Import blocked | Read the affected row's dependency, record-type or capacity explanation. Review again if assignments changed while the review was open. |

For support, send reproduction steps, expected/actual result, game and SKSE versions, Adorn/ASF versions, relevant outfit/NPC mods and screenshots. Include the relevant `AdornLive.log` from the active SKSE log directory; use the actual Skyrim Documents location, which may be redirected by Windows/OneDrive. Remove secrets and unrelated personal information from shared diagnostics.



## Worked example

To dress a faction while preserving one member's look:

1. Choose a modest installed outfit and inspect it.
2. Open **Assign → Factions**, select the intended faction and inspect members.
3. Exclude the member whose clothes should remain. Add the faction to Selected recipients and save.
4. Check several nearby members, then verify again after restarting Skyrim.
5. Choose another look and make a direct assignment for a different member. That actor should use the direct rule while other eligible members use the faction look.
6. Change the faction outfit through Assignments and confirm the exclusion/direct override remain effective.
7. Export the rules through Share assignments and inspect their dependencies/conflicts in import review.
8. Remove the test rules through Assignments, follow retirement feedback, restart and verify the intended restoration.

Use a separate test configuration if the shared change should not affect other characters. A test save alone does not isolate assignment files.

## Files and limits

| Data | Ownership |
| --- | --- |
| SKSE/Plugins/Adorn/rules.json and drafts.json | Shared NPC/faction choices and working drafts |
| SKSE/Plugins/SkyPatcher/{npc,outfit}/zzzzAdorn/zzAdornRules.ini | Shared generated next-launch rules |
| Player saved looks | Current game's SKSE co-save |
| Old player-outfits.json | Explicit recovery source only |
| SKSE/Plugins/Adorn/settings.json | Shared BodySlide output choice |
| MCM/Settings/AdornSlots.ini | Local MCM bindings/author access |
| Exported pack JSON | Chosen Save As location |
| SKSE/Plugins/Adorn/AssignmentPacks/ | Optional installed-pack library |

Back up both saves/co-saves and shared configuration when moving installations.

| Limit | Scope |
| --- | --- |
| 32 pieces | One custom look |
| 64 custom slots | NPC/faction custom assignment bank; disabled rules reserve slots |
| 512 groups / 4096 total recipients / 8 MB | Version 1 assignment pack |
| 32 craftable piece slots | Separate ASF recipe system per save, not the NPC assignment bank |

One imported source group shares a slot across accepted recipients. Installed plugin outfits use no custom slots. Replacement imports still need staging capacity; a full bank can require freeing space first.

### Import details

Review is per recipient, so part of a mixed group can be accepted while the rest stays unchanged. Disabled contributions remain disabled. Identical assignments are skipped. Accepting an explicitly empty faction exclusion list clears the old exclusions for that contribution. Credit survives edits and re-export.

Packs carry record references, not mod assets, original-outfit snapshots, runtime IDs or local allocation. Plugin renaming, FormID compaction or removed records can invalidate an old contribution. Use compatible defining mods and review dependencies again.

A direct child contribution needs local preview/approval; contributor approval is not trusted as yours. Missing dependencies and blocked rows should be resolved through review, not guessed runtime IDs.

## Optional preview extras

The current build includes a TNG male-preview reveal behind the 200% text-size joke and **Show more / Hide more**. It requires relevant installed anatomy assets and is confined to the supported adult male static preview. It does not dress/equip an actor. Female, child and quick previews have no such switch. Positioning and hide/reveal regressions retain the acceptance limits recorded in the release notes.

Hair studio/barber services and automatic body conversion are design work, not current workflows. Use this manual's available controls rather than prospective design notes.

## Verification status

The manual describes implemented behavior. Clean release installation, assignment edit/delete/restart restoration, native pack dialogs and target body/mesh combinations still need acceptance. For a report, include the exact game version, input device, pieces, recipient and expected/actual result. A UI/compiler check does not establish those Skyrim outcomes.
