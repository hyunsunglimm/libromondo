import Link from "next/link";
import Image from "next/image";
import HeaderNavbar from "./HeaderNavbar";

export default function Header() {
  return (
    <header className="border-b sticky top-0 bg-white z-20">
      <div className="max-w-[1280px] flex justify-between items-center mx-auto p-8 md:p-4">
        <Link href="/" className="font-bold text-4xl md:text-xl">
          <Image
            src="/images/libro-mondo-logo.png"
            alt="리브로 몬도 로고"
            width={140}
            height={46}
          />
        </Link>
        <HeaderNavbar />
      </div>
    </header>
  );
}
