import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { allPosts, commentPost, likePost, deleteComment, deletePost } from "../services/api";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const { loading, user } = useAuth();

  const fetchPosts = async () => {
    try {
      const data = await allPosts();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  // LIKE
  const handleLike = async (postId) => {
    try {
      const data = await likePost(postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  // COMMENTS

  const selectedPost = selectedPostId
    ? posts.find((post) => post._id === selectedPostId)
    : null;

  const handleOpenComments = (post) => {
    setSelectedPostId(post._id);
    setIsCommentModalOpen(true);
  };

  const handleCloseComments = () => {
    setIsCommentModalOpen(false);
    setSelectedPostId(null);
  };

  const handleComment = async (postId, comment) => {
    try {
      const data = await commentPost(postId, comment);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post,
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const data = await deleteComment(postId, commentId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const data = await deletePost(postId);

      setPosts((prevPosts) =>
        prevPosts.filter((post) => post._id !== data.deletedPost._id),
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchPosts();
    }
  }, [loading, user]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        fetchPosts,
        handleLike,
        handleOpenComments,
        handleCloseComments,
        handleComment,
        handleDeleteComment,
        handleDeletePost,
        isCommentModalOpen,
        setIsCommentModalOpen,
        selectedPost,
        loading
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
