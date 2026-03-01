// screens/TopicsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function TopicsScreen({ navigation }) {
  const [topics, setTopics] = React.useState([]);
  const [filteredTopics, setFilteredTopics] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [newTopicName, setNewTopicName] = React.useState('');
  const [newTopicDesc, setNewTopicDesc] = React.useState('');
  const [creatingTopic, setCreatingTopic] = React.useState(false);
  const { theme, isDark } = useTheme();

  React.useEffect(() => {
    loadTopics();
  }, []);

  React.useEffect(() => {
    filterTopics();
  }, [searchQuery, topics]);

  const loadTopics = async () => {
    try {
      const q = query(
        collection(db, 'topics'),
        orderBy('subscriberCount', 'desc'),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const loadedTopics = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTopics(loadedTopics);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load topics', err);
      // Set some mock topics if Firestore fails
      setTopics([
        {
          id: 'police',
          name: 'Police Encounters',
          normalizedName: 'police_encounters',
          description: 'Discuss police encounters and your rights',
          subscriberCount: 245,
          postCount: 89,
        },
        {
          id: 'fraud',
          name: 'Business Fraud',
          normalizedName: 'business_fraud',
          description: 'Report scams, fraud, and deceptive practices',
          subscriberCount: 178,
          postCount: 156,
        },
        {
          id: 'corruption',
          name: 'Govt Stonewalling/Bribes',
          normalizedName: 'govt_stonewalling_bribes',
          description: 'Discuss bribery demands and government delays',
          subscriberCount: 134,
          postCount: 67,
        },
        {
          id: 'labor',
          name: 'Other',
          normalizedName: 'other',
          description: 'Other discussions and issues',
          subscriberCount: 92,
          postCount: 45,
        },
        {
          id: 'general',
          name: 'General Discussion',
          normalizedName: 'general_discussion',
          description: 'General community discussion',
          subscriberCount: 156,
          postCount: 203,
        },
      ]);
      setLoading(false);
    }
  };

  const filterTopics = () => {
    if (!searchQuery.trim()) {
      setFilteredTopics(topics);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = topics.filter(
      (topic) =>
        topic.name.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
    );
    setFilteredTopics(filtered);
  };

  const handleCreateTopic = async () => {
    if (!newTopicName.trim()) {
      Alert.alert('Error', 'Topic name is required');
      return;
    }

    setCreatingTopic(true);
    try {
      const normalizedName = newTopicName.toLowerCase().replace(/\s+/g, '_');
      const newTopic = {
        name: newTopicName.trim(),
        normalizedName: normalizedName,
        description: newTopicDesc.trim() || 'No description',
        subscriberCount: 1,
        postCount: 0,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'topics'), newTopic);
      setTopics([{ id: docRef.id, ...newTopic }, ...topics]);
      setNewTopicName('');
      setNewTopicDesc('');
      setShowCreateForm(false);
      Alert.alert('Success', `Topic "${newTopicName}" created!`);
    } catch (err) {
      console.error('Failed to create topic', err);
      Alert.alert('Error', 'Failed to create topic. Try again.');
    } finally {
      setCreatingTopic(false);
    }
  };

  const renderTopicCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.topicCard, { backgroundColor: theme.surface, borderColor: theme.border }]}
      onPress={() => navigation.navigate('TopicDetail', { topic: item })}
    >
      <BlurView intensity={40} tint={isDark ? 'dark' : 'light'} style={styles.blurEffect}>
        <View style={styles.cardContent}>
          <Text style={[styles.topicName, { color: theme.text }]}>
            r/{item.name.toLowerCase().replace(/\s+/g, '_')}
          </Text>
          <Text style={[styles.topicTitle, { color: theme.text }]}>
            {item.name}
          </Text>
          <Text style={[styles.topicDesc, { color: theme.textSecondary }]} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.stats}>
            <Text style={[styles.stat, { color: theme.textSecondary }]}>
              {item.subscriberCount || 0} subscribers
            </Text>
            <Text style={[styles.stat, { color: theme.textSecondary }]}>
              {item.postCount || 0} posts
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.legalSearchBtn, { backgroundColor: theme.accent }]}
            onPress={() => navigation.navigate('LegalSearch', { topic: item.name })}
          >
            <Text style={styles.legalSearchBtnText}>Search Laws</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </TouchableOpacity>
  );

  const renderCreateForm = () => {
    if (!showCreateForm) return null;

    return (
      <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={styles.formOverlay}>
        <View style={[styles.formContainer, { backgroundColor: theme.background }]}>
          <Text style={[styles.formTitle, { color: theme.text }]}>Create New Topic</Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Topic name"
            placeholderTextColor={theme.textSecondary}
            value={newTopicName}
            onChangeText={setNewTopicName}
            editable={!creatingTopic}
          />

          <TextInput
            style={[
              styles.input,
              styles.descInput,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Description (optional)"
            placeholderTextColor={theme.textSecondary}
            value={newTopicDesc}
            onChangeText={setNewTopicDesc}
            multiline
            editable={!creatingTopic}
          />

          <View style={styles.formButtons}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.surface }]}
              onPress={() => {
                setShowCreateForm(false);
                setNewTopicName('');
                setNewTopicDesc('');
              }}
              disabled={creatingTopic}
            >
              <Text style={[styles.buttonText, { color: theme.text }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.createButton, { backgroundColor: theme.accent }]}
              onPress={handleCreateTopic}
              disabled={creatingTopic}
            >
              {creatingTopic ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.createButtonText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={theme.accent} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Loading topics...
          </Text>
        </View>
      );
    }

    if (filteredTopics.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            {searchQuery ? 'No topics found' : 'No topics yet'}
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
            Be the first to create one!
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GavelBackground isDark={isDark}>
      <Header
        title="Topics"
        onMenuPress={() => navigation.goBack()}
        showThemeToggle={true}
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Search topics..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <TouchableOpacity
          style={[styles.createTopicBtn, { backgroundColor: theme.accent }]}
          onPress={() => setShowCreateForm(true)}
        >
          <Text style={styles.createBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTopics}
        keyExtractor={(item) => item.id}
        renderItem={renderTopicCard}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        scrollEventThrottle={16}
      />

      {renderCreateForm()}

      <Disclaimer style={styles.disclaimer} />
      </GavelBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    height: 44,
    marginRight: 8,
  },
  createTopicBtn: {
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  topicCard: {
    borderRadius: 20,
    marginVertical: 8,
    borderWidth: 1,
    overflow: 'hidden',
  },
  blurEffect: {
    padding: 16,
  },
  cardContent: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 16,
  },
  topicName: {
    fontSize: 12,
    fontWeight: '600',
    opacity: 0.7,
    marginBottom: 4,
  },
  topicTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  topicDesc: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stat: {
    fontSize: 12,
  },
  legalSearchBtn: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  legalSearchBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  formOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  formContainer: {
    width: '85%',
    borderRadius: 20,
    padding: 24,
    maxHeight: '80%',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 8,
    fontSize: 14,
  },
  descInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 8,
    alignItems: 'center',
  },
  createButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  emptyContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
  },
  disclaimer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
