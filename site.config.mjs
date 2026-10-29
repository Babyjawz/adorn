export const groups = [
  { name: 'Start here', pages: ['home', 'requirements', 'release-status'] },
  { name: 'Adorn', pages: ['adorn-intro', 'adorn-start', 'adorn-outfits', 'adorn-assignments', 'adorn-wardrobe', 'adorn-controls', 'sharing', 'adorn-support'] },
  { name: 'Adorn Seller Framework (ASF)', pages: ['asf-intro', 'asf-start', 'asf-orders', 'asf-support'] },
  { name: 'Author tools', pages: ['author-intro', 'asf-setup', 'asf-dialogue', 'asf-recording', 'asf-build', 'recipes', 'riddle-start', 'riddles', 'tier-rules', 'assistance'] },
  { name: 'Reference', pages: ['reference-intro', 'user-data', 'files', 'credits'] }
];

const page = (id, title, path, group, description, source, sections) => ({ id, title, path, group, description, source, sections });
export const pages = [
  page('home', 'Adorn & ASF wiki', 'index.html', 'Start here', 'An introduction to Adorn, Adorn Seller Framework (ASF), and the guides in this wiki.', 'HOME.md'),
  page('requirements', 'Installation requirements', 'start/requirements.html', 'Start here', 'What players need, and the extra tools for authors.', 'SELLER_NEXUS_REQUIREMENTS.md'),
  page('release-status', 'Compatibility & limits', 'start/release-status.html', 'Start here', 'Installation compatibility, practical limits and information to include when asking for help.', 'STATUS.md'),
  page('adorn-intro', 'Introduction to Adorn', 'adorn/introduction.html', 'Adorn', 'An in-game outfit studio for your character, NPCs and factions.', 'ADORN_INTRO.md'),
  page('adorn-start', 'Getting started', 'adorn/getting-started.html', 'Adorn', 'Open Adorn, find your way around and choose your first look.', 'ADORN_MANUAL.md', ['Requirements', 'Install and open', 'Worked example']),
  page('adorn-outfits', 'Outfits & preview', 'adorn/outfits-and-preview.html', 'Adorn', 'Browse your collection, combine pieces and inspect the result.', 'ADORN_MANUAL.md', ['Choose an outfit', 'Read the preview', 'Optional preview extras']),
  page('adorn-assignments', 'NPCs, factions & groups', 'adorn/assignments.html', 'Adorn', 'Dress one character or give a group its own identity.', 'ADORN_MANUAL.md', ['Assign to one NPC', 'Assign to a faction or group', 'Edit or remove assignments']),
  page('adorn-wardrobe', 'Your wardrobe', 'adorn/wardrobe.html', 'Adorn', 'Save favourite looks and switch through the compact wardrobe.', 'ADORN_MANUAL.md', ['Use the player wardrobe']),
  page('adorn-controls', 'Controls & interface', 'adorn/controls.html', 'Adorn', 'Keys, controller navigation and readable interface settings.', 'ADORN_MANUAL.md', ['Controls', 'Interface reference']),
  page('sharing', 'Share assignments', 'adorn/sharing.html', 'Adorn', 'Export contributions and review what you import.', 'ASSIGNMENT_SHARING.md'),
  page('adorn-support', 'Troubleshooting Adorn', 'adorn/troubleshooting.html', 'Adorn', 'Common problems, backups and useful information for a report.', 'ADORN_MANUAL.md', ['Troubleshooting', 'Updates and backups', 'Files and limits']),
  page('asf-intro', 'Introduction to ASF', 'asf/introduction.html', 'Adorn Seller Framework (ASF)', 'Get to know Adorn Seller Framework: outfit progression, crafting and an in-game seller authoring toolkit.', 'ASF_INTRO.md'),
  page('asf-start', 'Your first seller order', 'asf/getting-started.html', 'Adorn Seller Framework (ASF)', 'Find the seller, solve the request and earn your chosen look.', 'ASF_MANUAL.md', ['Requirements', 'Install the framework', { title: 'Play an order', includeChildren: false }]),
  page('asf-orders', 'Orders, recipes & progression', 'asf/orders-and-recipes.html', 'Adorn Seller Framework (ASF)', 'Understand the reward routes, crafting capacity and save-specific progress.', 'ASF_MANUAL.md', ['Recipes and finished outfits', 'Earning and wearing pieces', 'Pending orders and fixed offers', 'Save, reset and recover']),
  page('asf-support', 'Troubleshooting ASF', 'asf/troubleshooting.html', 'Adorn Seller Framework (ASF)', 'Check the installed build, order state and required files.', 'ASF_MANUAL.md', ['Troubleshooting']),
  page('author-intro', 'Introduction to author tools', 'author/introduction.html', 'Author tools', 'How recipes, riddles, dialogue and audio come together in a seller setup.', 'AUTHOR_INTRO.md'),
  page('asf-setup', 'Set up a seller', 'asf/seller-setup.html', 'Author tools', 'Choose the character and configure the author workspace.', 'ASF_MANUAL.md', ['Author setup', 'Author workspace']),
  page('asf-dialogue', 'Write the conversation', 'asf/dialogue.html', 'Author tools', 'Seven core exchanges, player choices and 42 stock voice styles.', 'ASF_MANUAL.md', ['Write the seller dialogue', 'Reply sources and voice folders']),
  page('asf-recording', 'Record, import & trim', 'asf/recording.html', 'Author tools', 'Turn your performance into a chosen reply or extra clue.', 'ASF_MANUAL.md', ['Record or import audio', 'Prepare an extra clue']),
  page('asf-build', 'Build & share a seller', 'asf/build-and-share.html', 'Author tools', 'Generate matching native dialogue and audio, then prepare a player pack.', 'ASF_MANUAL.md', ['Build and activate dialogue', 'Share a finished seller setup']),
  page('recipes', 'Recipe maker', 'author/recipes.html', 'Author tools', 'Choose crafting materials, station locations and parchment instructions.', 'ASF_MANUAL.md', ['Author recipe templates']),
  page('riddle-start', 'First riddle', 'author/first-riddle.html', 'Author tools', 'A short walkthrough from real answer items to a saved challenge.', 'RIDDLE_TIERS_QUICK_GUIDE.md'),
  page('riddles', 'Riddle maker reference', 'author/riddles.html', 'Author tools', 'The full editor, extra clues, validation and content format.', 'RIDDLE_AUTHORING.md'),
  page('tier-rules', 'Tiers & fixed offers', 'author/tiers.html', 'Author tools', 'Calibrate reward tiers and understand remembered payments.', 'ASF_MANUAL.md', ['Author riddles and tiers', 'Riddle maker and tier configuration']),
  page('assistance', 'Optional writing assistance', 'author/assistance.html', 'Author tools', 'Draft with OpenRouter, review the wording and keep manual control.', 'ASF_MANUAL.md', ['OpenRouter author assistance']),
  page('reference-intro', 'Introduction to the reference', 'reference/introduction.html', 'Reference', 'Where to find save ownership, configuration paths, limits and implementation details.', 'REFERENCE_INTRO.md'),
  page('user-data', 'Saves, config & backups', 'reference/user-data.html', 'Reference', 'Know what is shared, what belongs to a save and what to back up.', 'ADORN_USER_DATA.md'),
  page('files', 'ASF files & formats', 'reference/files.html', 'Reference', 'Configuration files, matching provider output and internal format versions.', 'ASF_MANUAL.md', ['Files and provider output']),
  page('credits', 'Artwork & credits', 'reference/credits.html', 'Reference', 'The artwork and type used by this documentation site.', 'CREDITS.md')
];

