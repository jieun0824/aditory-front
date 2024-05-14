import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';

async function refreshAccessToken(token) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/refresh`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + 60 * 30 * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          console.log('credentials' + credentials);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ ...credentials }),
            }
          );
          console.log(res);

          if (!res.ok) {
            throw new Error('Failed to login');
          }
          const user = await res.json();
          console.log(user);
          // const session = useSession();
          // console.log(session);
          return user;
        } catch (error) {
          console.error('로그인 에러', error);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // if (user) {
      //   (token.accessToken = user.accessToken),
      //     (token.refreshToken = user.refreshToken),
      //     (token.accessTokenExpires = Date.now() + 60 * 30 * 1000);
      // }
      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }
      // return await refreshAccessToken(token);
      return { ...token, ...user };
    },
    session: async ({ session, token, user }) => {
      // return {
      //   ...session,
      //   user: {
      //     ...session.user,
      //     id: user.id,
      //   },
      // };
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/signup/2',
  },
});

export { handler as GET, handler as POST };
