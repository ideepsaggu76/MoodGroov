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
const PRODUCTION_URL = process.env.NEXTAUTH_URL || 'https://moodgroov-f0785e407312.herokuapp.com'
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

// Override the provider's authorization and token endpoints
spotifyProvider.authorization = {
  url: "https://accounts.spotify.com/authorize",
  params: {
    scope: scopes,
    redirect_uri: "https://moodgroov-f0785e407312.herokuapp.com/api/auth/callback/spotify"
  }
}

const handler = NextAuth({
  providers: [spotifyProvider],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
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
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedToken;
      const extendedSession = session as ExtendedSession;
      
      if (extendedToken.accessToken) extendedSession.user.accessToken = extendedToken.accessToken;
      if (extendedToken.refreshToken) extendedSession.user.refreshToken = extendedToken.refreshToken;
      if (extendedToken.id) extendedSession.user.id = extendedToken.id;
      
      return extendedSession;
    },
    async redirect({ url, baseUrl }) {
      // Ensure all redirects go to the production URL
      const productionUrl = PRODUCTION_URL;
      
      // After sign in, always redirect to dashboard
      if (url.startsWith('/api/auth/signin')) {
        return `${productionUrl}/dashboard`;
      }
      
      // Handle callback URLs
      if (url.includes('/api/auth/callback')) {
        return `${productionUrl}/dashboard`;
      }
      
      // Handle relative URLs
      if (url.startsWith('/')) {
        return `${productionUrl}${url}`;
      }
      
      // Default to dashboard
      return `${productionUrl}/dashboard`;
    }
  }
})

export { handler as GET, handler as POST }