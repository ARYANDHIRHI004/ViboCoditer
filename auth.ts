import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Providers from "./auth.config"
import authConfig from "./auth.config";
import { db } from "@/lib/db";
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks:{
    async signIn({user, account}){
      if(!user && !account) return false
      
      const existingUser = await db.user.findUnique({
        where: {email:user.email!}
      })
      if(!existingUser){
        
      }
    }
    async jwt(){}
    async session(){}
  },
  secret:process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig
});
