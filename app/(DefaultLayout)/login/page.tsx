import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <section>
      <h3>로그인 페이지입니다.</h3>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button>Signin with Google</button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("kakao");
        }}
      >
        <button>Signin with Kakao</button>
      </form>
    </section>
  );
}
