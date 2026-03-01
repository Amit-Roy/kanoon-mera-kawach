// services/lawsService.js
// Mock laws service - can be replaced with real API
// For MVP, using a simple mock that returns Indian law data

export const lawsService = {
  // Cache for laws data
  _cache: null,

  async fetchLaws() {
    // Return cached data if available
    if (this._cache) {
      return this._cache;
    }

    // Mock laws data - in production, fetch from real API
    const laws = [
      {
        id: 'ipc_375',
        section: 'Section 375 - IPC',
        title: 'Rape',
        summary:
          'A man commits the offence of rape if he penetrates his penis into the vagina, mouth, urethra or anus of a woman or inserts any object or a part of the body into the vagina, urethra or anus of a woman.',
        whatYouCanDo:
          'File an FIR at the nearest police station, seek immediate medical help, contact a lawyer.',
        state: 'All India',
      },
      {
        id: 'ipc_498a',
        section: 'Section 498A - IPC',
        title: 'Cruelty by Husband or His Relatives',
        summary:
          'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished.',
        whatYouCanDo:
          'File a complaint with police or approach family court for protection order.',
        state: 'All India',
      },
      {
        id: 'ipc_304',
        section: 'Section 304 - IPC',
        title: 'Causing death by negligence',
        summary:
          'Whoever causes death by doing any rash or negligent act not amounting to culpable homicide.',
        whatYouCanDo:
          'Report to police and consult a criminal lawyer for defense.',
        state: 'All India',
      },
      {
        id: 'ipc_420',
        section: 'Section 420 - IPC',
        title: 'Cheating',
        summary:
          'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person.',
        whatYouCanDo:
          'File a complaint at police station and file civil suit for recovery of loss.',
        state: 'All India',
      },
      {
        id: 'crpc_125',
        section: 'Section 125 - CrPC',
        title: 'Maintenance of Wives, Children and Parents',
        summary:
          'If any person having sufficient means neglects to maintain his wife, child, or parent, the magistrate may order such person to pay maintenance.',
        whatYouCanDo:
          'File petition before magistrate with proof of neglect and financial statement.',
        state: 'All India',
      },
      {
        id: 'crpc_41',
        section: 'Section 41 - CrPC',
        title: 'When Police Can Arrest Without Warrant',
        summary:
          'Police can arrest without warrant for cognizable offences, with your consent, or based on credible information about commission of offence.',
        whatYouCanDo:
          'Know your rights - you can ask why you are being arrested and contact a lawyer immediately.',
        state: 'All India',
      },
      {
        id: 'crpc_161',
        section: 'Section 161 - CrPC',
        title: 'Examination of Witness by Police',
        summary:
          'Any police officer may examine any person supposed to be acquainted with the facts and circumstances of the case.',
        whatYouCanDo:
          'You have the right to remain silent; consult a lawyer before giving statement.',
        state: 'All India',
      },
      {
        id: 'ipc_354',
        section: 'Section 354 - IPC',
        title: 'Outraging Modesty of a Woman',
        summary:
          'Whoever intending to insult the modesty of any woman, utters any word, sound or makes any gesture with the intention that such word, sound or gesture shall be heard or seen by such woman.',
        whatYouCanDo:
          'Report harassment to police, inform employer, seek restraining order.',
        state: 'All India',
      },
    ];

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    this._cache = laws;
    return laws;
  },

  async searchLaws(query) {
    const laws = await this.fetchLaws();
    if (!query) return laws;

    const q = query.toLowerCase();
    return laws.filter(
      (law) =>
        law.section.toLowerCase().includes(q) ||
        law.title.toLowerCase().includes(q) ||
        law.summary.toLowerCase().includes(q)
    );
  },
};
