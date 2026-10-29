// Adapt project documentation to a public wiki without changing the maintained
// manuals or losing these edits when npm run sync refreshes their snapshots.
export function wikiCopy(name, source) {
  if (name === 'SELLER_NEXUS_REQUIREMENTS.md') {
    source = source
      .replace(/^Release-documentation draft, checked 29 October 2026\. /m, 'Requirements for the documented 29 October 2026 build. ')
      .replace(/^Use these relationships in Nexus .*\n\n/m, '')
      .replace('Add the real Adorn Nexus page link when published', 'Requires the complete Adorn installation')
      .replace('retained as required in this release draft', 'required for the current fallback paths')
      .replace(/^Suggested Nexus wording:.*\n\n/m, '')
      .replace(/^## Publication checks affecting requirements\n[\s\S]*?(?=^## Evidence and current limits)/m, '')
      .replace(/^The 29 October editor, native tier\/offer logic, compiler and staged audio checks are documented in .*$/m,
        'The editor, tier/offer logic, compiler and staged audio have offline checks. In-game generic hand-ins, cross-save/New Game behavior, clue playback/lips and successful live OpenRouter generation remain acceptance work. See [release and testing status](STATUS.md) for the current evidence boundary.');
  }
  if (name === 'ASSIGNMENT_SHARING.md') {
    source = source.replace(/^Use the \[step-by-step sharing test checklist\].*$/m,
      'The file-chooser, pack validation and sharing interface have offline checks. Native Open/Save dialog focus, actual outfit application, faction exclusions and restart behavior still need in-game verification. See [release and testing status](STATUS.md).');
  }
  if (name === 'RIDDLE_TIERS_QUICK_GUIDE.md' || name === 'RIDDLE_AUTHORING.md') {
    source = source
      .replace(/ and the \[dated model guide\]\(OPENROUTER_AUTHOR_MODEL_GUIDE\.md\)/g, '')
      .replace(/\[the current test evidence\]\(RIDDLE_TIERS_TEST_RESULTS\.md\)/g, '[the current testing status](STATUS.md)')
      .replace(/\[test evidence\]\(RIDDLE_TIERS_TEST_RESULTS\.md\)/g, '[testing status](STATUS.md)');
  }
  if (name === 'ADORN_USER_DATA.md') {
    source = source
      .replace(/\[the save-state test plan\]\(SELLER_SAVE_STATE_TEST_PLAN\.md\)/g, '[the current save-testing status](STATUS.md)')
      .replace(/Follow \[ASSIGNMENT_SHARING_TEST_PLAN\.md\]\(ASSIGNMENT_SHARING_TEST_PLAN\.md\) for the faction\/exclusion\/restart checks\./g,
        'Faction application, exclusions and restart behavior still need in-game acceptance; see [testing status](STATUS.md).');
  }
  if (name === 'ASF_MANUAL.md') {
    source = source
      .replace(/Use \[the advanced author kit\]\(SELLER_AUTHOR_KIT\.md\) for provider manifests\/build diagnostics and \[the dialogue contract\]\(SELLER_DIALOGUE_VOICE_CONTRACT\.md\) for integration boundaries\./g,
        'Use **Open build logs** in the seller dialogue editor to inspect build diagnostics.')
      .replace('and the focused game-test plans.', 'and test the applicable steps in Skyrim.');
  }
  return readerCopy(name, source);
}

function omitChapter(source, title) {
  const marker = '## ' + title + '\n';
  const start = source.indexOf(marker);
  if (start < 0) return source;
  const next = source.indexOf('\n## ', start + marker.length);
  return source.slice(0, start) + (next < 0 ? '' : source.slice(next + 1));
}

// Public instructions describe what to do now. Test provenance, retrospective
// fixes and acceptance journals remain in the original project documentation.
function readerCopy(name, source) {
  if (name === 'SELLER_NEXUS_REQUIREMENTS.md') {
    source = omitChapter(source, 'Evidence and current limits')
      .replace(/^Requirements for the documented 29 October 2026 build\..*$/m,
        'Adorn is the standalone outfit mod; **Adorn Seller Framework (ASF)** is its optional companion. Install the runtime requirements for the mods you use. Only authors building changed dialogue/audio need the additional author tools below.')
      .replace(/^Prepared silent FUZ\/LIP support now exists,.*$/m,
        'Keep Fuz Ro D-oh installed for the supported unvoiced fallback replies, including when your authored pack contains prepared silent audio.');
  }
  if (name === 'ADORN_MANUAL.md') {
    source = omitChapter(source, 'Verification status')
      .replace('The documented workflow is MO2 on Windows. The current test profile uses Skyrim 1.7.104. Other runtimes/mod managers need separate validation.',
        'These installation steps use MO2 on Windows. Follow the runtime support information supplied with your mod download.')
      .replace('Enlarged-text and browser controller checks have passed; embedded Skyrim input and native file-dialog focus still need acceptance testing.', '')
      .replace('Positioning and hide/reveal regressions retain the acceptance limits recorded in the release notes.', '')
      .replace(/^Hair studio\/barber services and automatic body conversion are design work,.*\n?/m, '');
  }
  if (name === 'ASSIGNMENT_SHARING.md') {
    source = omitChapter(source, 'Verification boundary') + '\n## Troubleshooting\n\nIf a contribution is blocked, check its defining plugins and review the displayed reason before importing. Custom groups need free assignment slots, including while replacements are staged.\n\nIf an accepted outfit does not appear, check that its assignment is enabled and the required clothing mods are loaded. Generated SkyPatcher rules apply on the next Skyrim launch. When reporting an issue, include the affected recipients, your merge choices and the relevant `AdornLive.log` and `SkyPatcher.log` entries.\n';
  }
  if (name === 'ASF_MANUAL.md') {
    source = omitChapter(source, 'Complete acceptance walkthrough')
      .replace('The development setup uses Skyrim 1.7.104 on Windows/MO2. Wider runtime/manager support needs separate validation.',
        'Follow the runtime support information supplied with your mod download; these guides use MO2 on Windows.')
      .replace(' and still needs in-game acceptance', '')
      .replace('These are catalogued sources; audible playback for every NPC/style combination remains an in-game acceptance check.',
        'Audition the source clip, then check the finished reply on your chosen NPC after building and installing it.')
      .replace('In-game lip movement remains an acceptance check.', '')
      .replace(/ The latest generic seller, save-isolation, clue playback and live-generation acceptance boundaries are listed in the \[release documentation index\]\([^)]+\)\./g, '')
      .replace('Manual writing/gameplay need no key or internet. Successful live generation remains acceptance work; synthetic free checks hit privacy/rate/output limits.',
        'Manual writing and gameplay need no API key or internet. If a provider rejects a request, read the displayed error; your manual draft remains available.');
  }
  if (name === 'RIDDLE_TIERS_QUICK_GUIDE.md') {
    source = source
      .replace(/^Updated 29 October 2026 for /m, 'This quick start covers ')
      .replace(/^Development checks pass;.*\n?/m, '')
      .replace('## Test before sharing', '## Check your authored content');
  }
  if (name === 'RIDDLE_AUTHORING.md') {
    source = source
      .replace(/^Updated for 29 October 2026\..*$/m,
        'For a shorter walkthrough, use the [quick start](RIDDLE_TIERS_QUICK_GUIDE.md). Seller setup, recordings and recipe authoring are covered by the [ASF guide](docs/nexus/ASF_GUIDE.md).')
      .replace('Compilation and browser checks do not prove Skyrim behavior.', '');
  }
  if (name === 'ADORN_USER_DATA.md') {
    source = source
      .replace(/ See \[the current save-testing status\]\(STATUS\.md\)\./g, '')
      .replace("MCM Helper's actual fallback write into Overwrite still needs an in-game check.",
        'Check the actual MCM settings file in MO2 when backing up your bindings.')
      .replace('Faction application, exclusions and restart behavior still need in-game acceptance; see [testing status](STATUS.md).',
        'Review the accepted rules and their exclusions; restart Skyrim to apply the generated next-launch rules.')
      .replace('The user confirmed the replacement reset/discovery start; the full New Game/cross-save checks remain in the test plan.', '')
      .replace('For an intentional clean author test,', 'For a clean author configuration,')
      .replace(/^Personal saved outfits,/m, '## Personal save data\n\nPersonal saved outfits,')
      .replace(/^The Adorn mod contains clean defaults/m, '## Shared configuration and prepared output\n\nThe Adorn mod contains clean defaults');
  }
  return source;
}
