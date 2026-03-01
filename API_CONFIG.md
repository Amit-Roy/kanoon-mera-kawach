# API Configuration Guide

## NewsAPI Integration

### Getting Your API Key

1. Visit [https://newsapi.org](https://newsapi.org)
2. Sign up for a free account
3. Copy your API key
4. Add to your `.env` file:
   ```
   REACT_APP_NEWSAPI_KEY=your_api_key_here
   ```

### Free Tier Limits
- 100 requests per day
- 50 articles per request
- Perfect for MVP testing

## Indian Laws API

The laws service uses a comprehensive mock database of real Indian law sections:
- IPC Sections (375, 498A, 354, 420, 304, 341, 504, 302, 381, 176)
- CrPC Sections (41, 125, 161)
- Real summaries and legal guidance
- No API key required - all offline

## Testing

### Test with News API
```bash
REACT_APP_NEWSAPI_KEY=your_key npm start
```

### Test with Mock Data
The app will automatically fallback to mock news data if:
- API key is missing
- Network request fails
- Rate limit exceeded

## Production Considerations

- Use a backend to hide API keys (don't expose in client!)
- Implement caching to reduce API calls
- Use webhooks or scheduled jobs to refresh data
- Consider paid tiers for higher volume

## Alternative News Sources

If NewsAPI doesn't work for you:
- Google News API
- The Guardian Open Platform
- NY Times API
- RSS feeds via rss-parser package

## Legal Data Sources

For future enhancements:
- Indian Government Legal Database
- NITI Aayog APIs
- Law Commission of India
- State Bar Council databases
