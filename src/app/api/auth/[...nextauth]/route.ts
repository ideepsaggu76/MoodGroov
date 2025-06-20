import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

interface SpotifyProfile {
  id: string;
}

interface ExtendedToken {
  accessToken?: string;
  refreshToken?: string;
  id?: string;
  expiresAt?: number;
}

interface ExtendedSession {
  user: {
    accessToken?: string;
    refreshToken?: string;
    id?: string;
  } & {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  expires: string;
}

// Always use the production URL, regardless of environment
const PRODUCTION_URL = process.env.NEXTAUTH_URL || 'https://moodgroov-7ff0d88d9dcc.herokuapp.com'
const CALLBACK_URL = `${PRODUCTION_URL}/api/auth/callback/spotify`

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'playlist-read-private'
].join(' ')

const spotifyProvider = SpotifyProvider({
  clientId: "4104abbe70b0447aa14b2172e92b6db3",
  clientSecret: "a801bea7319145b9a57b6211c3f323db",
  authorization: `https://accounts.spotify.com/authorize?scope=${encodeURIComponent(scopes)}`
})

const handler = NextAuth({
  providers: [spotifyProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  debug: true, // Enable debug mode
  callbacks: {    async signIn({ user, account, profile }) {
      console.log('SignIn callback triggered', { user, account, profile });
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          id: (profile as SpotifyProfile).id,
          expiresAt: (account.expires_at as number) * 1000,
        }
      }
      return token;
    },    async session({ session, token }) {
      const extendedToken = token as ExtendedToken;
      const extendedSession = session as ExtendedSession;
      
      if (extendedToken.accessToken) extendedSession.user.accessToken = extendedToken.accessToken;
      if (extendedToken.refreshToken) extendedSession.user.refreshToken = extendedToken.refreshToken;
      if (extendedToken.id) extendedSession.user.id = extendedToken.id;
        return extendedSession;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback:', { url, baseUrl });
      // If it's a callback, redirect to dashboard
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/dashboard`;
      }
      // If URL starts with /, make it absolute
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      }
      // If same origin, allow it
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      // Default to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
});

export { handler as GET, handler as POST }