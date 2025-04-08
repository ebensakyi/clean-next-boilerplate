import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { type NextAuthOptions } from "next-auth";
import { prisma } from "./db";
import bcrypt from "bcryptjs";  // To hash and compare passwords

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [

        // Custom Credentials Provider for Email/Password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Missing email or password");
                }

                // Fetch user from the database using email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                // If user does not exist or password is incorrect, return null
                if (!user || !user.password) {
                    throw new Error("User not found or invalid password");
                }

                // Check if password matches (assuming you store hashed passwords in your database)
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                // Return user data (this will be attached to the session)
                return {
                    id: user.id,
                    email: user.email,
                    // name: `${user.firstName} ${user.lastName}`,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    pages: {
        signIn: "/auth/login", // Customize the login page if needed
    },
    session: {
        strategy: "jwt",  // Use the database to store session data
    },
    callbacks: {
        async jwt({ token, user }: { token: any; user?: any }) {

            if (user) {
              token.id = user.id;
              token.role = user.role;
            }        

            return token;
          },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },  events: {
        async signOut({ token }: { token: any }) {
          if (token && token.sub) {
            // Log the logout activity
            // await logLogout(token.sub);
          }
        },
      },
};