import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import {
  uploadPost,
  allPosts,
  commentPost,
  likePost,
  deleteComment,
  deletePost,
  fetchProfile,
  updateProfile,
} from "../services/api";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  const { loading, user, setUser } = useAuth();

  // Profile
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  const getProfile = async (userId) => {
    try {
      setProfileLoading(true);
      const data = await fetchProfile(userId);
      setProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleOpenEditProfile = () => {
    setIsEditProfileModalOpen(true);
  };

  const handleCloseEditProfile = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleUpdateProfile = async ({
    username,
    bio,
    selectedImage,
    setSaving,
    resetForm,
  }) => {
    setSaving(true);
    try {
      const formData = new FormData();

      formData.append("username", username);

      formData.append("bio", bio);

      if (selectedImage) {
        formData.append("profilePic", selectedImage);
      }

      const data = await updateProfile(formData);

      // 1. Update AuthContext
      setUser(data.user);

      // 2. Update viewed profile
      if (profile?.user._id === data.user._id) {
        setProfile((prev) => ({
          ...prev,
          user: data.user,
        }));
      }

      // 3. Update every post belonging to this user

      setPosts((prev) =>
        prev.map((post) =>
          post.userId._id === data.user._id
            ? {
                ...post,
                userId: data.user,
              }
            : post,
        ),
      );

      resetForm();
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
      handleCloseEditProfile();
    }
  };

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
      if (profile) {
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post._id === data.updatedPost._id ? data.updatedPost : post,
          ),
        }));
      }
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
  };

  const handleComment = async (postId, comment) => {
    try {
      const data = await commentPost(postId, comment);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post,
        ),
      );
      if (profile) {
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post._id === data.updatedPost._id ? data.updatedPost : post,
          ),
        }));
      }
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
      if (profile) {
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.map((post) =>
            post._id === data.updatedPost._id ? data.updatedPost : post,
          ),
        }));
      }
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
      if (profile) {
        setProfile((prev) => ({
          ...prev,
          posts: prev.posts.filter((post) => post._id !== data.deletedPost._id),
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  // CREATE-POSTS
  const handleOpenCreatePost = () => {
    setIsCreatePostModalOpen(true);
  };

  const handleCloseCreatePost = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleCreatePost = async ({
    caption,
    selectedImage,
    setCreating,
    resetForm,
  }) => {
    try {
      console.log("setting setCreating true");
      setCreating(true);

      const formData = new FormData();
      formData.append("imageUrl", selectedImage);
      formData.append("caption", caption);

      console.log("calling api...");
      const data = await uploadPost(formData);

      setPosts((prevPosts) => [data.post, ...prevPosts]);

      resetForm();
      handleCloseCreatePost();
    } catch (error) {
      console.log(error);
    } finally {
      setCreating(false);
    }
  };

  // logout
  const resetPostsContext = () => {
    setPosts([]);
    setProfile(null);
    setSelectedPostId(null);

    setIsCommentModalOpen(false);
    setIsCreatePostModalOpen(false);
    setIsEditProfileModalOpen(false);
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
        isCreatePostModalOpen,
        handleOpenCreatePost,
        handleCloseCreatePost,
        selectedPost,
        handleCreatePost,
        loadingPosts,
        // profile
        profile,
        profileLoading,
        getProfile,
        isEditProfileModalOpen,
        handleUpdateProfile,
        handleOpenEditProfile,
        handleCloseEditProfile,
        // logout
        resetPostsContext,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
