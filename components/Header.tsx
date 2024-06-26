import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b sticky top-0 backdrop-blur-sm">
      <div className="max-w-[1280px] flex justify-between mx-auto py-4">
        <Link href="/">북적북적</Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/search">도서검색</Link>
            </li>
            <li>
              <Link href="/mypage/userid">마이페이지</Link>
            </li>
            <li>
              <Link href="/login">로그인</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
