import Link from "next/link";
import GithubIcon from "./icons/GithubIcon";

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="max-w-[1280px] p-4 mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <p>
              <span className="font-bold text-xl">리브로 몬도</span>에서는
              평소에 몰랐던 책들을 발견할 수 있습니다.
            </p>
            <p>(6.26 ~ 7.16)</p>
          </div>
          <Link
            href="https://github.com/hyunsunglimm/libromondo"
            target="_blank"
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
}
