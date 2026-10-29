# Introduction to the reference

**The reference section explains how Adorn and Adorn Seller Framework (ASF) store their data, which files belong together, and which limits affect your setup.** Use it when backing up an installation, investigating configuration priority or packaging authored content.

If you are learning either mod for the first time, start with the [Adorn introduction](../ADORN_INTRO.md) or [ASF introduction](../ASF_INTRO.md). The task guides explain the workflow; the reference gives the supporting file and implementation detail.

## Saves, configuration and backups

[Saves, config and backups](../ADORN_USER_DATA.md) separates shared setup from progress belonging to the loaded save. It explains Adorn Configs and Overwrite priority, where authoring creates files, and why a game save and its matching SKSE co-save should be preserved together.

Use that distinction before moving an installation or sharing a configuration. A seller setup and prepared voice output are not the same thing as a player’s order history, learned recipes or personal wardrobe.

## Files, capacity and prepared output

[Files and limits](../ASF_MANUAL.md#files-and-provider-output) identifies ASF’s drafts, recording sources, build manifests and final voice files. Prepared ESP, sequence data, provider information and audio describe a matching build and should stay together.

Adorn’s separate [files and limits](../ADORN_MANUAL.md#files-and-limits) cover the assignment bank and sharing capacity. Assignment slots and ASF’s per-save craftable-piece slots serve different purposes.

## Author content formats

The [riddle maker reference](../RIDDLE_AUTHORING.md#edit-json-outside-the-game) documents the content fields and JSON used for externally edited riddles. Keep stable entry IDs when updating a shared collection. The file format’s version identifies its schema, separately from the mod’s release version.

## Credits and compatibility

[Artwork and credits](../CREDITS.md) identifies the supplied v4 wordmark and heading font used by this wiki. [Compatibility and limits](../STATUS.md) covers supported installation guidance, content requirements and capacity.

When asking for help, include the versions, steps, expected result, actual result and relevant logs so the problem can be reproduced.
