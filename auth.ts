import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import { addUser } from "./service/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Kakao],
  callbacks: {
    signIn: async ({ account, user, profile }) => {
      let userId = null;

      if (account?.provider === "google") {
        if (!profile || !profile.sub || !user.name) return false;
        userId = profile.sub;
        addUser(userId, user.name, user.image || "");
      }

      if (account?.provider === "kakao") {
        if (!profile || !profile.id || !user.name) return false;
        userId = profile.id.toString();
        addUser(userId, user.name, user.image || "");
      }

      if (userId) {
        user.id = userId;
      }

      return true;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub || "";
      return session;
    },
  },
});
