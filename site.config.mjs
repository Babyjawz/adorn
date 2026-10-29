export const groups = [
  { name: 'Start here', pages: ['home', 'requirements', 'release-status'] },
  { name: 'Adorn', pages: ['adorn-start', 'adorn-outfits', 'adorn-assignments', 'adorn-wardrobe', 'adorn-controls', 'sharing', 'adorn-support'] },
  { name: 'Seller Framework', pages: ['asf-start', 'asf-orders', 'asf-setup', 'asf-dialogue', 'asf-recording', 'asf-build', 'asf-support'] },
  { name: 'Author tools', pages: ['recipes', 'riddle-start', 'riddles', 'tier-rules', 'assistance'] },
  { name: 'Reference', pages: ['user-data', 'files', 'riddle-developer', 'credits'] }
];

const page = (id, title, path, group, description, source, sections) => ({ id, title, path, group, description, source, sections });
export const pages = [
  page('home', 'Welcome to Adorn', 'index.html', 'Start here', 'The guides to Adorn and Adorn Seller Framework.', 'HOME.md'),
  page('requirements', 'Installation requirements', 'start/requirements.html', 'Start here', 'What players need, and the extra tools for authors.', 'SELLER_NEXUS_REQUIREMENTS.md'),
  page('release-status', 'Release & testing status', 'start/release-status.html', 'Start here', 'Implemented features, current limits and the checks still outstanding.', 'STATUS.md'),
  page('adorn-start', 'Getting started', 'adorn/getting-started.html', 'Adorn', 'Open Adorn, find your way around and choose your first look.', 'ADORN_MANUAL.md', ['Requirements', 'Interface reference', 'Install and open', 'Worked example']),
  page('adorn-outfits', 'Outfits & preview', 'adorn/outfits-and-preview.html', 'Adorn', 'Browse your collection, combine pieces and inspect the result.', 'ADORN_MANUAL.md', ['Choose an outfit', 'Read the preview', 'Optional preview extras']),
  page('adorn-assignments', 'NPCs, factions & groups', 'adorn/assignments.html', 'Adorn', 'Dress one character or give a group its own identity.', 'ADORN_MANUAL.md', ['Assign to one NPC', 'Assign to a faction or group', 'Edit or remove assignments']),
  page('adorn-wardrobe', 'Your wardrobe', 'adorn/wardrobe.html', 'Adorn', 'Save favourite looks and switch through the compact wardrobe.', 'ADORN_MANUAL.md', ['Use the player wardrobe']),
  page('adorn-controls', 'Controls & interface', 'adorn/controls.html', 'Adorn', 'Keys, controller navigation and readable interface settings.', 'ADORN_MANUAL.md', ['Controls', 'Interface reference']),
  page('sharing', 'Share assignments', 'adorn/sharing.html', 'Adorn', 'Export contributions and review what you import.', 'ASSIGNMENT_SHARING.md'),
  page('adorn-support', 'Troubleshooting Adorn', 'adorn/troubleshooting.html', 'Adorn', 'Common problems, backups and useful information for a report.', 'ADORN_MANUAL.md', ['Troubleshooting', 'Updates and backups', 'Files and limits', 'Verification status']),
  page('asf-start', 'Your first seller order', 'asf/getting-started.html', 'Seller Framework', 'Find the seller, solve the request and earn your chosen look.', 'ASF_MANUAL.md', ['Requirements', 'Install the framework', 'Play an order']),
  page('asf-orders', 'Orders, recipes & progression', 'asf/orders-and-recipes.html', 'Seller Framework', 'Understand the reward routes, crafting capacity and save-specific progress.', 'ASF_MANUAL.md', ['Play an order', 'Save, reset and recover']),
  page('asf-setup', 'Set up a seller', 'asf/seller-setup.html', 'Seller Framework', 'Choose the character and configure the author workspace.', 'ASF_MANUAL.md', ['Author setup', 'Author workspace']),
  page('asf-dialogue', 'Write the conversation', 'asf/dialogue.html', 'Seller Framework', 'Seven core exchanges, player choices and 42 stock voice styles.', 'ASF_MANUAL.md', ['Write the seller dialogue', 'Reply sources and voice folders']),
  page('asf-recording', 'Record, import & trim', 'asf/recording.html', 'Seller Framework', 'Turn your performance into a chosen reply or extra clue.', 'ASF_MANUAL.md', ['Record or import audio', 'Prepare an extra clue']),
  page('asf-build', 'Build & share a seller', 'asf/build-and-share.html', 'Seller Framework', 'Generate matching native dialogue and audio, then prepare a player pack.', 'ASF_MANUAL.md', ['Build and activate dialogue', 'Share a finished seller setup']),
  page('asf-support', 'Troubleshooting ASF', 'asf/troubleshooting.html', 'Seller Framework', 'Check the installed build, order state and required files.', 'ASF_MANUAL.md', ['Troubleshooting', 'Complete acceptance walkthrough']),
  page('recipes', 'Recipe maker', 'author/recipes.html', 'Author tools', 'Choose crafting materials, station locations and parchment instructions.', 'ASF_MANUAL.md', ['Author recipe templates']),
  page('riddle-start', 'First riddle', 'author/first-riddle.html', 'Author tools', 'A short walkthrough from real answer items to a saved challenge.', 'RIDDLE_TIERS_QUICK_GUIDE.md'),
  page('riddles', 'Riddle maker reference', 'author/riddles.html', 'Author tools', 'The full editor, extra clues, validation and content format.', 'RIDDLE_AUTHORING.md'),
  page('tier-rules', 'Tiers & fixed offers', 'author/tiers.html', 'Author tools', 'Calibrate reward tiers and understand remembered payments.', 'ASF_MANUAL.md', ['Author riddles and tiers', 'Riddle maker and tier configuration']),
  page('assistance', 'Optional writing assistance', 'author/assistance.html', 'Author tools', 'Draft with OpenRouter, review the wording and keep manual control.', 'ASF_MANUAL.md', ['OpenRouter author assistance']),
  page('user-data', 'Saves, config & backups', 'reference/user-data.html', 'Reference', 'Know what is shared, what belongs to a save and what to back up.', 'ADORN_USER_DATA.md'),
  page('files', 'Files & limits', 'reference/files.html', 'Reference', 'Assignment capacity, recipe slots and matching provider output.', 'ASF_MANUAL.md', ['Files and provider output']),
  page('riddle-developer', 'Riddle system internals', 'reference/riddle-system.html', 'Reference', 'The implementation contract for developers maintaining the system.', 'RIDDLE_SYSTEM_DEVELOPER_GUIDE.md'),
  page('credits', 'Artwork & credits', 'reference/credits.html', 'Reference', 'The artwork and type used by this documentation site.', 'CREDITS.md')
];

export const aliases = {
  'docs/nexus/ADORN_USER_GUIDE.md': 'ADORN_MANUAL.md',
  'docs/nexus/ASF_GUIDE.md': 'ASF_MANUAL.md',
  'docs/nexus/README.md': 'STATUS.md'
};
