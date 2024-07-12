"use client";

import useMe from "@/hooks/useMe";
import { signOut } from "next-auth/react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";

export default function Header() {
  const { loginUser } = useMe();

  return (
    <header className="border-b sticky top-0 backdrop-blur-sm">
      <div className="max-w-[1280px] flex justify-between items-center mx-auto p-4">
        <Link href="/">Libro Mondo</Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link href="/search-user">사용자 검색</Link>
            </li>
            <li>
              <Link href="/search-book">도서검색</Link>
            </li>
            {loginUser ? (
              <li>
                <button onClick={() => signOut()}>로그아웃</button>
              </li>
            ) : (
              <li>
                <Link href="/login">로그인</Link>
              </li>
            )}
            {loginUser && (
              <li>
                <Link href={`/mypage/${loginUser.id}`}>
                  <ProfileImage
                    image={loginUser.image}
                    name={loginUser.name}
                    size="sm"
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
