import { useEffect, useState } from "react";
import PostCard from "../components/feed/PostCard";
import { usePosts } from "../context/PostsContext";

const Home = () => {

  const {posts, loadingPosts, handleLike, handleOpenComments, handleDeletePost} = usePosts();

  if(loadingPosts) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          onLike={handleLike}
          onComment={handleOpenComments}
          onDelete={handleDeletePost}
        />
      ))}
    </>
  );
};

export default Home;
