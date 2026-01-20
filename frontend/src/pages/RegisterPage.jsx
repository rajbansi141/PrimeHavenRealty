import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";
import { registerRequest } from "../utils/api.js";
import { useAuth } from "../state/AuthContext.jsx";

export function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await registerRequest({ name, email, password });
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/70">
      <div>
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
          Join PrimeHaven Realty
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Create your buyer profile to inquire, reserve, and manage properties.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">Full name</label>
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus-within:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <User className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
              placeholder="Your full name"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Email address
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus-within:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <Mail className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium text-slate-700 dark:text-slate-200">
            Password
          </label>
          <div className="mt-1 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus-within:border-brand-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <Lock className="h-3.5 w-3.5 text-slate-400" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-none bg-transparent outline-none placeholder:text-slate-400"
              placeholder="At least 6 characters"
            />
          </div>
        </div>
        {error && (
          <p className="rounded-xl bg-red-50 p-3 text-[11px] text-red-700 dark:bg-red-900/30 dark:text-red-200">
            {error}
          </p>
        )}
        <motion.button
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.98 }}
          className="flex w-full items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-brand-500/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? "Creating account..." : "Create account"}
        </motion.button>
      </form>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
        .
      </p>
    </div>
  );
}

