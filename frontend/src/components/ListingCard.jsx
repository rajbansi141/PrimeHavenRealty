import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Trees } from "lucide-react";

export function ListingCard({ listing }) {
  const isHouse = listing.type === "house";

  return (
    <motion.div
      layout
      whileHover={{ y: -4, scale: 1.01 }}
      className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/80 shadow-sm shadow-slate-200/60 transition dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-none"
    >
      <div className="relative h-40 overflow-hidden bg-slate-200 dark:bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
        <div className="relative flex h-full items-end justify-between p-3 text-xs text-slate-100">
          <div>
            <p className="font-semibold">{listing.location}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
              {isHouse ? "Luxury Home" : "Premium Land Parcel"}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-black/40 px-2 py-1 text-[10px]">
            {isHouse ? <Building2 className="h-3 w-3" /> : <Trees className="h-3 w-3" />}
            <span>{listing.type === "house" ? "House" : "Land"}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-3 p-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50 line-clamp-1">
              {listing.title}
            </h3>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-200">
              {listing.status === "sold" ? "Sold" : "Available"}
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500 line-clamp-2 dark:text-slate-400">
            {listing.description || "Carefully curated by PrimeHaven Realty."}
          </p>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <div className="space-y-0.5">
            <p className="font-semibold text-slate-900 dark:text-slate-50">
              ₹ {listing.price.toLocaleString()}
            </p>
            {listing.areaSqFt && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {listing.areaSqFt.toLocaleString()} sq.ft •{" "}
                {isHouse ? `${listing.bedrooms ?? 0} bed • ${listing.bathrooms ?? 0} bath` : "Land"}
              </p>
            )}
          </div>
          <Link
            to={`/listings/${listing._id}`}
            className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-50 transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
          >
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

