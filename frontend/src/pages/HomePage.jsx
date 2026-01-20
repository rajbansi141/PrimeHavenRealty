import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Trees, KeyRound } from "lucide-react";

export function HomePage() {
  return (
    <div className="space-y-12">
      <section className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-4xl"
          >
            Prime properties,{" "}
            <span className="bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent">
              curated for modern living.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          >
            PrimeHaven Realty connects serious buyers with premium homes and investment-ready
            lands. Browse handpicked listings, view rich details, and securely reserve your next
            move — all in one elegant experience.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="flex flex-wrap items-center gap-3"
          >
            <Link
              to="/listings"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2 text-xs font-medium text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-500"
            >
              <KeyRound className="h-4 w-4" />
              Explore properties
            </Link>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Trusted by families & investors across the region.
            </span>
          </motion.div>

          <dl className="mt-4 grid grid-cols-3 gap-4 text-xs">
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Premium homes</dt>
              <dd className="text-lg font-semibold text-slate-900 dark:text-slate-50">50+</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Land parcels</dt>
              <dd className="text-lg font-semibold text-slate-900 dark:text-slate-50">30+</dd>
            </div>
            <div>
              <dt className="text-slate-500 dark:text-slate-400">Avg. response</dt>
              <dd className="text-lg font-semibold text-slate-900 dark:text-slate-50">&lt; 2 hrs</dd>
            </div>
          </dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative h-64 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 shadow-xl dark:border-slate-700"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_55%)]" />
          <div className="relative flex h-full flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-400">
                  Featured residence
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-50">
                  Harborview Skyline Villa
                </p>
              </div>
              <span className="rounded-full bg-brand-500/20 px-3 py-1 text-[10px] font-medium text-brand-100">
                Sea-facing • Gated
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-[10px] text-slate-300">
              <div className="rounded-2xl bg-slate-900/40 p-3">
                <Building2 className="mb-1 h-4 w-4 text-brand-400" />
                <p className="font-semibold text-slate-50">3,200 sq.ft</p>
                <p>5 bed • 4 bath</p>
              </div>
              <div className="rounded-2xl bg-slate-900/40 p-3">
                <Trees className="mb-1 h-4 w-4 text-emerald-400" />
                <p className="font-semibold text-slate-50">Private lawn</p>
                <p>Landscaped</p>
              </div>
              <div className="rounded-2xl bg-slate-900/40 p-3">
                <KeyRound className="mb-1 h-4 w-4 text-amber-400" />
                <p className="font-semibold text-slate-50">₹ 3.2 Cr</p>
                <p>No brokerage</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

