import { motion } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Sun, Moon, Building2 } from "lucide-react";
import { useTheme } from "../state/ThemeContext.jsx";
import { useAuth } from "../state/AuthContext.jsx";

export function Layout({ children }) {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = ({ isActive: active }) =>
    active ? "text-brand-500 dark:text-brand-300" : "text-slate-500 dark:text-slate-300";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-lg"
            >
              <Building2 className="h-5 w-5" />
            </motion.div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-50">
                PrimeHaven Realty
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Find your perfect home & land
              </div>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm">
            <NavLink to="/" className={isActive}>
              Home
            </NavLink>
            <NavLink to="/listings" className={isActive}>
              Explore
            </NavLink>
            {user?.role === "admin" && (
              <NavLink to="/admin" className={isActive}>
                Admin
              </NavLink>
            )}
            {!user && (
              <>
                <NavLink to="/login" className={isActive}>
                  Login
                </NavLink>
                <NavLink to="/register" className={isActive}>
                  Register
                </NavLink>
              </>
            )}
            {user && (
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-300"
              >
                Logout
              </button>
            )}
            <button
              aria-label="Toggle theme"
              type="button"
              onClick={toggle}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-700 shadow-sm transition hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-200"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="border-t border-slate-200 bg-white/60 py-4 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <span>© {new Date().getFullYear()} PrimeHaven Realty. All rights reserved.</span>
          <span className="hidden sm:inline">
            Crafted with care • Buy your next home or investment land with confidence.
          </span>
        </div>
      </footer>
    </div>
  );
}

