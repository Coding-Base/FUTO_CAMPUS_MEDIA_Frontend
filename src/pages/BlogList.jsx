// src/pages/BlogList.jsx
import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";

// backend origin derived from VITE_API_URL (strip trailing /api)
const backendOrigin = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "");

// Carousel images
const carouselImages = [
  "https://www.inma.org/img/digital_subscriptions-1800.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYySU-bVcBoj_FEFnw2mv8ZBzsxuHGidzzeA&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSQq1tqcnMpmvgwhSFZVlaNMQOy_OLnTG4ew&s",
  "https://images.theconversation.com/files/603271/original/file-20240626-17-gvake9.jpg?ixlib=rb-4.1.0&rect=0%2C407%2C3848%2C1924&q=45&auto=format&w=1356&h=668&fit=crop",
  "https://www.shutterstock.com/image-photo/portrait-male-student-standing-college-600nw-763464100.jpg"
];

/**
 * Normalize any returned image path:
 * - If already absolute (http/https) -> return as-is
 * - If relative and begins with /media -> backendOrigin + path
 * - If relative and begins with /post_images -> try backendOrigin + /post_images (existing) but we will also
 *   provide a fallback to /media/post_images on img error.
 * - If relative other path -> backendOrigin + path
 */
const toAbsolute = (u) => {
  if (!u) return null;
  if (/^https?:\/\//i.test(u)) return u;
  // ensure leading slash
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${backendOrigin}${path}`;
};

// Build fallback URL when a 404 occurs (tries /media prefix)
const buildFallback = (u) => {
  if (!u) return null;
  const path = u.startsWith("/") ? u : `/${u}`;
  // If it's already /media/... return same (nothing else to try)
  if (path.startsWith("/media/")) return `${backendOrigin}${path}`;
  // If it's /post_images/... try /media/post_images/...
  if (path.startsWith("/post_images/")) return `${backendOrigin}/media${path}`;
  // Generic fallback: prefix /media
  return `${backendOrigin}/media${path}`;
};

export default function BlogList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        // data should be an array (fetchPosts normalizes both paginated & non-paginated)
        setPosts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setPosts([]);
      })
      .finally(() => setLoading(false));

    // Carousel auto-rotation
    const carouselInterval = setInterval(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(carouselInterval);
  }, []);

  if (loading) return <PageContainer><div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div></div></PageContainer>;
  if (!posts.length) return <PageContainer><div>No posts yet.</div></PageContainer>;

  return (
    <PageContainer>
      {/* Hero Carousel Section */}
      <div className="relative h-96 overflow-hidden rounded-xl mb-10 shadow-lg">
        {carouselImages.map((img, index) => (
          <div 
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentCarouselIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt={`Carousel ${index + 1}`} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-10 left-10 text-white">
              <h1 className="text-4xl font-bold mb-2">FUTO Campus Media</h1>
              <p className="text-xl">All voices matter — latest campus news, updates and guides.</p>
            </div>
          </div>
        ))}
        
        {/* Carousel Indicators */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentCarouselIndex ? 'bg-white' : 'bg-white/50'}`}
              onClick={() => setCurrentCarouselIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {posts.map((post) => {
            // prefer image_url if present, else try image
            const raw = post.image_url || post.image || null;
            const src = toAbsolute(raw);
            const fallback = buildFallback(raw);

            return (
              <article key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
                {src ? (
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={src}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // try fallback once
                        const el = e.currentTarget;
                        if (!el.dataset.triedFallback && fallback) {
                          el.dataset.triedFallback = "1";
                          el.src = fallback;
                        } else {
                          // final fallback - small placeholder (data URI) to avoid broken icon
                          el.onerror = null;
                          el.src =
                            "data:image/svg+xml;utf8," +
                            encodeURIComponent(
                              `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='400'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='24'>No image</text></svg>`
                            );
                        }
                      }}
                    />
                  </div>
                ) : null}

                <div className="p-6">
                  <Link to={`/posts/${post.slug}`}>
                    <h2 className="text-2xl font-bold text-gray-800 hover:text-indigo-600 transition-colors duration-300">{post.title}</h2>
                  </Link>
                  {post.subtitle && <h3 className="font-semibold mt-2 text-gray-600">{post.subtitle}</h3>}
                  <div className="text-sm text-gray-500 mt-2">{new Date(post.created_at).toLocaleString()}</div>

                  <div
                    className="mt-4 text-gray-700 line-clamp-3 prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: (post.content || "").slice(0, 400) + ((post.content || "").length > 400 ? "..." : "") }}
                  />

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {post.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                        </svg>
                        {post.comments_count}
                      </span>
                    </div>
                    <Link to={`/posts/${post.slug}`} className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors duration-300 flex items-center gap-1">
                      Read more
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="font-bold text-xl mb-4 pb-2 border-b border-gray-200">Popular Now</h4>
            {posts.slice(0, 4).map((p) => {
              const raw = p.image_url || p.image || null;
              const thumb = toAbsolute(raw);
              const fallback = buildFallback(raw);
              return (
                <Link key={p.id} to={`/posts/${p.slug}`} className="flex gap-4 items-start py-3 group border-b border-gray-100 last:border-0">
                  {thumb ? (
                    <div className="flex-shrink-0 w-20 h-14 overflow-hidden rounded">
                      <img
                        src={thumb}
                        alt="thumb"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                                `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='140'><rect width='100%' height='100%' fill='#f3f4f6'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#9ca3af' font-size='12'>No image</text></svg>`
                              );
                          }
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 truncate">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{new Date(p.created_at).toLocaleDateString()}</div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6 rounded-xl shadow-md text-white">
            <h4 className="font-bold text-xl mb-3">Download Our App</h4>
            <p className="text-sm opacity-90 mb-4">Get the mobile app for daily updates (coming soon).</p>
            <button className="bg-white text-indigo-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
              Notify Me
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h4 className="font-bold text-xl mb-4 pb-2 border-b border-gray-200">Categories</h4>
            <div className="space-y-2">
              {['Campus News', 'Student Life', 'Academics', 'Events', 'Sports'].map((category, index) => (
                <div key={index} className="flex justify-between items-center py-1 hover:text-indigo-600 transition-colors duration-300 cursor-pointer">
                  <span>{category}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">24</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}