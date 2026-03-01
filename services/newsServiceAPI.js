// services/newsServiceAPI.js
// NewsAPI.com integration for real news articles
// Free tier: 100 requests/day, 50 articles per request
//
// Environment variables are loaded from .env file via react-native-dotenv
// See CONTRIBUTOR_SETUP.md for setup instructions

import { REACT_APP_NEWSAPI_KEY } from '@env';

const NEWSAPI_KEY = REACT_APP_NEWSAPI_KEY || null;

export const newsServiceAPI = {
  _cache: null,
  _cacheTime: 0,
  CACHE_DURATION: 30 * 60 * 1000, // 30 minutes

  async fetchNews() {
    // Return cache if still valid
    if (
      this._cache &&
      Date.now() - this._cacheTime < this.CACHE_DURATION
    ) {
      return this._cache;
    }

    try {
      // Search for news about Indian laws, rights, justice
      const queries = [
        'Indian laws rights',
        'legal updates India',
        'Indian government laws',
      ];
      const query = queries[Math.floor(Math.random() * queries.length)];

      if (!NEWSAPI_KEY) {
        console.log('NewsAPI: No API key configured, using fallback mock news');
        return this._getFallbackNews();
      }

      console.log('NewsAPI: Using API key (***' + NEWSAPI_KEY.substring(NEWSAPI_KEY.length - 5) + ')');
      console.log('NewsAPI: Searching for:', query);

      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        query
      )}&sortBy=publishedAt&language=en&pageSize=15&apiKey=${NEWSAPI_KEY}`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.text();
        console.warn(`NewsAPI HTTP ${response.status}: ${errorData}`);
        return this._getFallbackNews();
      }

      const data = await response.json();

      // Check for API errors in response
      if (data.status === 'error') {
        console.warn(`NewsAPI error (${data.code}): ${data.message}`);
        return this._getFallbackNews();
      }

      if (data.articles && data.articles.length > 0) {
        const articles = data.articles
          .filter((article) => article.urlToImage) // Only articles with images
          .slice(0, 10)
          .map((article) => ({
            id: article.url,
            title: article.title,
            description: article.description || article.content,
            image: article.urlToImage,
            date: article.publishedAt,
            source: article.source.name,
            url: article.url,
          }));

        this._cache = articles;
        this._cacheTime = Date.now();
        console.log('NewsAPI: Successfully fetched', articles.length, 'articles');
        return articles;
      }

      console.warn('NewsAPI: No articles found in response');
      return this._getFallbackNews();
    } catch (err) {
      console.error('NewsAPI error:', err.message);
      return this._getFallbackNews();
    }
  },

  _getFallbackNews() {
    return [
      {
        id: 'fallback_1',
        title: 'New Guidelines on Police Accountability Released',
        description:
          'Government releases comprehensive guidelines on police accountability and victim compensation.',
        image: 'https://via.placeholder.com/300x200?text=Police+Accountability',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Legal News India',
        url: '#',
      },
      {
        id: 'fallback_2',
        title: 'Consumer Protection Act - Key Changes',
        description:
          'Important amendments to Consumer Protection Act make filing complaints easier.',
        image: 'https://via.placeholder.com/300x200?text=Consumer+Rights',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Justice Today',
        url: '#',
      },
    ];
  },

  async getLatestNews(limit = 5) {
    const news = await this.fetchNews();
    return news.slice(0, limit);
  },
};
