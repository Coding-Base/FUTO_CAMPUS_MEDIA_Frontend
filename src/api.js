// src/utils/api.js
import axios from "axios";

// Vite exposes env variables via import.meta.env
const API_BASE = import.meta.env.VITE_API_URL || "https://futo-campus-media-backend.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// ✅ Handles both paginated ({results: [...]}) and plain array responses
export async function fetchPosts() {
  const res = await api.get("/posts/");
  return res.data.results || res.data;
}

export async function fetchPost(slug) {
  const res = await api.get(`/posts/${slug}/`);
  return res.data;
}

export async function fetchComments(slug) {
  const res = await api.get(`/posts/${slug}/comments/`);
  return res.data.results || res.data;
}

export async function postComment(slug, payload) {
  const res = await api.post(`/posts/${slug}/comments/`, payload);
  return res.data;
}

export async function toggleLike(slug, visitor_id) {
  const res = await api.post(`/posts/${slug}/like/`, { visitor_id });
  return res.data;
}
