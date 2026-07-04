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

export const deleteComment = async (postId, commentId) => {
    const response = await api.put(`api/posts/${postId}/comment/${commentId}`);
    return response.data;
}

export const deletePost = async (postId) => {
    const response = await api.delete(`api/posts/${postId}/delete`);
    return response.data;
}

export const uploadPost = async (formData) => {
    const response = await api.post("api/posts/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    console.log(response.data)
    return response.data;
}

export const fetchProfile = async (userId) => {
    console.log("backend api call")
    const response = await api.get(`/api/profile/${userId}`);
    return response.data;
}

export const updateProfile = async (formData) => {
  const response = await api.put("/api/profile/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export default api;