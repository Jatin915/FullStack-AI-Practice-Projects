import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      <Navbar />

      <main className="max-w-2xl mx-auto px-4 py-4 pb-20">
        <Outlet />
      </main>

      <BottomNav />

    </div>
  );
};

export default Layout;