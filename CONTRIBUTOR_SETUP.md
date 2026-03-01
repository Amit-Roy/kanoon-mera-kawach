# Contributor Setup Guide

This guide helps contributors set up the project.

## Running the App (Works Immediately)

The app works out of the box with **fallback mock data** or **real news** if you add an API key:

```bash
npm install
npm start
```

### To Enable Real News (Optional)

1. **Get a free API key** from [newsapi.org](https://newsapi.org)

2. **Add to `.env`** in the project root:
   ```bash
   cp .env.example .env
   ```
   Then edit `.env`:
   ```
   REACT_APP_NEWSAPI_KEY=your_actual_api_key_here
   ```

3. **Restart the app**:
   ```bash
   npm start
   # Press 'r' to reload
   ```

The app now uses `react-native-dotenv` which loads variables at **build time** (not runtime), so they're safe for React Native.

## How It Works

- **Mock news**: Displays by default if no API key provided
- **Real laws**: Always available (bundled JSON - no API needed)
- **Environment variables**: Loaded via `.env` file using react-native-dotenv

## Security

- `.env` is **gitignored** - never committed to git
- `.env.example` is **committed** - shows the template
- API keys are compiled into the app at build time
- Safe to push to public repos

## Troubleshooting

**Q: Still seeing mock news?**
- Check that `.env` file exists with your API key
- Restart the dev server (press 'r' or restart npm start)
- Check console for `NewsAPI: Using API key`

**Q: "NetworkError: API key invalid"**
- Verify your newsapi.org API key is correct
- Check for extra spaces in the key
- Make sure the free tier hasn't hit daily limit (100 requests)

## Project Structure

```
kanoon-mera-kawach/
├── .env (gitignored - your local config)
├── .env.example (committed - template)
├── babel.config.js (includes react-native-dotenv plugin)
├── services/
│   ├── newsServiceAPI.js (reads REACT_APP_NEWSAPI_KEY from @env)
│   └── lawsServiceAPI.js (real bundled Indian laws)
└── ...
```

## Next Steps

The app is ready for MVP! You can:
- Test all screens locally
- Verify Firestore integration
- Improve UI/UX
- Record demo video

