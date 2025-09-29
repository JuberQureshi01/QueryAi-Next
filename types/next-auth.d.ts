import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    _id?: string;
  }

  interface JWT {
    _id?: string;
  }
}
