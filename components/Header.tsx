"use client";

import useMe from "@/hooks/useMe";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import ProfileImage from "./ProfileImage";
import CircularSkeleton from "./skeleton/CircularSkeleton";
import SearchIcon from "./icons/SearchIcon";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import ReviewListIcon from "./icons/ReviewListIcon";

export default function Header() {
  const { data: session } = useSession();
  const { loginUser, isLoading } = useMe();
  const pathname = usePathname();

  return (
    <header className="border-b sticky top-0 bg-white z-20">
      <div className="max-w-[1280px] flex justify-between items-center mx-auto p-8 md:p-4">
        <Link href="/" className="font-bold text-4xl md:text-xl">
          <Image
            src="/images/libro-mondo-logo.png"
            alt="리브로 몬도 로고"
            width={140}
            height={140}
          />
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            <li>
              <Link href="/reviews">
                <ReviewListIcon />
              </Link>
            </li>
            <li>
              <Link href="/search">
                <SearchIcon />
              </Link>
            </li>
            {session && isLoading && <CircularSkeleton size="sm" />}
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
            {loginUser && (
              <li>
                <Button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-3xl md:text-base"
                >
                  로그아웃
                </Button>
              </li>
            )}
            {!loginUser && !isLoading && (
              <li>
                <Button asChild>
                  <Link
                    href={`/login?callbackUrl=${pathname}`}
                    className="text-3xl md:text-base"
                  >
                    로그인
                  </Link>
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
