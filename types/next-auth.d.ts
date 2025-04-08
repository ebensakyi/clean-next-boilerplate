// types/next-auth.d.ts
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string | null;
    } & DefaultSession["user"];
  }
  
  interface User {
    id: string;
    role?: string | null;
    password?: string | null;
    email?: string | null;
  }
}