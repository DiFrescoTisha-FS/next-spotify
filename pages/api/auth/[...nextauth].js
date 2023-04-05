import NextAuth from 'next-auth'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";


const SPOTIFY_AUTHORIZATION_URL =
  'https://accounts.spotify.com/authorize?' +
    new URLSearchParams({
        prompt: 'consent',
        access_type: 'offline',
        response_type: 'code'
  })

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
 async function refreshAccessToken(token) {
  try {

    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("Refreshed token is", refreshedToken);

    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: SPOTIFY_AUTHORIZATION_URL
    })
  ],
  database: process.env.MONGODB_URI,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, account, user }) {

        // initail sign in
        if (account && user) {
            return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000, // we are handling expiry times in milliseconds hence * 1000
                user
            };
        }

        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
            console.log("EXISTING ACCESS TOKEN IS VALID")
            return token;
        }

        // Access token has expired, so we need to refresh it ...
        console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
        return await refreshAccessToken(token)
    },

    async session({ session, token }) {
      session.user = token.user
      session.accessToken = token.accessToken
      session.error = token.error

        return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
    signOut: "/"
  }
})

// import NextAuth from 'next-auth'
// import SpotifyProvider from 'next-auth/providers/spotify'
// import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

// async function refreshAccessToken(token) {

//     try {

//         const url = "https://accounts.spotify.com/api/token?" + new URLSearchParams({
//             clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//             client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//             grant_type: "refresh_token",
//             refresh_token: token.refreshToken,
//         })

//         const response = await fetch(url, {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             method: "POST"
//         })

//         spotifyApi.setAccessToken(token.accessToken);
//         spotifyApi.setRefreshToken(token.refreshToken);

//         const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
//         console.log("REFRESHED TOKEN IS", refreshedToken);

//         return {
//             ...token,
//             accessToken: refreshedToken.access_token,
//             accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1 hour as 3600 returns from spotify API
//             refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
//             // Replace if new one came back else fall back to old refresh token
//         };

//     } catch (error) {
//         console.error(error);

//         return {
//             ...token,
//             error: "RefreshAccessTokenError",
//         };
//     }
// }

// export default NextAuth({
//     providers: [
//       SpotifyProvider({
//         clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//         clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
//       })
//     ],
//     secret: process.env.JWT_SECRET,
//     pages: {
//         signIn: '/login'
//     },
//     callbacks: {
//         async jwt({ token, account, user }) {

//             // initail sign in
//             if (account && user) {
//                 return {
//                     ...token,
//                     accessToken: account.access_token,
//                     refreshToken: account.refresh_token,
//                     username: account.providerAccountId,
//                     accessTokenExpires: account.expires_at * 1000, // we are handling expiry times in milliseconds hence * 1000
//                 };
//             }

//             // Return previous token if the access token has not expired yet
//             if (Date.now() < token.accessTokenExpires) {
//                 console.log("EXISTING ACCESS TOKEN IS VALID")
//                 return token;
//             }

//             // Access token has expired, so we need to refresh it ...
//             console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING...");
//             return await refreshAccessToken(token)
//         },

//         async session({ session, token }) {
//             session.user.accessToken = token.accessToken;
//             session.user.refreshToken = token.refreshToken;
//             session.user.username = token.username;

//             return session;
//       }
//     }
//   })
//     const url =
//       "https://accounts.spotify.com/api/token?" +
//       new URLSearchParams({
//         client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
//         client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//         grant_type: "refresh_token",
//         refresh_token: token.refreshToken,
//       });

//     const response = await fetch(url, {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       method: "POST",
//     });

//     const refreshedTokens = await response.json();

//     if (!response.ok) {
//       throw refreshedTokens;
//     }

//     return {
//       ...token,
//       accessToken: refreshedTokens.access_token,
//       accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//       refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export default NextAuth({
//   providers: [ 

//     SpotifyProvider({
//       clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//       authorization:
//         "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,user-read-email,streaming,user-read-private,user-library-read,user-library-modify,user-read-playback-state,user-modify-playback-state,user-read-recently-played,user-follow-read",
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user, account }) {
//       // Initial sign in
//       if (account && user) {
//         return {
//           accessToken: account.access_token,
//           accessTokenExpires: Date.now() + account.expires_in * 1000,
//           refreshToken: account.refresh_token,
//           user,
//         };
//       }

//       // Return previous token if the access token has not expired yet
//       if (Date.now() < token.accessTokenExpires) {
//         return token;
//       }

//       // Access token has expired, try to update it
//       return refreshAccessToken(token);
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       session.accessToken = token.accessToken;
//       session.error = token.error;

//       return session;
//     },
//   },
// });

// import NextAuth from "next-auth";
// import SpotifyProvider from "next-auth/providers/spotify";
// import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";
// // import Error from "../../../components/dashboard/error"

// async function refreshAccessToken(token) {
//   try {
//     spotifyApi.setAccessToken(token.accessToken);
//     spotifyApi.setRefreshToken(token.refreshToken);

//     const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
//     console.log("Refreshed token is", refreshedToken);

//     return {
//       ...token,
//       accessToken: refreshedToken.access_token,
//       accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
//       refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
//     };
//   } catch (error) {
//     console.log(error);

//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }

// export default NextAuth({
//     secret: process.env.NEXTAUTH_SECRET,
//   // Configure one or more authentication providers
//   providers: [
//     SpotifyProvider({
//       clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//       clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//       authorization: LOGIN_URL,
//     }),
//     // ...add more providers here
//   ],
//   secret: process.env.JWT_SECRET,
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async jwt({ token, account, user }) {
//       //initial Signin
//       if (account && user) {
//         return {
//         //   ...token,
//           accessToken: account.access_token,
//           refreshToken: account.refresh_token,
//           username: account.providerAccountId,
//           accessTokenExpires: account.expires_at * 1000,
//           user
//         };
//       }

//       //Return previous token if the access token has not expired
//       if (Date.now() < token.accessTokenExpires) {
//         console.log("Existing Access Token is valid");
//         return token;
//       }

//       //Access token expired, time to refresh it
//       console.log("Existing Access Token has expired, Refreshing...");
//       return await refreshAccessToken(token);
//     },

//     async session({ session, token }) {
//       session.user.accessToken = token.accessToken;
//       session.user.refreshToken = token.refreshToken;
//       session.user.username = token.username;

//       return session;
//     },
//   },
// });