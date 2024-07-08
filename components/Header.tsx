"use client";

import useMe from "@/hooks/useMe";
import Link from "next/link";

export default function Header() {
  const { loginUser } = useMe();

  return (
    <header className="border-b sticky top-0 backdrop-blur-sm">
      <div className="max-w-[1280px] flex justify-between items-center mx-auto p-4">
        <Link href="/">Libro Mondo</Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link href="/search">도서검색</Link>
            </li>
            {loginUser ? (
              <li>
                <button>로그아웃</button>
              </li>
            ) : (
              <li>
                <Link href="/login">로그인</Link>
              </li>
            )}
            {loginUser && (
              <li>
                <Link href={`/mypage/${loginUser.id}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loginUser?.image}
                    alt={`${loginUser?.name}님의 프로필 이미지`}
                    className="w-8 h-8 border border-black rounded-full object-cover"
                  />
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
