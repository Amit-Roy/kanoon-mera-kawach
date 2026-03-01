import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';
import GavelBackground from '../components/GavelBackground';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db, getAuthInstance } from '../firebaseConfig';

const PostDetailScreen = ({ navigation, route }) => {
  const { topic, post } = route.params || {};
  const [postData, setPostData] = React.useState(post);
  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [commentText, setCommentText] = React.useState('');
  const [submittingComment, setSubmittingComment] = React.useState(false);
  const { theme, isDark } = useTheme();

  const handleMenuPress = () => {
    navigation.navigate('Home');
  };

  React.useEffect(() => {
    loadComments();
  }, [topic, post]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const commentsRef = collection(
        db,
        'topics',
        topic.id,
        'posts',
        post.id,
        'comments'
      );
      const q = query(commentsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const loadedComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(loadedComments);
    } catch (err) {
      console.error('Failed to load comments', err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpvote = async () => {
    try {
      const postRef = doc(db, 'topics', topic.id, 'posts', post.id);
      const newUpvotes = (postData.upvotes || 0) + 1;
      await updateDoc(postRef, { upvotes: newUpvotes });
      setPostData({ ...postData, upvotes: newUpvotes });
    } catch (err) {
      console.error('Failed to upvote', err);
      Alert.alert('Error', 'Failed to upvote post');
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert('Error', 'Comment cannot be empty');
      return;
    }

    setSubmittingComment(true);
    try {
      const auth = getAuthInstance();
      const commentsRef = collection(
        db,
        'topics',
        topic.id,
        'posts',
        post.id,
        'comments'
      );
      const newComment = {
        text: commentText.trim(),
        author: auth.currentUser?.email || 'Anonymous',
        createdAt: serverTimestamp(),
        upvotes: 0,
      };
      await addDoc(commentsRef, newComment);
      setCommentText('');
      Alert.alert('Success', 'Comment posted!');
      loadComments(); // Reload comments
    } catch (err) {
      console.error('Failed to post comment', err);
      Alert.alert('Error', 'Failed to post comment');
    } finally {
      setSubmittingComment(false);
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

  const renderCommentCard = ({ item }) => (
    <View style={[styles.commentCard, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <BlurView intensity={40} tint={isDark ? 'dark' : 'light'} style={styles.blurEffect}>
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={[styles.commentAuthor, { color: theme.text }]}>
              {item.author}
            </Text>
            <Text style={[styles.commentTime, { color: theme.textSecondary }]}>
              {formatDate(item.createdAt)}
            </Text>
          </View>
          <Text style={[styles.commentText, { color: theme.textSecondary }]}>
            {item.text}
          </Text>
          <View style={styles.commentFooter}>
            <Text style={[styles.commentUpvotes, { color: theme.accent }]}>
              ⬆ {item.upvotes || 0}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: isDark ? 'rgba(15,15,26,0.75)' : 'rgba(245,245,245,0.65)' }}
    >
      <GavelBackground isDark={isDark}>
        <View style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            navigation={navigation}
            title="Discussion"
            onMenuPress={handleMenuPress}
            showThemeToggle={false}
          />

        <FlatList
          data={comments}
          renderItem={renderCommentCard}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={() => (
            <View style={styles.postHeader}>
              <View
                style={[
                  styles.postCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <BlurView
                  intensity={40}
                  tint={isDark ? 'dark' : 'light'}
                  style={styles.blurEffect}
                >
                  <View style={styles.postContent}>
                    <Text
                      style={[styles.postTitle, { color: theme.text }]}
                      numberOfLines={3}
                    >
                      {postData?.title || 'Post'}
                    </Text>
                    <Text
                      style={[styles.postBody, { color: theme.textSecondary }]}
                    >
                      {postData?.content}
                    </Text>
                    <View style={styles.postMeta}>
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        by {postData?.author}
                      </Text>
                      <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                        {formatDate(postData?.createdAt)}
                      </Text>
                    </View>
                    <View style={styles.postActions}>
                      <TouchableOpacity
                        style={[styles.upvoteBtn, { backgroundColor: theme.accent }]}
                        onPress={handleUpvote}
                      >
                        <Text style={styles.upvoteBtnText}>
                          ⬆ {postData?.upvotes || 0} Upvote
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={[styles.commentCount, { color: theme.textSecondary }]}
                      >
                        💬 {comments.length} Comments
                      </Text>
                    </View>
                  </View>
                </BlurView>
              </View>

              <Text style={[styles.commentsTitle, { color: theme.text }]}>
                Comments
              </Text>
            </View>
          )}
          ListEmptyComponent={
            !loading ? (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  No comments yet. Be the first!
                </Text>
              </View>
            ) : null
          }
          contentContainerStyle={styles.listContainer}
        />

        {/* Comment Input */}
        <View style={[styles.commentInputContainer, { borderTopColor: theme.border }]}>
          <TextInput
            style={[
              styles.commentInput,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Add a comment..."
            placeholderTextColor={theme.textSecondary}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            editable={!submittingComment}
          />
          <TouchableOpacity
            style={[styles.submitBtn, { backgroundColor: theme.accent }]}
            onPress={handleAddComment}
            disabled={submittingComment}
          >
            {submittingComment ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
        </View>
      </GavelBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    padding: 16,
  },
  postCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  blurEffect: {
    flex: 1,
  },
  postContent: {
    padding: 16,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  postBody: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 16,
  },
  postMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  metaText: {
    fontSize: 12,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  upvoteBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  upvoteBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
  commentCount: {
    fontSize: 14,
    fontWeight: '500',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  commentCard: {
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  commentContent: {
    padding: 12,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: '600',
  },
  commentTime: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  commentFooter: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 8,
  },
  commentUpvotes: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 200,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
  },
  commentInputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    gap: 8,
  },
  commentInput: {
    flex: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    maxHeight: 120,
  },
  submitBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    justifyContent: 'center',
  },
  submitBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default PostDetailScreen;
