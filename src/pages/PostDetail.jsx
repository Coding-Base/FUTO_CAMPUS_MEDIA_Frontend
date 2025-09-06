// src/pages/PostDetail.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchPost, fetchComments, postComment, toggleLike } from "../api";
import PageContainer from "../components/PageContainer";
import { getVisitorId } from "../utils/visitor";

/* Helpers to resolve image URLs */
const backendOrigin = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

const toAbsolute = (u) => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u; // Cloudinary or external
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${backendOrigin}${path}`;
};

const buildFallback = (u) => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u; // absolute: no fallback
  const path = u.startsWith("/") ? u : `/${u}`;
  if (path.startsWith("/media/")) return `${backendOrigin}${path}`;
  if (path.startsWith("/post_images/")) return `${backendOrigin}/media${path}`;
  return `${backendOrigin}/media${path}`;
};

/* LocalStorage keys */
const LS_COMMENT_LIKED = "futo_comment_likes";
const LS_COMMENT_COUNTS = "futo_comment_like_counts";

// Recursive comment component
const CommentNode = ({ 
  c, 
  replyOpen, 
  replyForms, 
  onToggleCommentLike, 
  onOpenReply, 
  onCloseReply, 
  onSetReplyField, 
  onSubmitReply, 
  commentLiked, 
  commentLikeCounts 
}) => (
  <div className="bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
        {c.name ? c.name.charAt(0).toUpperCase() : "A"}
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="font-semibold text-gray-800">{c.name || "Anonymous"}</div>
          <div className="text-xs text-gray-500">{new Date(c.created_at).toLocaleString()}</div>
        </div>

        <p className="mt-2 text-gray-700 whitespace-pre-wrap">{c.content}</p>

        <div className="mt-3 flex items-center gap-4 text-sm text-gray-500">
          <button
            onClick={() => onToggleCommentLike(c.id)}
            className={`flex items-center gap-2 px-2 py-1 rounded ${commentLiked[c.id] ? "bg-red-50 text-red-600" : "hover:text-indigo-600"} transition-colors duration-300`}
            aria-pressed={!!commentLiked[c.id]}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill={commentLiked[c.id] ? "currentColor" : "none"} stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21s-6-4.35-8.22-6.35C1.3 12.94 2 9.5 5.64 7.5 8.3 6 10 7 12 9c2-2 3.7-3 6.36-1.5C22 9.5 22.7 12.94 20.22 14.65 18 16.65 12 21 12 21z" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{commentLikeCounts[c.id] || 0}</span>
          </button>

          <button
            onClick={() => (replyOpen[c.id] ? onCloseReply(c.id) : onOpenReply(c))}
            className="flex items-center gap-2 px-2 py-1 rounded hover:text-indigo-600 transition-colors duration-300"
            aria-expanded={!!replyOpen[c.id]}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
            Reply
          </button>
        </div>

        {replyOpen[c.id] && (
          <div className="mt-4 border-l-2 border-gray-100 pl-4">
            <div className="text-sm text-gray-600 mb-2">Replying to {c.name}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                className="border rounded px-3 py-2"
                placeholder="Your name"
                value={replyForms[c.id]?.name || ""}
                onChange={(e) => onSetReplyField(c.id, "name", e.target.value)}
                autoFocus
              />
              <input
                className="border rounded px-3 py-2"
                placeholder="Email (optional)"
                value={replyForms[c.id]?.email || ""}
                onChange={(e) => onSetReplyField(c.id, "email", e.target.value)}
              />
            </div>
            <textarea
              className="border rounded px-3 py-2 w-full mt-3"
              rows={3}
              placeholder="Write your reply..."
              value={replyForms[c.id]?.content || ""}
              onChange={(e) => onSetReplyField(c.id, "content", e.target.value)}
            />
            <div className="mt-2 flex gap-2">
              <button onClick={() => onSubmitReply(c.id)} className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                Send reply
              </button>
              <button onClick={() => onCloseReply(c.id)} className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        )}

        {c.replies?.length > 0 && (
          <div className="mt-4 pl-6 border-l-2 border-gray-100 space-y-3">
            {c.replies.map((r) => (
              <CommentNode 
                key={r.id} 
                c={r} 
                replyOpen={replyOpen}
                replyForms={replyForms}
                onToggleCommentLike={onToggleCommentLike}
                onOpenReply={onOpenReply}
                onCloseReply={onCloseReply}
                onSetReplyField={onSetReplyField}
                onSubmitReply={onSubmitReply}
                commentLiked={commentLiked}
                commentLikeCounts={commentLikeCounts}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function PostDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [likes, setLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const [replyOpen, setReplyOpen] = useState({});
  const [replyForms, setReplyForms] = useState({});
  const [commentLiked, setCommentLiked] = useState({});
  const [commentLikeCounts, setCommentLikeCounts] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchPost(slug)
      .then((data) => {
        setPost(data);
        setLikes(data.likes_count || 0);
        if (typeof data.liked !== "undefined") setIsLiked(!!data.liked);
      })
      .catch((err) => console.error("Fetch post error:", err));

    fetchComments(slug)
      .then((data) => {
        const arr = Array.isArray(data) ? data : [];
        setComments(arr);

        // Init comment like counts
        try {
          const storedCounts = JSON.parse(localStorage.getItem(LS_COMMENT_COUNTS) || "{}");
          const nextCounts = { ...storedCounts };
          const walk = (nodes) => {
            (nodes || []).forEach((n) => {
              if (typeof nextCounts[n.id] !== "number") nextCounts[n.id] = 0;
              walk(n.replies || []);
            });
          };
          walk(arr);
          setCommentLikeCounts(nextCounts);
          localStorage.setItem(LS_COMMENT_COUNTS, JSON.stringify(nextCounts));
        } catch {
          const init = {};
          const walk = (nodes) => {
            (nodes || []).forEach((n) => {
              init[n.id] = 0;
              walk(n.replies || []);
            });
          };
          walk(arr);
          setCommentLikeCounts(init);
          localStorage.setItem(LS_COMMENT_COUNTS, JSON.stringify(init));
        }

        try {
          const storedLiked = JSON.parse(localStorage.getItem(LS_COMMENT_LIKED) || "{}");
          setCommentLiked(storedLiked);
        } catch {
          setCommentLiked({});
        }
      })
      .catch((err) => {
        console.error("Fetch comments error:", err);
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const persistCommentLiked = (obj) => localStorage.setItem(LS_COMMENT_LIKED, JSON.stringify(obj));
  const persistCommentCounts = (obj) => localStorage.setItem(LS_COMMENT_COUNTS, JSON.stringify(obj));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.content) return alert("Please enter name and comment");
    try {
      const created = await postComment(slug, form);
      setComments((prev) => [...prev, created]);
      setForm({ name: "", email: "", content: "" });

      setCommentLikeCounts((prev) => {
        const next = { ...prev, [created.id]: 0 };
        persistCommentCounts(next);
        return next;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to submit comment");
    }
  };

  const handleLike = async () => {
    try {
      const res = await toggleLike(slug, getVisitorId());
      if (res && typeof res.likes_count === "number") setLikes(res.likes_count);
      if (res && typeof res.liked !== "undefined") setIsLiked(!!res.liked);
      else setIsLiked((v) => !v);
    } catch (err) {
      console.error("Failed to like post:", err);
    }
  };

  const toggleCommentLike = useCallback((id) => {
    setCommentLiked((prev) => {
      const current = !!prev[id];
      const next = { ...prev, [id]: !current };
      persistCommentLiked(next);

      setCommentLikeCounts((prevCounts) => {
        const count = Number(prevCounts[id] || 0);
        const updated = { ...prevCounts, [id]: current ? Math.max(0, count - 1) : count + 1 };
        persistCommentCounts(updated);
        return updated;
      });

      return next;
    });
  }, []);

  const openReply = useCallback((c) => {
    setReplyOpen((prev) => ({ ...prev, [c.id]: true }));
    setReplyForms((prev) => ({
      ...prev,
      [c.id]: { name: "", email: "", content: `@${c.name} ` },
    }));
  }, []);

  const closeReply = useCallback((id) => {
    setReplyOpen((prev) => ({ ...prev, [id]: false }));
    setReplyForms((prev) => ({ ...prev, [id]: { name: "", email: "", content: "" } }));
  }, []);

  const setReplyField = useCallback((id, field, value) => {
    setReplyForms((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { name: "", email: "", content: "" }), [field]: value },
    }));
  }, []);

  const insertCreatedComment = useCallback((created) => {
    if (!created) return;
    if (!created.parent) {
      setComments((prev) => [...prev, created]);
    } else {
      const addReply = (list, pid, item) =>
        list.map((c) => {
          if (c.id === pid) {
            return { ...c, replies: [...(c.replies || []), item] };
          }
          if (c.replies?.length) return { ...c, replies: addReply(c.replies, pid, item) };
          return c;
        });
      setComments((prev) => addReply(prev, created.parent, created));
    }
    setCommentLikeCounts((prev) => ({ ...prev, [created.id]: 0 }));
  }, []);

  const submitReply = useCallback(async (id) => {
    const payload = replyForms[id];
    if (!payload || !payload.name || !payload.content) return alert("Please enter name and reply");
    try {
      const created = await postComment(slug, { ...payload, parent: id });
      insertCreatedComment(created);
      closeReply(id);
    } catch (err) {
      console.error("Failed to submit reply:", err);
      alert("Failed to submit reply");
    }
  }, [replyForms, slug, insertCreatedComment, closeReply]);

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600" />
        </div>
      </PageContainer>
    );
  }
  if (!post) return <PageContainer>Post not found.</PageContainer>;

  const raw = post.image_url || post.image || null;
  const src = toAbsolute(raw);
  const fallback = buildFallback(raw);

  return (
    <PageContainer>
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        {src && (
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
                    encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='500'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='28'>No image</text></svg>");
                }
              }}
            />
          </div>
        )}

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
              className={`px-5 py-2 rounded-full flex items-center gap-2 ${isLiked ? "bg-red-50 text-red-600" : "bg-gray-100 text-gray-700"} transition-colors duration-300`}
            >
              <svg className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              {likes} likes
            </button>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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
            <input
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Email (optional)"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <textarea
            className="w-full border rounded-lg px-4 py-2 mt-4"
            rows={4}
            placeholder="Write your comment..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
          <button type="submit" className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Post comment
          </button>
        </form>

        <ul className="space-y-4">
          {comments.map((c) => (
            <li key={c.id}>
              <CommentNode 
                c={c} 
                replyOpen={replyOpen}
                replyForms={replyForms}
                onToggleCommentLike={toggleCommentLike}
                onOpenReply={openReply}
                onCloseReply={closeReply}
                onSetReplyField={setReplyField}
                onSubmitReply={submitReply}
                commentLiked={commentLiked}
                commentLikeCounts={commentLikeCounts}
              />
            </li>
          ))}
        </ul>
      </section>
    </PageContainer>
  );
}