export const aliases = {
  'docs/nexus/ADORN_USER_GUIDE.md': 'ADORN_MANUAL.md',
  'docs/nexus/ASF_GUIDE.md': 'ASF_MANUAL.md',
  'docs/nexus/README.md': 'STATUS.md'
};

// Split manual chapters need their own context before their first instruction.
export const guideIntroductions = {
  'requirements': 'Adorn and Adorn Seller Framework (ASF) have different installation needs, and creating new seller dialogue requires tools that ordinary players do not need. Use this page to identify the requirements for your role before following either mod’s setup guide.',
  'adorn-start': 'This guide takes you from installing Adorn to opening its outfit studio and making your first selection. Start here if you are new to the mod; the setup steps and worked example explain how browsing, previewing and saving fit together.',
  'adorn-outfits': 'An outfit in Adorn can be a complete installed set or a custom combination of pieces from your collection. This guide explains how to find those pieces, understand their sources and use the preview before applying the result.',
  'adorn-assignments': 'Assignments decide which look an NPC or faction should wear. This guide covers choosing recipients, combining them into groups, preserving individual exceptions and managing the saved rules as your choices change.',
  'adorn-wardrobe': 'The player wardrobe keeps named looks for the character in your loaded save. Use it to organise favourite outfits and switch between them through Adorn or its compact picker; ownership rules depend on whether ordinary Adorn or ASF seller mode is active.',
  'adorn-controls': 'Adorn supports mouse, keyboard and controller navigation, with MCM bindings for its main window and quick wardrobe. This page identifies the controls and explains which views handle outfit design, recipients, saved assignments and author tools.',
  'adorn-support': 'Use this guide when Adorn’s outfits, preview, assignments or wardrobe behave differently from what you expect. It brings common checks, update and backup guidance, and capacity limits together so you can narrow down the problem and prepare a useful report.',
  'asf-start': 'This is the player walkthrough for Adorn Seller Framework (ASF). With a prepared seller setup, you will choose a look in Adorn, meet the assigned character, solve the item payment and receive either finished pieces or a recipe to learn.',
  'asf-orders': 'ASF keeps the selected reward, accepted payment and recipe information together as an order. This guide explains the two delivery routes, how learned crafting entries are retained, what belongs to your save and what encounter recovery preserves.',
  'asf-setup': 'An ASF setup gives one placed NPC the active seller role and defines which order routes players can use. This guide is for authors and modlist creators configuring that service before writing its conversation or building custom dialogue.',
  'asf-dialogue': 'ASF’s dialogue editor lets you give the seller their own player prompts and replies across seven core exchanges. This guide explains drafts, stock recording sources and voice folders so you can prepare a conversation while preserving the NPC’s ordinary dialogue.',
  'asf-recording': 'Use this workflow to supply a seller reply with your own performance, either recorded in game or imported from an audio file. You will preview and trim the take, bind it to the intended words and prepare it for the matching dialogue build.',
  'asf-build': 'Saving a dialogue draft does not activate new replies in Skyrim. This guide takes authors through the build, exit, installation and restart sequence, then explains how to keep the matching files together in a seller pack for players.',
  'asf-support': 'ASF depends on the configured seller, the current save’s order state and the matching installed dialogue output. Use the symptom checks here to identify whether a problem belongs to setup, rewards, recording or a prepared build, and which details to include when asking for help.',
  'recipes': 'Recipe templates define the crafting cost and instructions attached to new ASF recipe orders. This guide shows authors how to choose materials per reward piece, set station-location restrictions and test the delivered parchment and learned crafting entries.',
  'tier-rules': 'Reward tiers let authors connect the pieces being ordered to an appropriate pool of item-payment riddles. This guide explains how to prepare coverage, enable the optional rules and understand why an accepted tiered offer keeps its price within the save.',
  'assistance': 'OpenRouter is an optional writing aid for authors who have already chosen the real answer items and quantities. This guide explains how to request suggestions, review and apply their wording, and manage local key and preference storage; ordinary gameplay and manual writing need no API key.',
  'files': 'ASF’s prepared conversation is a set of matching records, manifests, sequence data and voice files. Use this reference when inspecting build output or packaging a seller, so the files describing one build stay together and their format versions are understood.'
};
