// src/pages/PostDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPost, fetchComments, postComment, toggleLike } from "../api";
import PageContainer from "../components/PageContainer";
import { getVisitorId } from "../utils/visitor";

const backendOrigin = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");
const toAbsolute = (u) => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${backendOrigin}${path}`;
};
const buildFallback = (u) => {
  if (!u) return null;
  const path = u.startsWith("/") ? u : `/${u}`;
  if (path.startsWith("/media/")) return `${backendOrigin}${path}`;
  if (path.startsWith("/post_images/")) return `${backendOrigin}/media${path}`;
  return `${backendOrigin}/media${path}`;
};

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPost(slug)
      .then((data) => {
        setPost(data);
        setLikes(data.likes_count || 0);
      })
      .catch((err) => console.error("Fetch post error:", err))
      .finally(() => setLoading(false));

    fetchComments(slug).then(setComments).catch((err) => console.error("Fetch comments error:", err));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return alert("Please enter name and comment");
    try {
      const created = await postComment(slug, form);
      setComments((prev) => [...prev, created]);
      setForm({ name: "", email: "", content: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit comment");
    }
  };

  const handleLike = async () => {
    try {
      const res = await toggleLike(slug, getVisitorId());
      if (res && typeof res.likes_count === 'number') {
        setLikes(res.likes_count);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.error("Failed to like:", err);
    }
  };

  if (loading) return <PageContainer><div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div></PageContainer>;
  if (!post) return <PageContainer>Post not found.</PageContainer>;

  const raw = post.image_url || post.image || null;
  const src = toAbsolute(raw);
  const fallback = buildFallback(raw);

  return (
    <PageContainer>
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {src ? (
          <div className="relative h-96 overflow-hidden">
            <img
              src={src}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                if (!el.dataset.triedFallback && fallback) {
                  el.dataset.triedFallback = "1";
                  el.src = fallback;
                } else {
                  el.onerror = null;
                  el.src =
                    "data:image/svg+xml;utf8," +
                    encodeURIComponent(
                      `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='500'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='28'>No image</text></svg>`
                    );
                }
              }}
            />
          </div>
        ) : null}

        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          {post.subtitle && <h2 className="text-xl font-semibold mt-2 text-gray-600">{post.subtitle}</h2>}
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span className="mx-2">•</span>
            <span>5 min read</span>
          </div>

          <div className="prose max-w-none mt-6 text-gray-700" dangerouslySetInnerHTML={{ __html: post.content || "" }} />

          <div className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-100">
            <button 
              onClick={handleLike} 
              className={`px-5 py-2 rounded-full flex items-center gap-2 ${isLiked ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'} transition-colors duration-300`}
            >
              <svg className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {likes} likes
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
              </svg>
              {comments.length} comments
            </div>
          </div>
        </div>
      </article>

      <section className="mt-8">
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Comments ({comments.length})</h3>

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-8">
          <h4 className="font-medium text-lg mb-4">Leave a comment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your name</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                placeholder="Enter your name" 
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })} 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input 
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
                placeholder="Enter your email" 
                type="email" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your comment</label>
            <textarea 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300" 
              rows={4} 
              placeholder="Write your comment..." 
              value={form.content} 
              onChange={(e) => setForm({ ...form, content: e.target.value })} 
              required 
            />
          </div>

          <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-300">
            Post comment
          </button>
        </form>

        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {c.name ? c.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div className="font-semibold text-gray-800">{c.name || "Anonymous"}</div>
                    <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
                  </div>
                  <p className="mt-2 text-gray-700">{c.content}</p>
                  <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                      </svg>
                      Like
                    </button>
                    <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors duration-300">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                      </svg>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}