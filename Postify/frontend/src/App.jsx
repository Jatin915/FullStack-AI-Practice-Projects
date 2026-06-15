import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

const App = () => {
  const { loading, setLoading } = useAuth();

  if(loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl">
        <h1>Loading...</h1>
      </div>
    );
  }
    return (
      <Routes>
        <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    );
}

export default App;