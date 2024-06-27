import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { addUser } from "./app/(DefaultLayout)/login/service/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    signIn: async ({ account, user, profile }) => {
      if (account?.provider === "google") {
        if (!profile) return false;
        if (!profile.sub || !user.name) return false;
        const userId = profile.sub;
        addUser(userId, user.name, user.image || "");
      }

      if (account?.provider === "kakao") {
        if (!profile) return false;
        if (!profile.id || !user.name) return false;
        const userId = profile.id.toString();
        addUser(userId, user.name, user.image || "");
      }
      return true;
    },
  },
});
