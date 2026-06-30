import { Routes, Route, Outlet } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import ProtectedRoute from './routes/ProtectedRoute'
import PublicRoute from "./routes/PublicRoute";
import Layout from './components/layout/Layout';

const App = () => {
  const { loading } = useAuth();

  if(loading) {
    return (
      <div className="h-screen flex items-center justify-center text-3xl">
        <h1>Loading...</h1>
      </div>
    );
  }

    return (
      <Routes>
        
        <Route element={<PublicRoute> <Outlet /> </PublicRoute>}>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute> <Layout /> </ProtectedRoute>}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
        </Route>
        
      </Routes>
    );
}

export default App;