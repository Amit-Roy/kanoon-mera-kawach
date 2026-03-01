# Kanoon Mera Kavach 🛡️⚖️

> *"Law is the shield of the people"*

A **React Native + Expo** mobile app that empowers Indian citizens to understand their legal rights, search Indian laws with plain-English explanations, report civic issues, and participate in community discussions — all through a premium glassmorphic interface.

> **⚠️ Disclaimer:** This is **NOT** legal advice. This app provides general legal information only. Always consult a qualified lawyer or the relevant authority before taking any action based on information in this app.

---

## Features

### Core
- **Legal Search** — Browse 2,300+ Indian Constitution articles with full text, plain-English summaries, and actionable guidance. Paginated virtual scrolling for smooth performance.
- **Discuss an Issue** — Report incidents (police encounters, business fraud, government stonewalling/bribes) via a structured form. Posts auto-link to community topics.
- **Community Topics** — Reddit-style discussion threads. Create topics, post replies, upvote, and comment.
- **Live News** — Latest Indian legal/civic news via [NewsAPI.org](https://newsapi.org) with automatic fallback to curated mock data.

### Platform
- **Authentication** — Email/password signup & login with Firebase Auth, persisted via AsyncStorage.
- **Theme Support** — Light & dark mode with a toggle in the header. Consistent theming across all screens via React Context.
- **Glassmorphic UI** — Premium frosted-glass cards powered by `expo-blur`, spring animations with `react-native-reanimated`, and linear gradients.
- **State Filtering** — Indian states/UT picker to filter laws and issues by jurisdiction.
- **Privacy-First** — No unnecessary data collection. All secrets in `.env` (gitignored). Anonymous posting toggle.

---

## Screenshots

<!-- Add screenshots here -->
<!-- | Home | Legal Search | Post Issue | Topics | -->
<!-- |------|-------------|------------|--------| -->
<!-- | ![Home](docs/home.png) | ![Search](docs/search.png) | ![Post](docs/post.png) | ![Topics](docs/topics.png) | -->

*Coming soon — run the app locally to explore!*

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- A [Firebase](https://console.firebase.google.com) project (free tier is fine)

### 1. Clone & install

```bash
git clone https://github.com/AyushKarir/kanoon-mera-kawach.git
cd kanoon-mera-kawach
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials (from Firebase Console → Project Settings → General):

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# Optional — leave blank for mock news data
REACT_APP_NEWSAPI_KEY=
```

### 3. Firebase setup (first time)

1. **Authentication** → Enable **Email/Password** sign-in method
2. **Firestore Database** → Create in **test mode** (tighten rules before production — see [CONTRIBUTOR_SETUP.md](CONTRIBUTOR_SETUP.md))
3. Collections (`issues`, `topics`) are auto-created on first write

### 4. Run

```bash
npm start
# Then press 'a' for Android, 'i' for iOS, or 'w' for Web
```

> **No Firebase? No problem.** Legal search works fully offline with the bundled `laws.json`. News falls back to mock data. Only issue posting and topics require Firebase.

---

## Project Structure

```
kanoon-mera-kawach/
├── App.js                        # Root — navigation stack, auth gate, context providers
├── firebaseConfig.js             # Firebase init (lazy auth with retry + AsyncStorage persistence)
├── index.js                      # Entry point
│
├── screens/
│   ├── HomeScreen.js             # Dashboard with GlassCards → Legal Search, Post Issue, Topics
│   ├── LegalSearchScreen.js      # Search 2,300+ articles with state filtering & pagination
│   ├── PostIssueScreen.js        # Issue form → Firestore (auto-creates linked topic)
│   ├── TopicsScreen.js           # Browse/search/create community topics
│   ├── TopicDetailScreen.js      # View posts within a topic
│   ├── PostDetailScreen.js       # Single post view with comments & upvotes
│   └── OfficialsListScreen.js    # (WIP) Group issues by accused official
│
├── components/
│   ├── GlassCard.js              # Animated frosted-glass card (blur + spring animation)
│   ├── Header.js                 # Top bar — hamburger menu, title, theme toggle
│   ├── NewsCarousel.js           # Horizontal scrollable news feed
│   ├── StatePicker.js            # Indian states/UT dropdown
│   ├── Disclaimer.js             # Legal disclaimer text
│   ├── GavelBackground.js        # Decorative background with SVG art
│   └── svg/                      # Emblem, Gavel, Pillar, Scales, Shield SVG icons
│
├── context/
│   ├── AuthContext.js            # Auth state (user, setUser) via React Context
│   └── ThemeContext.js           # Light/dark theme toggle via React Context
│
├── services/
│   ├── lawsService.js            # Offline laws data (hardcoded IPC/CrPC entries)
│   ├── lawsServiceAPI.js         # API/JSON-based laws fetching + search
│   ├── newsService.js            # Mock news articles (fallback)
│   └── newsServiceAPI.js         # NewsAPI.org integration with mock fallback
│
├── data/
│   └── laws.json                 # 2,300+ Indian Constitution articles (bundled offline)
│
├── utils/
│   └── states.js                 # List of Indian states & union territories
│
├── assets/                       # App icons, splash images
├── .env.example                  # Environment variable template
├── .github/
│   └── copilot-instructions.md   # AI/Copilot coding guidelines
└── package.json
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | React Native 0.83 · Expo SDK 55 (managed workflow) |
| **Language** | JavaScript (ES6+) — TypeScript adoption planned |
| **Navigation** | React Navigation v7 (Stack navigator) |
| **Backend** | Firebase v12 (Auth + Firestore) |
| **Auth Persistence** | `@react-native-async-storage/async-storage` |
| **UI / Animations** | `expo-blur` · `react-native-reanimated` · `expo-linear-gradient` · `react-native-svg` |
| **Search** | `fuse.js` (fuzzy search on bundled law data) |
| **News** | NewsAPI.org (optional) with curated mock fallback |
| **Env Config** | `react-native-dotenv` (build-time `.env` loading) |
| **Data** | 2,300+ Indian Constitution articles in `laws.json` |

---

## Architecture

```
┌─────────────────────────────────────────────┐
│                   App.js                    │
│  SafeAreaProvider → ThemeProvider → AuthProvider │
│         → NavigationContainer (Stack)       │
└────────────────────┬────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   Auth Gate    Screens      Services
   (user?)    (7 screens)   (laws, news)
        │            │            │
        ▼            ▼            ▼
    Firebase     Components    data/
    Auth +       (GlassCard,   laws.json
    Firestore    Header, …)
```

### Key Patterns

- **Auth Gate** — `App.js` conditionally renders Auth screen vs. main stack based on user state.
- **Lazy Auth Init** — Firebase Auth initializes with exponential backoff retry (up to 3 attempts) and AsyncStorage persistence.
- **Virtual Scrolling** — `FlatList` with 20-item pagination handles 2,300+ law articles smoothly.
- **Graceful Degradation** — Legal search works offline; news falls back to mock data; topics show demo content if Firestore is unreachable.
- **Theme System** — `ThemeContext` provides `{ theme, isDark, toggleTheme }` consumed by all screens and components.
- **Glassmorphism** — `expo-blur` (intensity 95) + semi-transparent overlays + shimmer borders + spring animations.

### Firestore Data Model

```
issues/                              # User-submitted civic issues
  ├── state: string                  # Indian state/UT
  ├── category: string               # Police | Business Fraud | Govt Stonewalling | Other
  ├── relatedPerson: string          # Accused official name/role
  ├── title: string
  ├── description: string
  ├── anonymous: boolean
  ├── uid: string                    # Firebase Auth UID
  └── createdAt: timestamp

topics/                              # Community discussion topics
  ├── name: string
  ├── normalizedName: string         # Lowercase for dedup
  ├── description: string
  ├── subscriberCount: number
  ├── postCount: number
  ├── createdAt: timestamp
  └── posts/                         # Subcollection
        ├── title: string
        ├── content: string
        ├── author: string
        ├── upvotes: number
        ├── createdAt: timestamp
        └── comments/                # Subcollection
              └── ...
```

---

## Docs

| Document | Description |
|----------|-------------|
| [CONTRIBUTOR_SETUP.md](CONTRIBUTOR_SETUP.md) | Contributor onboarding, `.env` setup, Firestore security rules |
| [API_CONFIG.md](API_CONFIG.md) | NewsAPI integration, free tier limits, testing with/without keys |
| [LAWS_API_SETUP.md](LAWS_API_SETUP.md) | External laws API options (GitHub-hosted JSON, custom API, self-hosted) |
| [todo.md](todo.md) | MVP task tracker & roadmap |

---

## Roadmap

### In Progress
- [ ] Officials list — group issues by accused officer name (screen exists, needs wiring)
- [ ] Comments & threads on individual issues
- [ ] Demo video & DEV.to submission

### Planned
- [ ] Anonymous issue reporting with privacy controls
- [ ] Issue moderation & community reporting
- [ ] Advanced search filters (by article type, keywords, date range)
- [ ] Hindi language support (i18n)
- [ ] Push notifications for followed topics
- [ ] User profiles & reputation system
- [ ] Google Sign-In
- [ ] NativeWind / Tailwind CSS for easier styling
- [ ] Offline-first with local Firestore cache
- [ ] AI-powered law summarization
- [ ] EAS Build → TestFlight / Google Play Store deployment

---

## Contributing

Contributions are welcome! This project exists to help people — every improvement matters.

1. **Fork** the repo
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Follow** the coding guidelines in [.github/copilot-instructions.md](.github/copilot-instructions.md)
4. **Test** your changes locally (`npm start`)
5. **Submit** a pull request with a clear description

### Coding Guidelines

- Functional components + hooks only (no class components)
- `const` / `let` only (no `var`)
- TypeScript types in new code (even if the file is still `.js`)
- Early returns for cleaner control flow
- Small, single-responsibility components
- Include accessibility props (`accessibilityLabel`, `accessibilityRole`)
- Light theme first, then dark mode support
- Always preserve the legal disclaimer — never remove or weaken it

### Glassmorphism Defaults

| Property | Value |
|----------|-------|
| `borderRadius` | 28–32 |
| Blur intensity | 60–80 |
| Border | `1px rgba(255,255,255, 0.12–0.18)` |
| Inner overlay | `rgba(255,255,255, 0.04)` |

---

## License

This is an open-source project built to empower Indian citizens with accessible legal knowledge.

<!-- Add your license badge/file here, e.g.: -->
<!-- [MIT License](LICENSE) -->

---

<p align="center">
  <strong>Let's build something that makes the world safer and more just.</strong> ✊
</p>
