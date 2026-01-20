import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchListings } from "../utils/api.js";
import { ListingCard } from "../components/ListingCard.jsx";

export function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");

  useEffect(() => {
    setLoading(true);
    fetchListings(type === "all" ? {} : { type })
      .then(setListings)
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
            Available properties
          </h1>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Browse PrimeHaven&apos;s curated mix of premium homes and investment-ready lands.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs dark:bg-slate-800">
          {["all", "house", "land"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`rounded-full px-3 py-1 capitalize transition ${
                type === t
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-50"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
              }`}
            >
              {t === "all" ? "All" : t}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <motion.div
            className="h-10 w-10 rounded-full border-4 border-brand-400 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          />
        </div>
      ) : listings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          No listings yet. Once an admin adds properties, they will appear here.
        </div>
      ) : (
        <motion.div
          layout
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </motion.div>
      )}
    </div>
  );
}

