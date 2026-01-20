import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit, CheckCircle2 } from "lucide-react";
import { createListing, deleteListing, fetchListings, updateListing } from "../utils/api.js";

const EMPTY_FORM = {
  title: "",
  type: "house",
  price: "",
  location: "",
  description: "",
  areaSqFt: "",
  bedrooms: "",
  bathrooms: "",
};

export function DashboardPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadListings = async () => {
    setLoading(true);
    try {
      const data = await fetchListings();
      setListings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (listing) => {
    setEditingId(listing._id);
    setForm({
      title: listing.title || "",
      type: listing.type || "house",
      price: String(listing.price ?? ""),
      location: listing.location || "",
      description: listing.description || "",
      areaSqFt: listing.areaSqFt ? String(listing.areaSqFt) : "",
      bedrooms: listing.bedrooms ? String(listing.bedrooms) : "",
      bathrooms: listing.bathrooms ? String(listing.bathrooms) : "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price || 0),
      areaSqFt: form.areaSqFt ? Number(form.areaSqFt) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
    };
    try {
      if (editingId) {
        await updateListing(editingId, payload);
        setMessage("Listing updated.");
      } else {
        await createListing(payload);
        setMessage("Listing created.");
      }
      setForm(EMPTY_FORM);
      setEditingId(null);
      await loadListings();
    } catch (err) {
      setMessage(err?.response?.data?.message || "Could not save listing.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await deleteListing(id);
    await loadListings();
  };

  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr,1.4fr]">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-5 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {editingId ? "Edit listing" : "Add new listing"}
            </h1>
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Manage PrimeHaven&apos;s homes and land inventory.
            </p>
          </div>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(EMPTY_FORM);
              }}
              className="text-[11px] text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Title</label>
            <input
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Ex: Skyline Villa"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="house">House</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Price (₹)</label>
            <input
              required
              type="number"
              min="0"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Area (sq.ft)</label>
            <input
              type="number"
              min="0"
              name="areaSqFt"
              value={form.areaSqFt}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Location</label>
            <input
              required
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Area • City"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Bedrooms</label>
            <input
              type="number"
              min="0"
              name="bedrooms"
              value={form.bedrooms}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600 dark:text-slate-300">Bathrooms</label>
            <input
              type="number"
              min="0"
              name="bathrooms"
              value={form.bathrooms}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] text-slate-600 dark:text-slate-300">Short description</label>
          <textarea
            rows={3}
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none ring-brand-400 focus:border-brand-400 focus:ring-1 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Highlight what makes this property special."
          />
        </div>

        {message && (
          <p className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-300">
            <CheckCircle2 className="h-3 w-3" />
            {message}
          </p>
        )}

        <motion.button
          type="submit"
          disabled={saving}
          whileTap={{ scale: 0.98 }}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-medium text-white shadow-md shadow-brand-500/30 transition hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <Plus className="h-4 w-4" />
          {editingId ? "Save changes" : "Create listing"}
        </motion.button>
      </form>

      <div className="space-y-3 rounded-3xl border border-slate-200 bg-white/80 p-4 text-xs shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Existing listings
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <motion.div
              className="h-8 w-8 rounded-full border-4 border-brand-400 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        ) : listings.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-slate-500 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-400">
            No listings yet. Create your first PrimeHaven property on the left.
          </p>
        ) : (
          <div className="space-y-2">
            {listings.map((listing) => (
              <div
                key={listing._id}
                className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-900"
              >
                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-slate-50">
                    {listing.title}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {listing.type} • ₹ {listing.price.toLocaleString()} • {listing.location}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(listing)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-300"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(listing._id)}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-red-400 hover:text-red-600 dark:border-slate-700 dark:text-slate-300 dark:hover:border-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

