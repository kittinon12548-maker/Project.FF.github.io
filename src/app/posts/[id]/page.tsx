"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Heart, MessageSquare, Send, User } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // New comment form state
  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadPostData() {
      try {
        setIsLoading(true);
        // Fetch Post
        const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (postRes.ok) {
          const postData = await postRes.json();
          setPost(postData);
        }

        // Fetch Comments
        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (err) {
        console.error("Failed to load post detail:", err);
      } finally {
        setIsLoading(false);
      }
    }

    if (postId) {
      loadPostData();
    }
  }, [postId]);

  const handleLike = () => {
    if (isLiked) {
      setLikes((prev) => Math.max(0, prev - 1));
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentBody.trim()) return;

    setIsSubmitting(true);
    const newComment: Comment = {
      id: Date.now(),
      name: commentName.trim(),
      email: "user@example.com",
      body: commentBody.trim(),
    };

    setTimeout(() => {
      setComments((prev) => [newComment, ...prev]);
      setCommentName("");
      setCommentBody("");
      setIsSubmitting(false);
    }, 400);
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
        <div className="h-6 w-32 bg-slate-200 rounded animate-pulse"></div>
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <div className="h-4 w-24 bg-slate-200 rounded animate-pulse"></div>
          <div className="h-8 w-3/4 bg-slate-300 rounded animate-pulse"></div>
          <div className="h-24 bg-slate-100 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">ไม่พบบทความที่ต้องการ</h2>
        <Link
          href="/posts"
          className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 font-bold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> กลับสู่หน้ารวมบทความ
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <Link
        href="/posts"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> กลับไปยังบทความทั้งหมด
      </Link>

      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <span className="inline-block bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1 rounded-full mb-3 border border-blue-100">
            บทความ #{post.id}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {post.title}
          </h1>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {post.body}
        </div>

        {/* Like Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            ชอบบทความนี้ไหม?
          </span>
          <button
            type="button"
            onClick={handleLike}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isLiked
                ? "bg-rose-50 text-rose-600 border border-rose-200 shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`}
            />
            <span>{likes} Likes</span>
          </button>
        </div>

        {/* Comments Section */}
        <div className="space-y-6 pt-6 border-t border-slate-200/80">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <span>ความคิดเห็น</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                {comments.length}
              </span>
            </h3>
          </div>

          {/* Comment Form */}
          <form
            onSubmit={handleSubmitComment}
            className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4"
          >
            <h4 className="text-sm font-bold text-slate-800">
              แสดงความคิดเห็นของคุณ
            </h4>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ชื่อผู้แสดงความคิดเห็น
              </label>
              <input
                type="text"
                placeholder="ระบุชื่อของคุณ"
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                required
                className="w-full p-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ข้อความความคิดเห็น
              </label>
              <textarea
                rows={3}
                placeholder="ร่วมแชร์ความคิดเห็นเกี่ยวกับบทความนี้..."
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                required
                className="w-full p-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-md shadow-blue-500/20 disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? "กำลังส่ง..." : "ส่งความคิดเห็น"}</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {comments.map((comm) => (
              <div
                key={comm.id}
                className="p-4 bg-white rounded-xl border border-slate-200/80 space-y-1.5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {comm.name}
                  </span>
                  {comm.email && (
                    <span className="text-[11px] text-slate-400">
                      ({comm.email})
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-8">
                  {comm.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
