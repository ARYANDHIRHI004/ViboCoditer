import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (!user && !account) return false;

      const existingUser = await db.user.findUnique({
        where: { email: user.email! },
      });

      if (!existingUser) {
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name!,
            image: user.image!,

            accounts: {
              // @ts-ignore
              create: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                refreshToken: account.refresh_token,
                accessToken: account.access_token,
                expiresAt: account.expires_at,
                idToken: account.id_token,
                scope: account.scope,
                tokenType: account.token_type,
                sessionState: account.session_state,
              },
            },
          },
        });

        if (!newUser) return false;
      } else {
        const existingAccount = await db.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account.provider,
              providerAccountId: account.providerAccountId,
            },
          },
        });

        if (!existingAccount) {
          await db.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              refreshToken: account.refresh_token,
              accessToken: account.access_token,
              expiresAt: account.expires_at,
              idToken: account.id_token,
              scope: account.scope,
              tokenType: account.token_type,
              sessionState: account.session_state,
            },
          });
        }
      }
      return true;
    },
    async jwt() {},
    async session() {},
  },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  ...authConfig,
});
