# Using External Laws API

The app now supports fetching Indian laws from external APIs while keeping bundled data as fallback.

## How to Use

### Option 1: GitHub-Hosted JSON (Recommended Free Option)

1. **Create a `laws.json` file** in your GitHub repo with this structure:

```json
[
  {
    "id": "ipc_375",
    "section": "Section 375 - IPC",
    "title": "Rape",
    "summary": "...",
    "whatYouCanDo": "...",
    "state": "All India"
  },
  ...more laws
]
```

2. **Get the raw URL** of your laws.json (example):
   ```
   https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/data/laws.json
   ```

3. **Update `services/lawsServiceAPI.js`** line 7:
   ```javascript
   const EXTERNAL_LAWS_API_URL = 'https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/data/laws.json';
   ```

4. **Deploy & restart** the app. It will fetch laws from your URL.

### Option 2: Use Any Public API

Replace `EXTERNAL_LAWS_API_URL` with any API endpoint that returns a JSON array of laws:

```javascript
const EXTERNAL_LAWS_API_URL = 'https://api.example.com/laws';
```

**Requirements:**
- Returns JSON array of law objects
- Each law must have: `id`, `section`, `title`, `summary`, `whatYouCanDo`, `state`
- Supports CORS (cross-origin requests)

### Option 3: Self-Hosted (Firebase, Supabase)

1. Create a collection/table with laws data
2. Create an endpoint that returns the data as JSON array
3. Set the URL as `EXTERNAL_LAWS_API_URL`

## Fallback Behavior

- App tries to fetch from `EXTERNAL_LAWS_API_URL` first
- If the API fails or returns nothing, uses **15 bundled laws**
- Works offline with bundled data
- No internet needed for basic functionality

## Free Public APIs to Explore

- **Indian Kanoon** - indiankanoon.org (may have API)
- **LexisNexis** - Free tier limited
- **GitHub Projects** - Search for "indian laws API" or "IPC CrPC JSON"
- **Your Own API** - Host laws on Firebase/Supabase free tier

## Current Bundled Laws (15 sections)

If external API is not configured or fails, these laws are used:
- IPC 375, 498A, 354, 420, 304, 356, 302, 381, 341, 504, 176
- CrPC 41, 125, 498, 161

## Testing

To check if external API is being used, open React Native debugger and look for:
```
Fetching laws from external API: <your-url>
Successfully fetched laws from external API
```

Or if it fails:
```
Failed to fetch from external API, using bundled data
```

## Data Format Reference

Each law object should have:

```javascript
{
  id: string,              // Unique identifier
  section: string,         // e.g., "Section 375 - IPC"
  title: string,          // Law title
  summary: string,        // Detailed explanation
  whatYouCanDo: string,   // Action steps for user
  state: string           // "All India" or specific state
}
```

## Notes

- Keep bundled data as fallback for offline support
- External API calls have 5-second timeout
- Results are cached after first fetch
- No authentication required for MVP
