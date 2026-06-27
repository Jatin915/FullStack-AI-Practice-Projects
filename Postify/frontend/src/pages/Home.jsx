import { useEffect, useState } from "react";
import PostCard from "../components/feed/PostCard";
import { allPosts, likePost } from "../services/api";
// import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      
      const data = await allPosts();
      setPosts(data.posts);

    } catch (error) {
      console.log(error);
    }
  };


  const handleLike = async (postId) => {
    try {

      const data = await likePost(postId);

      setPosts(prevPosts =>
        prevPosts.map(post =>
          (post._id === data.post._id) ? data.post : post
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
        <PostCard key={post._id}
          post={post}
          onLike = {handleLike}
        />
      ))}
    </>
  );
};

export default Home;
