import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// signup user
export const signupUser = async(formData) => {
    const response = await api.post("/api/auth/signup", formData);
    return response.data;
}

// login user
export const loginUser = async(formData) => {
    const response = await api.post("/api/auth/login", formData);
    return response.data;
}

export const me = async() => {
    const response = await api.get("/api/auth/me")
    return response.data;
}

export const allPosts = async() => {
    const response = await api.get("api/posts/")
    return response.data;
}

export const likePost = async(postId) => {
    const response = await api.put(`api/posts/${postId}/like`);
    return response.data;
}

export const commentPost = async(postId, comment) => {
    const response = await api.post(`api/posts/${postId}/comment`, {text:comment});
    return response.data;
}

export default api;