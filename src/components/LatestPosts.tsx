import React from "react";
import Link from "next/link";

interface PostItem {
  id: number;
  title: string;
  body: string;
}

const DEFAULT_POSTS: PostItem[] = [
  {
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

export default function LatestPosts() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1 w-8 rounded-full bg-gradient-to-r from-[#8a5b14] via-[#c29015] to-[#f3d07a]"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8a5b14]">
              Blog
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 md:text-3xl">
            บทความล่าสุด
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            เรื่องราวและบทความที่น่าสนใจ
          </p>
        </div>
        <Link
          href="/posts"
          className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-[#8a5b14] hover:text-[#5c3c0a] transition hover:bg-amber-50 sm:block"
        >
          ดูทั้งหมด →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {DEFAULT_POSTS.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#c29015] hover:shadow-xl hover:shadow-black/5 flex flex-col justify-between"
          >
            <div>
              <div className="mb-5 flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 font-extrabold text-[#f3d07a] transition group-hover:bg-[#8a5b14] group-hover:text-white shadow-xs">
                  {post.id}
                </div>
                <span className="text-xl text-neutral-300 transition group-hover:translate-x-1 group-hover:text-[#c29015]">
                  →
                </span>
              </div>
              <h3 className="mb-3 line-clamp-2 text-base font-bold leading-relaxed text-neutral-900 transition-colors group-hover:text-[#8a5b14]">
                {post.title}
              </h3>
              <p className="line-clamp-3 text-sm leading-relaxed text-neutral-500 whitespace-pre-line">
                {post.body}
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
              <span className="text-xs text-neutral-400">บทความ #{post.id}</span>
              <span className="text-xs font-bold text-[#8a5b14] group-hover:text-[#c29015]">
                อ่านต่อ →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
