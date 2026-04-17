import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Todo from "./pages/Todo";

function App() {
  return (
    <Routes>

      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Todo route */}
        <Route path="/todos" element={<Todo />} />

    </Routes>
  );
}

export default App;