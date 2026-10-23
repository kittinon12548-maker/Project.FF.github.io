"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Newspaper, Search } from "lucide-react";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      {/* Top Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-[#8a5b14] transition mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้าแรก
        </Link>
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-[#8a5b14] mb-2 border border-amber-200/80">
          <Newspaper className="w-3.5 h-3.5" />
          <span>All Blog Posts</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          📝 บทความทั้งหมด ({posts.length})
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          คลิกอ่านรายละเอียดบทความ และร่วมแสดงความคิดเห็นได้เลย
        </p>
      </div>

      {/* Search Input */}
      <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex items-center gap-3">
        <Search className="w-4 h-4 text-neutral-400 pl-1" />
        <input
          type="text"
          placeholder="ค้นหาหัวข้อหรือเนื้อหาบทความ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm font-medium text-neutral-800 placeholder-neutral-400 outline-none bg-transparent"
        />
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className="p-6 bg-white rounded-2xl border border-neutral-200 animate-pulse space-y-3"
            >
              <div className="h-4 w-20 bg-neutral-200 rounded"></div>
              <div className="h-6 w-3/4 bg-neutral-300 rounded"></div>
              <div className="h-4 w-5/6 bg-neutral-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-neutral-200">
          <p className="text-neutral-500 text-sm">ไม่พบบทความที่ตรงกับการค้นหา</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group p-6 bg-white rounded-2xl border border-neutral-200/80 shadow-xs hover:border-[#c29015] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#8a5b14] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                    บทความ #{post.id}
                  </span>
                </div>
                <Link href={`/posts/${post.id}`} className="block">
                  <h2 className="text-lg sm:text-xl font-extrabold text-neutral-900 group-hover:text-[#8a5b14] transition-colors mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2 whitespace-pre-line">
                  {post.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  href={`/posts/${post.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8a5b14] hover:text-[#5c3c0a] transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> อ่านเนื้อหาเต็ม &amp; แสดงความคิดเห็น →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
