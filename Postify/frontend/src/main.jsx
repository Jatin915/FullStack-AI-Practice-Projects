import ReactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";

ReactDom.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <AuthProvider>
      <PostsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostsProvider>
    </AuthProvider>
  </ThemeProvider>,
);