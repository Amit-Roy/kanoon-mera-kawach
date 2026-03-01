import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const TopicDetailScreen = ({ navigation, route }) => {
  const { topic } = route.params || {};
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { theme, isDark } = useTheme();

  const handleMenuPress = () => {
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    if (topic) {
      loadTopicPosts();
    }
  }, [topic]);

  const loadTopicPosts = async () => {
    try {
      setLoading(true);
      // Query posts from the topic's posts subcollection
      const postsRef = collection(db, 'topics', topic.id, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(loadedPosts);
    } catch (err) {
      console.error('Failed to load topic posts', err);
      // Fallback posts for demo
      setPosts([
        {
          id: '1',
          title: 'What are my rights during a traffic stop?',
          content:
            'I was stopped by police yesterday and was not sure what my rights were. Can someone explain?',
          author: 'User123',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          upvotes: 24,
        },
        {
          id: '2',
          title: 'Police asked for bribes - what to do?',
          content:
            'During a traffic check, a police officer asked for money. I refused. What are my next steps?',
          author: 'ConcernedCitizen',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          upvotes: 156,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    try {
      const date = timestamp.toDate?.() || new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffSecs = Math.floor(diffMs / 1000);
      const diffMins = Math.floor(diffSecs / 60);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffSecs < 60) return 'just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Unknown date';
    }
  };

  const renderPostCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.postCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => navigation.navigate('PostDetail', { topic, post: item })}
      activeOpacity={0.7}
    >
      <BlurView intensity={40} tint={isDark ? 'dark' : 'light'} style={styles.blurEffect}>
        <View style={styles.postContent}>
          <Text style={[styles.postTitle, { color: theme.text }]} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={[styles.postBody, { color: theme.textSecondary }]} numberOfLines={3}>
            {item.content}
          </Text>
          <View style={styles.postMeta}>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              by {item.author}
            </Text>
            <Text style={[styles.metaText, { color: theme.textSecondary }]}>
              {formatDate(item.createdAt)}
            </Text>
          </View>
          <View style={styles.postFooter}>
            <Text style={[styles.upvotes, { color: theme.accent }]}>
              ⬆ {item.upvotes || 0} upvotes
            </Text>
            <Text style={[styles.comments, { color: theme.textSecondary }]}>
              💬 Comments
            </Text>
          </View>
          <Text style={[styles.tapToOpen, { color: theme.textSecondary }]}>
            Tap to view full discussion →
          </Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        No discussions yet in this topic.
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Be the first to start a discussion!
      </Text>
    </View>
  );

  return (
    <GavelBackground isDark={isDark}>
      <View style={[{ flex: 1 }, { backgroundColor: isDark ? 'rgba(15,15,26,0.75)' : 'rgba(245,245,245,0.65)' }]}>
        <Header 
          navigation={navigation} 
          title={topic?.name || 'Topic'} 
          onMenuPress={handleMenuPress}
          showThemeToggle={false}
        />

        <FlatList
          data={posts}
          renderItem={renderPostCard}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={loading ? <ActivityIndicator size="large" color={theme.accent} /> : renderEmptyState()}
          contentContainerStyle={styles.listContainer}
          scrollEnabled={true}
        />

        {/* Floating Action Buttons */}
        <View style={styles.floatingButtons}>
          <TouchableOpacity
            style={[styles.fab, { backgroundColor: theme.accent }]}
            onPress={() => navigation.navigate('PostIssue', { topicName: topic?.name })}
          >
            <Text style={styles.fabText}>+ Discuss</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.fab, { backgroundColor: theme.textSecondary }]}
            onPress={() => navigation.navigate('LegalSearch', { topic: topic?.name })}
          >
            <Text style={styles.fabText}>⚖ Laws</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GavelBackground>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 120,
  },
  postCard: {
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  blurEffect: {
    flex: 1,
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postBody: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 12,
  },
  postFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  upvotes: {
    fontSize: 14,
    fontWeight: '600',
  },
  comments: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
  },
  tapToOpen: {
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'right',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
  floatingButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    gap: 12,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TopicDetailScreen;
