import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import db from './db';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60
  },
  pages: {
    signIn: '/sign-in'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role;
      }
      if (
        trigger === 'update' &&
        session?.role &&
        session?.role !== 'ADMIN' &&
        user?.role !== 'TEACHER'
      ) {
        token.role = session.role;
        const updateUser = await db.user.update({
          where: {
            id: token.id,
            NOT: {
              role: 'ADMIN'
            }
          },
          data: {
            role: session.role
          }
        });

        console.log(updateUser);
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
    redirect() {
      return '/';
    }
  }
};

export const getAuthSession = () => getServerSession(authOptions);
