import NextAuth, { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/db';

const authOptions: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      if (!profile) {
        return false;
      } 
    
      const userExists = await db.user.findFirst({
        where: {
          email: (profile?.email) as unknown as string,
        },
      });

      if (!userExists) {
        await db.user.create({
          data: {
            username: (profile?.name) as unknown as string,
            image: profile?.picture,
            email: (profile?.email) as unknown as string,
          },
        });
      }
    
      return true;
    },
    async session({ session }) {
      const user = await db.user.findFirst({
        where: {
          email: session?.user?.email
        },
      });
    
      if (user) {
        session.user.id = user.id;
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth
    },
  },
};

export const { handlers, auth } = NextAuth(authOptions);
