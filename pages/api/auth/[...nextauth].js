import Prisma from "@/lib/db-Provider";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  adapter: PrismaAdapter(Prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await Prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        if(!user){
          throw new Error("Invalid credentials");
        }

        if(user.password !== credentials?.password){
          throw new Error("Invalid credentials");
        }
    
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);