import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Trees, ArrowLeft, ShoppingBag } from "lucide-react";
import { fetchListing, purchaseListing } from "../utils/api.js";
import { useAuth } from "../state/AuthContext.jsx";

export function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchListing(id)
      .then(setListing)
      .finally(() => setLoading(false));
  }, [id]);

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!token) return;
    setPurchasing(true);
    setMessage("");
    try {
      await purchaseListing(id);
      setMessage("Purchase request recorded! Our team will contact you shortly.");
      setListing((prev) => (prev ? { ...prev, status: "sold" } : prev));
    } catch (err) {
      setMessage(err?.response?.data?.message || "Unable to complete purchase.");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <motion.div
          className="h-10 w-10 rounded-full border-4 border-brand-400 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="space-y-4 text-sm">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="h-3 w-3" />
          Back
        </button>
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
          Listing not found.
        </p>
      </div>
    );
  }

  const isHouse = listing.type === "house";

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
      >
        <ArrowLeft className="h-3 w-3" />
        Back
      </button>

      <div className="grid gap-6 md:grid-cols-[1.6fr,1fr]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-900/60"
        >
          <div className="relative h-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.4),_transparent_55%)]" />
            <div className="relative flex h-full flex-col justify-between p-4 text-slate-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-slate-300">
                    {isHouse ? "PrimeHaven Home" : "PrimeHaven Land"}
                  </p>
                  <h1 className="mt-1 text-lg font-semibold">{listing.title}</h1>
                </div>
                <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wide">
                  {listing.status === "sold" ? "Sold" : "Available"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3 text-[11px] text-slate-300">
                <div className="rounded-2xl bg-slate-900/50 p-3">
                  {isHouse ? (
                    <Building2 className="mb-1 h-4 w-4 text-brand-400" />
                  ) : (
                    <Trees className="mb-1 h-4 w-4 text-emerald-400" />
                  )}
                  <p className="font-semibold text-slate-50">
                    ₹ {listing.price.toLocaleString()}
                  </p>
                  <p>{isHouse ? "Premium residence" : "Investment land"}</p>
                </div>
                <div className="rounded-2xl bg-slate-900/50 p-3">
                  <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                    Area
                  </p>
                  <p className="font-semibold text-slate-50">
                    {listing.areaSqFt ? `${listing.areaSqFt.toLocaleString()} sq.ft` : "On request"}
                  </p>
                  <p>{listing.location}</p>
                </div>
                {isHouse && (
                  <div className="rounded-2xl bg-slate-900/50 p-3">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      Layout
                    </p>
                    <p className="font-semibold text-slate-50">
                      {listing.bedrooms ?? 0} bed • {listing.bathrooms ?? 0} bath
                    </p>
                    <p>Modern floor plan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-3 p-4 text-sm text-slate-600 dark:text-slate-200">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Property overview
            </h2>
            <p className="text-xs leading-relaxed">
              {listing.description ||
                "This premium listing has been verified by PrimeHaven Realty. Contact our team to know more about the exact location, legal checks, and on-site visit availability."}
            </p>
          </div>
        </motion.div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white/80 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Reserve with PrimeHaven
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Ready to move forward? Place a purchase request and our advisors will reach out with
            next steps, documentation, and site visit scheduling.
          </p>
          <button
            type="button"
            disabled={listing.status === "sold" || purchasing}
            onClick={handlePurchase}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-brand-500/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <ShoppingBag className="h-4 w-4" />
            {listing.status === "sold" ? "Already sold" : "Reserve this property"}
          </button>
          {!user && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              You&apos;ll be redirected to login before we confirm your reservation.
            </p>
          )}
          {message && (
            <p className="rounded-xl bg-emerald-50 p-3 text-[11px] text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

