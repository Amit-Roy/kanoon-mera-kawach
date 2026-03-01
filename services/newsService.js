// services/newsService.js
// Mock news service for MVP
// Can be replaced with real RSS feed or news API

export const newsService = {
  _cache: null,

  async fetchNews() {
    if (this._cache) {
      return this._cache;
    }

    // Mock news articles about Indian legal/civic issues
    const news = [
      {
        id: 1,
        title: 'New Guidelines on Police Accountability Released',
        description:
          'Government releases comprehensive guidelines on police accountability and victim compensation.',
        image:
          'https://via.placeholder.com/300x200?text=Police+Accountability',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Legal News India',
        url: '#',
      },
      {
        id: 2,
        title: 'Consumer Protection Act - Key Changes',
        description:
          'Important amendments to Consumer Protection Act make filing complaints easier.',
        image:
          'https://via.placeholder.com/300x200?text=Consumer+Rights',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Justice Today',
        url: '#',
      },
      {
        id: 3,
        title: 'Know Your Rights - Women Safety Laws',
        description:
          'Comprehensive guide to laws protecting women in India - workplace, home, and public spaces.',
        image: 'https://via.placeholder.com/300x200?text=Women+Safety',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Legal Empowerment',
        url: '#',
      },
      {
        id: 4,
        title: 'What to Do If You Are Wrongly Arrested?',
        description:
          'Step-by-step guide on your rights if you are arrested and how to protect yourself legally.',
        image:
          'https://via.placeholder.com/300x200?text=Know+Your+Rights',
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Civic Forum',
        url: '#',
      },
      {
        id: 5,
        title: 'Anti-Corruption Laws - File a Complaint',
        description:
          'How to report corruption in government offices - procedures and protections.',
        image:
          'https://via.placeholder.com/300x200?text=Anti-Corruption',
        date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'Transparency Watch',
        url: '#',
      },
    ];

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    this._cache = news;
    return news;
  },

  async getLatestNews(limit = 5) {
    const news = await this.fetchNews();
    return news.slice(0, limit);
  },
};
