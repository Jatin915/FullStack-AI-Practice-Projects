import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import { usePosts } from "../../context/PostsContext";
import { useAuth } from "../../context/AuthContext";
import CommentModal from "../comments/CommentModal";

const Layout = () => {

  const {user} = useAuth();
  const {isCommentModalOpen, selectedPost, handleCloseComments, handleComment, handleDeleteComment} = usePosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-4 pb-20">
        <Outlet />

        {isCommentModalOpen && (
          <CommentModal
            post={selectedPost}
            currentUser={user}
            onClose={handleCloseComments}
            onComment={handleComment}
            onDeleteComment={handleDeleteComment}
          />
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
