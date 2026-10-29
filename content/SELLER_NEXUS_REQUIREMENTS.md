# Adorn and ASF Nexus requirements

Release-documentation draft, checked 29 October 2026. Adorn is the standalone outfit mod; **Adorn Seller Framework (ASF)** is its optional seller module. Player requirements and author tools are separate. The documented setup is Windows/MO2; the development profile uses Skyrim 1.7.104. Every native dependency must support the same executable. Wider runtime/VR support is not established by this document.

## Supported setup

**Adorn and Adorn Seller Framework (ASF) have only been tested within an MO2 modlist on Windows.** Other mod managers and standalone installations are untested. Use **Mod Organizer 2 (MO2)** for the documented installation and authoring workflows.

Install versions of SKSE and every native dependency that match your Skyrim executable. Support for another runtime in an individual dependency does not establish compatibility for the complete Adorn/ASF setup.

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

Prisma UI currently lists **Media Keys Fix SKSE or Keyboard Shortcuts Fix**, plus **Microsoft Visual C++ Redistributable 2022 x64**. Follow the linked Prisma page for the current alternatives and downloads.

The core archive requires **AdornSlots.esp** to be enabled, alongside its native DLL, matching UI/scripts and helper assets. Enabling only the ESP is not a complete installation.

### BodySlide, bodies and outfit assets

**[BodySlide and Outfit Studio](https://www.nexusmods.com/skyrimspecialedition/mods/201) is strongly recommended for Adorn's full outfit-browsing experience.** BodySlide projects, groups and built outfit meshes are a major part of Adorn's browsing workflow.

Install the original clothing mods and their required body setup. For outfits that require BodySlide output, **build those outfits in BodySlide before using them in Adorn**, and enable the output in MO2. Adorn detects and previews installed meshes; **Refresh builds** rescans them rather than running BodySlide or creating missing meshes.

Plugin-outfit browsing can also use existing installed meshes without BodySlide projects. This does not remove the body or build requirements of the clothing itself. Adorn does not convert outfits between bodies or fix clipping. **BHUNP compatibility has not been verified**; do not assume a BodySlide project alone establishes support.

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

**Players using prepared seller content do not need to install this authoring toolchain.** It is for authors building new or changed dialogue/audio, including prepared extra-clue replies. Manual riddle/recipe text editing alone does not require the audio tools.

### Included with ASF — no separate installation

The complete ASF author bundle already supplies the following tools. **You do not need to download or install additional copies for the normal Build workflow.**

| Included tool | What it does | Installation |
| --- | --- | --- |
| ASF dialogue builder | Builds the native dialogue records and supporting output using self-contained `SellerDialogueBuild.exe` | **Bundled with ASF**; no separate .NET SDK needed |
| Portable eSpeak NG 1.52.0 | Supplies temporary timing guides for silent replies, with its data/notices/matching source; its audible speech is not packaged | **Bundled with ASF**; no separate eSpeak installation needed |
| FFmpeg | Normalizes imported and recorded audio using the supplied Windows x64 build | **Bundled with ASF**; no separate FFmpeg installation needed |

### Install separately — only for dialogue/audio authoring

| Tool | What you need to do |
| --- | --- |
| Python 3 | **Not bundled. Install separately** for the voice preparation/staging scripts. |
| Skyrim Special Edition Creation Kit | **Not bundled with ASF.** Install the [Creation Kit from Steam](https://store.steampowered.com/app/1946180/Skyrim_Special_Edition_Creation_Kit/). It supplies LipGenerator, xwmaencode and LIPFuzer; these are **Creation Kit tools**, not three additional ASF downloads. |

The build expects the CK tools in their installed CK/game locations: `Tools/LipGen/LipGenerator/LipGenerator.exe`, `Tools/Audio/xwmaencode.exe` and `Tools/LipGen/LipFuzer/LIPFuzer.exe`. Bundled FFmpeg and eSpeak do not replace them.

### BSArch requirement for stock Skyrim voice replies

**BSArch is an authoring requirement when building seller dialogue that uses stock Skyrim recordings. It is not bundled with ASF.** It extracts the installed game's voice archive into a local cache; a fresh stock-voice setup needs it even if another author's existing cache did not.

**BSArch is included with xEdit builds**, as confirmed by [its author](https://www.nexusmods.com/fallout4/mods/63243?tab=posts). Check your existing xEdit/SSEEdit folder for `BSArch.exe` first: **if it is already at the path below, no extra download is needed.** ASF uses this command-line tool, not the xEdit editor. BSArch is separate from the Creation Kit; installing CK does not supply the executable ASF calls.

1. Check your xEdit/SSEEdit installation for `BSArch.exe`. **If missing**, download the **BSArch command-line tool** from [the author's Nexus Files page](https://www.nexusmods.com/newvegas/mods/64745?tab=files), rather than the separate BSArchPro GUI. The standalone tool's page is hosted under Fallout New Vegas; ASF uses it to extract Skyrim's voice archive.
2. Extract it into `tools\xEdit` inside the MO2 instance used for Adorn. Create those folders if needed and keep the downloaded package's accompanying files together.
3. Confirm the executable is directly at **`<MO2 instance folder>\tools\xEdit\BSArch.exe`**, with no extra nested download folder. For example, an instance at `N:\NSW` needs `N:\NSW\tools\xEdit\BSArch.exe`.
4. Keep the game's `Data\Skyrim - Voices_en0.bsa` available. The current stock-recording workflow expects that English voice archive.

The current publisher looks at that exact MO2-relative path. **Do not install BSArch as a normal mod in the left pane; no MO2 executable entry is needed.** ASF invokes it automatically when preparing stock recordings. CK's `Archive.exe` is not a configured replacement.

Players using a prepared seller pack do not need BSArch. Authors using only silent or their own imported/recorded replies do not need stock extraction. Once an extraction cache exists, ASF reuses it while the voice archive is unchanged; keep BSArch installed for future rebuilds.

[BSArch source code in the xEdit repository](https://github.com/TES5Edit/TES5Edit/blob/dev-4.1.6/BSArch.dpr).

### Optional writing assistance

| Tool or service | When needed | Bundled? |
| --- | --- | --- |
| OpenRouter account/key | Optional writing suggestions using the author's chosen model/credit. No requirement for manual writing, gameplay or dialogue builds. | **Not included or required**; use your own account/key only if you enable assistance. |

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
