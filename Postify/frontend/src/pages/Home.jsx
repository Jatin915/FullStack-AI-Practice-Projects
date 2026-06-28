import { useEffect, useState } from "react";
import PostCard from "../components/feed/PostCard";
import { allPosts, commentPost, likePost } from "../services/api";
import CommentModal from "../components/comments/CommentModal";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      const data = await allPosts();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };

  // LIKE
  const handleLike = async (postId) => {
    try {
      const data = await likePost(postId);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === data.updatedPost._id ? data.updatedPost : post,
        )
      )

    } catch (err) {
      console.log(err);
    }
  };

  // COMMENTS

  const selectedPost = posts.find(post => post._id === selectedPostId);

  const handleOpenComments = (post) => {
      setSelectedPostId(post._id);
      setIsCommentModalOpen(true);
  };

  const handleComment = async (postId, comment) => {
    try {
      
      const data = await commentPost(postId, comment);
  
      setPosts(prevPosts =>
        prevPosts.map(post => 
          post._id === data.updatedPost._id ? data.updatedPost : post
        )
      )

    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleOpenComments}
        />
      ))}

      {isCommentModalOpen && (
        <CommentModal
          post={selectedPost}
          onClose={() => {
            setIsCommentModalOpen(false);
            setSelectedPostId(null);
          }}
          onComment={handleComment}
        />
      )}
    </>
  );
};

export default Home;
