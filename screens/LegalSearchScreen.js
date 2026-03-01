// screens/LegalSearchScreen.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import StatePicker from '../components/StatePicker';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';
import { lawsServiceAPI } from '../services/lawsServiceAPI';

export default function LegalSearchScreen({ navigation, route }) {
  const [state, setState] = React.useState('All India');
  const [query, setQuery] = React.useState(route?.params?.topic || '');
  const [allResults, setAllResults] = React.useState([]);
  const [displayedResults, setDisplayedResults] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [pageSize] = React.useState(20); // Show 20 items at a time
  const currentPageRef = React.useRef(0);
  const { theme, isDark } = useTheme();

  React.useEffect(() => {
    loadInitialLaws();
  }, []);

  React.useEffect(() => {
    performSearch();
  }, [query, state]);

  const loadInitialLaws = async () => {
    try {
      const laws = await lawsServiceAPI.fetchLaws();
      setAllResults(laws);
      currentPageRef.current = 0;
      const initial = laws.slice(0, pageSize);
      setDisplayedResults(initial);
      setHasMore(laws.length > pageSize);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load laws', err);
      setLoading(false);
    }
  };

  const performSearch = async () => {
    if (query.trim().length === 0) {
      // If no query, show all laws for the selected state
      try {
        let items = await lawsServiceAPI.fetchLaws();
        if (state !== 'All India') {
          items = items.filter((i) => i.state === state || i.state === 'All India');
        }
        setAllResults(items);
        currentPageRef.current = 0;
        const initial = items.slice(0, pageSize);
        setDisplayedResults(initial);
        setHasMore(items.length > pageSize);
      } catch (err) {
        console.error('Failed to load laws', err);
      }
      return;
    }

    setLoading(true);
    try {
      let items = await lawsServiceAPI.searchLaws(query);
      if (state !== 'All India') {
        items = items.filter((i) => i.state === state || i.state === 'All India');
      }
      setAllResults(items);
      currentPageRef.current = 0;
      const initial = items.slice(0, pageSize);
      setDisplayedResults(initial);
      setHasMore(items.length > pageSize);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreResults = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    // Simulate network delay
    setTimeout(() => {
      const nextPage = currentPageRef.current + 1;
      const start = nextPage * pageSize;
      const end = start + pageSize;
      const moreResults = allResults.slice(start, end);

      if (moreResults.length > 0) {
        setDisplayedResults((prev) => [...prev, ...moreResults]);
        currentPageRef.current = nextPage;
        setHasMore(end < allResults.length);
      } else {
        setHasMore(false);
      }
      setLoadingMore(false);
    }, 300);
  };

  const renderItem = ({ item }) => (
    <View
      style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <Text style={[styles.section, { color: theme.text }]}>{item.section}</Text>
      <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
      <Text style={[styles.summary, { color: theme.textSecondary }]}>
        {item.summary}
      </Text>
      <Text style={[styles.action, { color: theme.accent }]}>{item.whatYouCanDo}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={theme.accent} />
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Loading more...
        </Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" color={theme.accent} />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Loading laws...
          </Text>
        </View>
      );
    }
    if (displayedResults.length === 0 && query.trim().length > 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No matching sections found.
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
        title="Legal Search" 
        onMenuPress={() => navigation.goBack()}
        showThemeToggle={true}
      />

      <View style={styles.searchContainer}>
        <StatePicker value={state} onValueChange={setState} label="State/UT" />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Search laws, sections, keywords..."
          placeholderTextColor={theme.textSecondary}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={displayedResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={renderEmptyState}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        onEndReached={loadMoreResults}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
      />

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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginVertical: 8,
    height: 48,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  card: {
    borderRadius: 24,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  summary: {
    marginBottom: 6,
    lineHeight: 20,
  },
  action: {
    fontStyle: 'italic',
    fontSize: 14,
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    textAlign: 'center',
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    marginLeft: 8,
    fontSize: 14,
  },
  disclaimer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
