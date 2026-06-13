import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

// signup user
export const signupUser = async(formData) => {
  try {
      const response = await api.post("/api/auth/signup", formData);
      return response.data;
  } catch(err) {
    throw new Error(
        err.response?.data?.message || "Something went wrong"
    )}
}

export default api;