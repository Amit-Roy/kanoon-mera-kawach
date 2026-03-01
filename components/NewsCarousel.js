// components/NewsCarousel.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { newsServiceAPI } from '../services/newsServiceAPI';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width - 48;

export default function NewsCarousel() {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { theme } = useTheme();

  React.useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const data = await newsServiceAPI.getLatestNews(5);
      setNews(data);
    } catch (err) {
      console.error('Failed to load news', err);
    } finally {
      setLoading(false);
    }
  };

  const renderNewsItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.source, { color: theme.accent }]}>
            {item.source}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accent} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.heading, { color: theme.text }]}>
        Latest Legal Updates
      </Text>
      {news.length > 0 ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
          scrollEventThrottle={16}
        >
          {news.map((item) => renderNewsItem(item))}
        </ScrollView>
      ) : (
        <Text style={[styles.noNews, { color: theme.textSecondary }]}>
          No news available
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  scrollContainer: {
    paddingRight: 24,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    width: ITEM_WIDTH,
    marginRight: 12,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  source: {
    fontSize: 11,
    fontWeight: '600',
  },
  date: {
    fontSize: 11,
  },
  loadingContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNews: {
    textAlign: 'center',
    paddingVertical: 24,
  },
});
