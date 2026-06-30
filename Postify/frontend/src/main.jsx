import ReactDom from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { PostsProvider } from './context/PostsContext.jsx'

ReactDom.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <PostsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostsProvider>
  </AuthProvider>
);