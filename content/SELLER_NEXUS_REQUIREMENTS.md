# Adorn and ASF Nexus requirements

Release-documentation draft, checked 29 October 2026. Adorn is the standalone outfit mod; **Adorn Seller Framework (ASF)** is its optional seller module. Player requirements and author tools are separate. The documented setup is Windows/MO2; the development profile uses Skyrim 1.7.104. Every native dependency must support the same executable. Wider runtime/VR support is not established by this document.

## Runtime requirements for Adorn

Use these relationships in Nexus **Requirements**, not **Mods requiring this file**, which is the reverse relationship.

| Requirement | Official download or project page | Purpose |
| --- | --- | --- |
| SKSE64 | [SKSE](https://skse.silverlock.org/) / [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/30379) | Native plugin loading; match the installed Skyrim executable |
| Address Library for SKSE Plugins | [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/32444) | Native address resolution; match the game build |
| Prisma UI | [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/148718) | Adorn's in-game interface; follow Prisma's own requirements |
| SkyUI | [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/12604) | MCM interface |
| MCM Helper | [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/53000) | MCM settings, hotkeys and persistence |
| SkyPatcher | [Nexus](https://www.nexusmods.com/skyrimspecialedition/mods/106659) | Generated NPC/faction assignment rules on launch |

Prisma UI currently lists **Media Keys Fix SKSE or Keyboard Shortcuts Fix**, plus **Microsoft Visual C++ Redistributable 2022 x64**. Follow the linked Prisma page for the current alternatives and downloads. BodySlide is relevant when using that content/workflow; it is not a blanket requirement for browsing already installed plugin outfits.

The core archive requires **AdornSlots.esp** to be enabled, alongside its native DLL, matching UI/scripts and helper assets. Enabling only the ESP is not a complete installation.

## Additional runtime requirements for ASF

| Requirement | Purpose |
| --- | --- |
| Adorn | ASF uses Adorn's DLL, UI, content and progression systems. Add the real Adorn Nexus page link when published |
| Fuz Ro D-oh – Silent Voice | [Runtime-specific download](https://www.nexusmods.com/skyrimspecialedition/mods/15109) for readable unvoiced fallback replies; retained as required in this release draft |
| Pack-specific NPC/content mods | Only when the chosen authored seller pack references them; the generic framework has no universal follower requirement |

Enable **Adorn Seller Framework.esp** as well as AdornSlots.esp. The current generic framework is NPC-neutral and starts disabled/unassigned. One placed seller is active at a time; prepared drafts may cover multiple NPCs.

Prepared silent FUZ/LIP support now exists, including per-riddle Clue replies, but that does not yet justify removing Fuz Ro D-oh while generic/unprepared fallback is supported and runtime validation is pending. Revisit the dependency only after verifying every advertised unvoiced path in the final archive.

Suggested Nexus wording: **Requires Adorn and its listed requirements, plus Fuz Ro D-oh for unvoiced seller replies. Install versions matching your Skyrim executable. Any NPC-specific seller pack has its own dependencies.**

Ordinary players using prepared content need no API key, Python, Creation Kit, BSArch or development SDK.

## Authoring tools

Only authors preparing changed dialogue/audio need this build toolchain. Manual riddle/recipe text editing alone does not require the audio tools; making an extra clue available in native conversation does.

| Tool | Required when and how supplied |
| --- | --- |
| Python 3 | Used by the current voice preparation/staging scripts; install locally |
| Skyrim Special Edition Creation Kit | [Separate Steam download](https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/); supplies installed audio tools |
| CK LipGenerator, xwmaencode, LIPFuzer | Current pipeline uses `Tools/LipGen/LipGenerator/LipGenerator.exe`, `Tools/Audio/xwmaencode.exe`, `Tools/LipGen/LipFuzer/LIPFuzer.exe` under the CK/game installation. Keep these installed; they are not bundled player tools |
| ASF dialogue builder | Self-contained `SellerDialogueBuild.exe` bundled in the author tools; no .NET SDK needed for the in-game Build action |
| Portable eSpeak NG | Bundled 1.52.0 with data/notices/matching source. Generates temporary silent-line timing guides; its audible speech is not packaged. No separate installation needed |
| FFmpeg | Bundled pinned Windows x64 build for imported/recorded audio normalization. Does not replace CK tools |
| BSArch | Needed for initial local stock-recording extraction if no reusable cache exists. Current publisher looks for `tools/xEdit/BSArch.exe` under MO2. Not needed for an entirely silent/self-recorded workflow |
| OpenRouter account/key | Optional author drafting only, using the author's chosen model/credit. No player or dialogue-build requirement |

**Build [seller]'s seller dialogue** saves drafts and prepares the output while Skyrim runs. After Build complete, save and exit; the publisher installs after Skyrim exits, into the resolved Configs/Overwrite destination. Wait for installation then restart. **Prepare clue dialogue** uses the same pipeline. See [ASF guide](docs/nexus/ASF_GUIDE.md) and [User data](ADORN_USER_DATA.md).

## Publication checks affecting requirements

1. Verify clean installation and the supported executable range against the complete dependency stack. [SKSE downloads](https://skse.silverlock.org/) distinguish Steam, GOG, old SE and VR builds; that does not itself prove Adorn compatibility with each.
2. Keep CK executables and proprietary data such as FonixData out of the archive unless permission allows redistribution. Authors obtain CK separately. Review the [Creation Kit EULA](https://store.steampowered.com/eula/1946180_eula_0).
3. Keep locally extracted vanilla voice clips out of public archives unless distribution is permitted. The stock selector's local extraction does not grant redistribution rights. Review [Nexus file guidelines](https://help.nexusmods.com/article/28-file-submission-guidelines).
4. Preserve and review eSpeak/FFmpeg licences, notices and matching-source obligations for the exact distributed binaries. See [eSpeak bundle details](SELLER_ESPEAK_BUNDLE.md), `tools/package-seller-ffmpeg.ps1` and [FFmpeg's redistribution guidance](https://www.ffmpeg.org/legal.html). Local testing is not completion of a public redistribution review.
5. Keep author-only tools out of Nexus's player dependency list. Document them in Articles/download guides and distinguish source drafts from finished player packs.
6. Retain Fuz Ro D-oh as required until release testing establishes whether every supported fallback can safely work without it.

## Evidence and current limits

The runtime list follows the active Prisma UI implementation, MCM configuration and generated-assignment system. The generic ASF header previously read back Skyrim.esm as its only master; JSON-selected NPCs are not universal plugin masters. Prepared author output can have its own dependencies.

The 29 October editor, native tier/offer logic, compiler and staged audio checks are documented in [riddle results](RIDDLE_TIERS_TEST_RESULTS.md). In-game generic hand-ins, cross-save/New Game behavior, clue playback/lips and successful live OpenRouter generation remain acceptance work. See the [release documentation index](docs/nexus/README.md) for the publication checklist and evidence boundary.
