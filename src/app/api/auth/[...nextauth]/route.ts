import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { JWT } from 'next-auth/jwt'
import { Session } from 'next-auth'

interface ExtendedToken extends JWT {
  accessToken?: string
  refreshToken?: string
  expiresAt?: number
  id?: string
}

interface ExtendedSession extends Session {
  user: {
    accessToken?: string
    refreshToken?: string
    id?: string
  } & Session['user']
}

interface SpotifyProfile {
  id: string
  display_name: string
  email: string
  images: Array<{ url: string }>
}

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-library-modify',
  'user-top-read',
  'playlist-read-private',
  'playlist-modify-public',
  'playlist-modify-private',
  'user-library-read',
  'user-top-read',
].join(' ')

const handler = NextAuth({
  providers: [
    SpotifyProvider({      clientId: "4104abbe70b0447aa14b2172e92b6db3",
      clientSecret: "a801bea7319145b9a57b6211c3f323db",
      authorization: {
        params: { scope: scopes }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at! * 1000
        token.id = (profile as SpotifyProfile).id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string
        session.user.refreshToken = token.refreshToken as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  pages: {
    signIn: '/'
  }
})

export { handler as GET, handler as POST } 