import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await signupUser(formData);

      // clear input fields
      setFormData({
        username: "",
        email: "",
        password: "",
      });

      // redirect to home page
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Postify 🚀
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your moments with the world.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm transition-colors duration-300">
            <legend className="text-xl font-semibold text-gray-900 dark:text-white px-2 mb-4">
              Signup
            </legend>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter username"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-xl transition-colors duration-200"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="text-blue-600 dark:text-blue-400 font-medium cursor-pointer"
                >
                  Login
                </Link>
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Signup;
