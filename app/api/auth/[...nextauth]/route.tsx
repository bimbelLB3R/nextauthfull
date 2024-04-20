import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import * as bycript from 'bcrypt';
import NextAuth from 'next-auth/next';
import { User } from '@prisma/client';

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/signin',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'your email',
        },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'your passpord here',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (!user) throw new Error('Username or password is not correct');
        // const isPasswordCorrect = credentials?.password === user.password;
        if (!credentials?.password)
          throw new Error('Please provide your password');
        const isPasswordCorrect = await bycript.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordCorrect)
          throw new Error('Username or password is not correct');
        const { password, ...userWithOutPass } = user;
        return userWithOutPass;
      },
    }),
  ],
  // mengatasi undefine pada firsname lastname
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },
    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
