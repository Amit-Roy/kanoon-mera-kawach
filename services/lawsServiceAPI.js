// services/lawsServiceAPI.js
// Indian laws database with constitution, IPC & CrPC sections
// Loads from local laws.json (Indian Constitution) with optional external API support

// Configure your API endpoint here (GitHub Raw, public API, etc.)
// Example: https://raw.githubusercontent.com/your-repo/main/data/laws.json
const EXTERNAL_LAWS_API_URL = null; // Set to your public API URL

export const lawsServiceAPI = {
  _cache: null,

  async fetchLaws() {
    if (this._cache) {
      return this._cache;
    }

    // Try to fetch from external API first
    if (EXTERNAL_LAWS_API_URL) {
      try {
        console.log('Fetching laws from external API:', EXTERNAL_LAWS_API_URL);
        const response = await fetch(EXTERNAL_LAWS_API_URL, { timeout: 5000 });
        if (response.ok) {
          const externalLaws = await response.json();
          if (Array.isArray(externalLaws) && externalLaws.length > 0) {
            console.log('Successfully fetched laws from external API');
            this._cache = externalLaws;
            return externalLaws;
          }
        }
      } catch (err) {
        console.warn('Failed to fetch from external API, trying local data:', err.message);
      }
    }

    // Try to load from local laws.json (Indian Constitution)
    try {
      console.log('Loading laws from local laws.json');
      const lawsData = require('../data/laws.json');
      if (Array.isArray(lawsData) && lawsData.length > 0) {
        const normalizedLaws = lawsData.map((law, index) => {
          // Map Constitution structure to law structure
          if (law.article !== undefined) {
            return {
              id: `article_${law.article}`,
              section: `Article ${law.article}`,
              title: law.title || `Article ${law.article}`,
              summary: law.description || '',
              whatYouCanDo: 'Review the constitutional provisions and consult legal counsel if needed.',
              state: 'All India',
              // Keep original fields too
              ...law
            };
          }
          // If already in law format, return as-is
          return law;
        });
        console.log(`Successfully loaded ${normalizedLaws.length} laws from local data`);
        this._cache = normalizedLaws;
        return normalizedLaws;
      }
    } catch (err) {
      console.warn('Failed to load from local laws.json, using bundled data:', err.message);
    }

    // Fallback to bundled laws only if local load fails
    const laws = this._getBundledLaws();
    this._cache = laws;
    return laws;
  },

  _getBundledLaws() {
    // Real Indian law sections with summaries
    const laws = [
      {
        id: 'ipc_375',
        section: 'Section 375 - IPC',
        title: 'Rape',
        summary:
          'A man commits rape if he penetrates his penis into the vagina, mouth, urethra or anus of a woman or inserts any object into the vagina, urethra or anus of a woman without her consent.',
        whatYouCanDo:
          'Seek immediate medical help. File FIR at nearest police station. Contact a lawyer. Report to women helpline (1091).',
        state: 'All India',
      },
      {
        id: 'ipc_498a',
        section: 'Section 498A - IPC',
        title: 'Cruelty by Husband or His Relatives',
        summary:
          'Whoever, being the husband or the relative of the husband of a woman, subjects such woman to cruelty shall be punished with imprisonment up to 3 years and/or fine.',
        whatYouCanDo:
          'Contact police or file complaint with magistrate. Seek legal aid. Contact women helpline (1091). Document the abuse.',
        state: 'All India',
      },
      {
        id: 'ipc_354',
        section: 'Section 354 - IPC',
        title: 'Outraging Modesty of a Woman',
        summary:
          'Whoever intends to insult the modesty of any woman, utters any word, sound or makes any gesture with intention that such word or gesture shall be heard or seen by the woman shall be punished with imprisonment up to 3 years or fine up to 2,000 rupees.',
        whatYouCanDo:
          'Report to police immediately. Save evidence (messages, recordings). File complaint. Get legal assistance.',
        state: 'All India',
      },
      {
        id: 'ipc_420',
        section: 'Section 420 - IPC',
        title: 'Cheating',
        summary:
          'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property to any person shall be punished with imprisonment up to 7 years and shall also be liable to fine.',
        whatYouCanDo:
          'File FIR with police. Collect all evidence of cheating. Contact consumer protection authority. Hire a lawyer.',
        state: 'All India',
      },
      {
        id: 'ipc_304',
        section: 'Section 304 - IPC',
        title: 'Causing Death by Negligence',
        summary:
          'Whoever causes death by doing any rash or negligent act not amounting to culpable homicide shall be punished with imprisonment up to 6 months or fine up to 250 rupees.',
        whatYouCanDo:
          'File police complaint immediately. Preserve evidence. Consult criminal lawyer. Get medical reports.',
        state: 'All India',
      },
      {
        id: 'ipc_356',
        section: 'Section 356 - IPC',
        title: 'Murder',
        summary:
          'Culpable homicide by act of person who by act knows to be life-threatening, done with intention to cause death or knowledge that act is so imminently dangerous, commits murder.',
        whatYouCanDo:
          'Contact police immediately. Preserve all evidence. Seek legal counsel urgently. Do not tamper with crime scene.',
        state: 'All India',
      },
      {
        id: 'crpc_41',
        section: 'Section 41 - CrPC',
        title: 'When Police Can Arrest Without Warrant',
        summary:
          'Police can arrest without warrant for cognizable offences, with consent, or based on credible information about commission of offence. Arrested person has right to be informed of grounds of arrest.',
        whatYouCanDo:
          'Know your rights - ask why you are being arrested. Request arrest memo in writing. Contact a lawyer immediately. Do not sign anything without understanding.',
        state: 'All India',
      },
      {
        id: 'crpc_125',
        section: 'Section 125 - CrPC',
        title: 'Maintenance of Wives, Children and Parents',
        summary:
          'If any person having sufficient means neglects or refuses to maintain his wife, unmarried child, or parent, a magistrate may order such person to pay monthly maintenance.',
        whatYouCanDo:
          'File petition before magistrate with proof of neglect. Provide income/financial proof. Seek legal aid if needed. Get court order for maintenance.',
        state: 'All India',
      },
      {
        id: 'crpc_498',
        section: 'Section 498 - CrPC',
        title: 'Summons to Accused',
        summary:
          'Magistrate shall issue summons to the accused to appear before him, unless the magistrate is of opinion that there is no case.',
        whatYouCanDo:
          'Appear before magistrate on scheduled date. Bring legal representation. Submit written statement if applicable.',
        state: 'All India',
      },
      {
        id: 'crpc_161',
        section: 'Section 161 - CrPC',
        title: 'Examination of Witness by Police',
        summary:
          'Any police officer may examine any person supposed to be acquainted with the facts and circumstances of the case. Witness has right to remain silent on matters not relevant.',
        whatYouCanDo:
          'You have right to remain silent. Consult lawyer before giving statement. Do not sign statements without understanding.',
        state: 'All India',
      },
      {
        id: 'ipc_341',
        section: 'Section 341 - IPC',
        title: 'Wrongful Restraint',
        summary:
          'Whoever wrongfully restrains any person shall be punished with imprisonment up to 1 month or fine up to 250 rupees, or both.',
        whatYouCanDo:
          'File police complaint immediately. Document the restraint. Get witness statements. Seek legal help.',
        state: 'All India',
      },
      {
        id: 'ipc_504',
        section: 'Section 504 - IPC',
        title: 'Insult Intended to Provoke Breach of Peace',
        summary:
          'Whoever intentionally insults and thereby knowingly provokes any person to commit a breach of peace shall be punished with imprisonment up to 2 years or fine up to 1,000 rupees.',
        whatYouCanDo:
          'Report to police. Document the insult (messages, recordings). File complaint. Get legal advice.',
        state: 'All India',
      },
      {
        id: 'ipc_302',
        section: 'Section 302 - IPC',
        title: 'Punishment for Murder',
        summary:
          'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine. This is the most serious criminal charge.',
        whatYouCanDo:
          'Contact a senior criminal lawyer immediately. Do not make any statement. Know your rights. Cooperate with legal counsel only.',
        state: 'All India',
      },
      {
        id: 'ipc_381',
        section: 'Section 381 - IPC',
        title: 'Theft by Clerk/Servant of Master',
        summary:
          'Theft committed by a person whose position of trust involves access to the property of another person shall be punished with imprisonment up to 14 years.',
        whatYouCanDo:
          'File police complaint with proof of theft. Provide evidence. Hire lawyer. Notify employer/relevant authority.',
        state: 'All India',
      },
      {
        id: 'ipc_176',
        section: 'Section 176 - IPC',
        title: 'Omission to Give Notice',
        summary:
          'Whoever, being legally bound to give notice to any public officer of the commission of an offence, intentionally omits to give such notice shall be punished.',
        whatYouCanDo:
          'Report the offence to police. Provide detailed information. Help investigation. Cooperate with authorities.',
        state: 'All India',
      },
    ];

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

  async getLawsByCategory(category) {
    const laws = await this.fetchLaws();
    if (!category) return laws;

    const categories = {
      crime: ['375', '356', '302', '420', '304', '341', '504', '381', '176'],
      women: ['375', '498A', '354'],
      personal: ['125', '498'],
      police: ['41', '161'],
    };

    const sections = categories[category] || [];
    return laws.filter((law) =>
      sections.some((sec) => law.section.includes(sec))
    );
  },

  // Set external API URL dynamically
  setExternalApiUrl(url) {
    console.log('Setting external API URL:', url);
    // This would require updating the module, but for now users can edit EXTERNAL_LAWS_API_URL at top
  },
};
