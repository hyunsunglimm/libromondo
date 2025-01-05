"use client";

import ReviewListIcon from "../icons/ReviewListIcon";
import SearchIcon from "../icons/SearchIcon";
import ProfileImage from "../ProfileImage";
import { signOut } from "next-auth/react";
import { useMe } from "@/hooks/useMe";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function HeaderNavbar() {
  const { data: loginUser, isPending } = useMe();
  const pathname = usePathname();

  if (isPending) return null;

  return (
    <nav>
      <ul className="flex gap-8 md:gap-4 items-center">
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
              className="font-bold w-32 h-16 md:h-12 text-3xl md:w-20 md:text-base"
            >
              로그아웃
            </Button>
          </li>
        )}
        {!loginUser && (
          <li>
            <Button
              asChild
              className="font-bold w-32 h-16 md:h-12 text-3xl md:w-20 md:text-base"
            >
              <Link href={`/login?callbackUrl=${pathname}`}>로그인</Link>
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}
