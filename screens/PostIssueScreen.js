// screens/PostIssueScreen.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, updateDoc, increment } from 'firebase/firestore';
import { getAuthInstance, db } from '../firebaseConfig';
import { useTheme } from '../context/ThemeContext';
import StatePicker from '../components/StatePicker';
import Disclaimer from '../components/Disclaimer';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';

export default function PostIssueScreen({ navigation }) {
  const [state, setState] = React.useState('All India');
  const [category, setCategory] = React.useState('Police');
  const [accused, setAccused] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [anonymous, setAnonymous] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { theme, isDark } = useTheme();

  const CATEGORY_LIST = [
    'Police',
    'Business Fraud',
    'Govt Stonewalling/Bribes',
    'Other',
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing information', 'Please provide a title and description.');
      return;
    }
    setLoading(true);
    try {
      const auth = getAuthInstance();
      // Save issue/post to Firestore
      const issueData = {
        state,
        category,
        relatedPerson: accused.trim(),
        title: title.trim(),
        description: description.trim(),
        anonymous,
        createdAt: serverTimestamp(),
        uid: auth.currentUser?.uid || null,
      };

      // Add to 'issues' collection
      const issueRef = await addDoc(collection(db, 'issues'), issueData);

      // Also add to the corresponding topic (by category)
      // Map category to a topic name
      const topicName = category === 'Other' ? 'General Discussion' : category;
      const topicsSnapshot = await getDocs(
        query(collection(db, 'topics'), where('normalizedName', '==', normalizeTopicName(topicName)))
      );

      let topicId = null;
      if (topicsSnapshot.docs.length > 0) {
        topicId = topicsSnapshot.docs[0].id;
      } else {
        // Create topic if it doesn't exist
        const topicRef = await addDoc(collection(db, 'topics'), {
          name: topicName,
          description: `Community discussion on ${topicName.toLowerCase()}`,
          normalizedName: normalizeTopicName(topicName),
          subscriberCount: 1,
          postCount: 1,
          createdAt: serverTimestamp(),
        });
        topicId = topicRef.id;
      }

      // Create post in topic
      await addDoc(collection(db, 'topics', topicId, 'posts'), {
        issueId: issueRef.id,
        title: title.trim(),
        description: description.trim(),
        relatedPerson: accused.trim(),
        state,
        category,
        anonymous,
        uid: auth.currentUser?.uid || null,
        createdAt: serverTimestamp(),
        upvotes: 0,
        replies: 0,
      });

      // Increment topic post count
      await updateDoc(doc(db, 'topics', topicId), {
        postCount: increment(1),
      });

      Alert.alert('Success', 'Your discussion has been posted to the community!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not save discussion. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const normalizeTopicName = (name) => {
    return name.toLowerCase().replace(/\s+/g, '_');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <GavelBackground isDark={isDark}>
      <Header 
        title="Discuss an Issue" 
        onMenuPress={() => navigation.goBack()}
        showThemeToggle={true}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <StatePicker label="State/UT" value={state} onValueChange={setState} />

        <View style={styles.pickerWrapper}>
          <Text style={[styles.label, { color: theme.text }]}>Category</Text>
          <StatePicker
            value={category}
            onValueChange={setCategory}
            options={CATEGORY_LIST}
            label={null}
          />
        </View>

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Related person or organization (optional)"
          value={accused}
          onChangeText={setAccused}
          placeholderTextColor={theme.textSecondary}
        />

        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor={theme.textSecondary}
        />

        <TextInput
          style={[
            styles.input,
            styles.textArea,
            {
              backgroundColor: theme.surface,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor={theme.textSecondary}
          multiline
          numberOfLines={6}
        />

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, { color: theme.text }]}>
            Post anonymously
          </Text>
          <Switch
            value={anonymous}
            onValueChange={setAnonymous}
            thumbColor={anonymous ? theme.accent : '#ccc'}
          />
        </View>

        <Button
          title={loading ? 'Submitting…' : 'Submit'}
          onPress={handleSubmit}
          disabled={loading}
          color={theme.accent}
        />

        <Disclaimer style={styles.disclaimer} />
      </ScrollView>
      </GavelBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  input: {
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    marginVertical: 8,
    height: 48,
  },
  textArea: {
    height: 140,
    textAlignVertical: 'top',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  switchLabel: {
    fontSize: 16,
  },
  pickerWrapper: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  disclaimer: {
    marginTop: 32,
  },
});
