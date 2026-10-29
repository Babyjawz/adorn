# Compatibility & limits

Adorn and Adorn Seller Framework (ASF) use the outfits, NPCs and supporting tools installed in your game. This page explains the practical limits to consider when choosing content, configuring assignments or preparing a seller setup.

## Installation compatibility

**Both Adorn and Adorn Seller Framework have only been tested within an MO2 modlist on Windows.** These guides use that setup; other mod managers and standalone installations are untested. Check the runtime information supplied with your mod download and install versions of SKSE and native dependencies that match your Skyrim executable. A dependency supporting another runtime does not automatically make the complete Adorn installation compatible with it.

The original clothing and NPC mods remain required. Assignment packs and seller configuration reference their records; they do not supply those mods’ meshes, textures or characters.

## Outfits and preview

A custom look supports **up to 32 pieces**. The selected pieces must have compatible equipment slots, meshes and body variants. Combining them does not resolve clipping, create missing male/female meshes or convert clothing between bodies.

BodySlide is strongly recommended for the full browsing workflow. Adorn displays the installed meshes; build the output required by your clothing and enable it in MO2 first. Refreshing Adorn’s builds rescans that output rather than running BodySlide. BHUNP compatibility has not been verified.

## Assignments and sharing

Custom NPC/faction assignments share **64 outfit slots**. Disabled custom rules still reserve their slots. Installed plugin outfits do not use that custom bank, and an imported source group can share a slot across its accepted recipients.

NPC assignments target the **NPC base record**, so copies of the same base can share the result. Faction assignments exclude child races. Direct child contributions require compatible clothing, local preview and explicit approval.

Version 1 assignment packs support up to **512 groups, 4,096 recipients and 8 MB**. Missing defining plugins or changed record identities can prevent a contribution from resolving.

## Adorn Seller Framework (ASF)

One placed NPC holds the active seller role at a time. Authors can retain conversation drafts for several NPCs, but choosing another draft does not create a second simultaneous seller service.

Learned recipe orders share **32 craftable-piece slots per save**. An order with several pieces uses capacity for those pieces. Finished-outfit orders use no recipe slots. The tiered offer journal holds up to **512 distinct offers** in that save.

Changed seller dialogue requires **Build → exit Skyrim → installation → restart**. Saving a draft or choosing a recording alone does not activate new native dialogue.

## Optional writing assistance

OpenRouter assistance requires your own account/key and a compatible available model route. Free capacity and provider restrictions can vary. If a request fails, the editor keeps your manual work; review the error before retrying. ASF does not silently substitute a paid model.

Manual writing and normal gameplay do not require an API key or internet connection. Tier rules start disabled, and the starter riddle pool is example content for authors to expand and balance.

## Asking for help

Include your game and mod versions, input device, selected pieces or seller, the steps taken and the expected versus actual result. Keep relevant logs and leave API keys out of reports.

Use [Adorn troubleshooting](../ADORN_MANUAL.md#troubleshooting) for outfit, preview and assignment problems, or [ASF troubleshooting](../ASF_MANUAL.md#troubleshooting) for orders, recordings and dialogue builds.
