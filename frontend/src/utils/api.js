import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

export async function loginRequest(email, password) {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
}

export async function registerRequest(payload) {
  const res = await api.post("/auth/register", payload);
  return res.data;
}

export async function meRequest(token) {
  const res = await api.get("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.user;
}

export async function fetchListings(params = {}) {
  const res = await api.get("/listings", { params });
  return res.data.listings;
}

export async function fetchListing(id) {
  const res = await api.get(`/listings/${id}`);
  return res.data.listing;
}

export async function createListing(data) {
  const res = await api.post("/listings", data);
  return res.data.listing;
}

export async function updateListing(id, data) {
  const res = await api.put(`/listings/${id}`, data);
  return res.data.listing;
}

export async function deleteListing(id) {
  await api.delete(`/listings/${id}`);
}

export async function purchaseListing(id) {
  const res = await api.post(`/orders/purchase/${id}`);
  return res.data.order;
}

export async function fetchMyOrders() {
  const res = await api.get("/orders/mine");
  return res.data.orders;
}

