import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const data = await loginUser(formData);

      // clear input fields
      setFormData({
        email: "",
        password: "",
      });
      
      setUser(data.user);

      // redirect to home page
      navigate("/");
      
    } catch (err) {
      console.log(err);
      setError(
        err.response?.data?.message || "Something went wrong"
    );
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 px-4 py-8 dark:bg-zinc-950 sm:px-6">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-500/15 sm:h-96 sm:w-96" />
      <div className="absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/15 sm:h-[28rem] sm:w-[28rem]" />
    </div>

    <div className="relative w-full max-w-md">
      <div className="mb-7 text-center sm:mb-8">
        <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-blue-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
          Postify
        </h1>
        <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500 dark:text-zinc-400 sm:text-base">
          Welcome back. Sign in to continue sharing and exploring posts.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={loading}
          className="rounded-[1.6rem] border border-zinc-200/80 bg-white/90 p-5 shadow-xl shadow-zinc-200/40 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-900/85 dark:shadow-black/20 sm:p-7"
        >
          <legend className="sr-only">Login</legend>

          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-100 sm:text-2xl">
              Login to your account
            </h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Enter your credentials to access Postify.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-zinc-950 outline-none placeholder:text-zinc-400 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              )}
              {loading ? "Logging in..." : "Login Account"}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-600 transition-colors hover:text-blue-700 hover:underline hover:underline-offset-4 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Sign up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  </div>
);
};

export default Login;