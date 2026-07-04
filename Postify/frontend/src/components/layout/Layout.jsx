import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import { usePosts } from "../../context/PostsContext";
import { useAuth } from "../../context/AuthContext";
import CommentModal from "../comments/CommentModal";
import CreatePostModal from "../feed/CreatePostModal";
import EditProfileModal from "../profile/EditProfileModal";

const Layout = () => {

  const {user} = useAuth();
  const {isCommentModalOpen, isCreatePostModalOpen, isEditProfileModalOpen} = usePosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-4 pb-20">
        <Outlet />
        {isCommentModalOpen && <CommentModal />}
        {isCreatePostModalOpen && <CreatePostModal />}
        {isEditProfileModalOpen && <EditProfileModal />}
      </main>

      <BottomNav />
    </div>
  );
};

export default Layout;
