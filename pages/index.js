
 

// import Nav from '../components/Nav'
// import Login from "./login"
// import Signin from "../components/Signin"
// import Login from "./login"
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

import Sidebar from "../components/Sidebar"

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <div className="bg-black h-screen overfolw-hidden">
        <main className="">
        {/* <Signin /> */}
        <Sidebar />
        {/* <Login /> */}
          {/* <Nav /> */}

        </main>


      <div>
        {/* Player */}
      </div>
      </div>
  )
}

// import { signIn, signOut, useSession } from 'next-auth/react'
// import Head from 'next/head'
// import { useEffect } from 'react'
// import Login from './login'
// import Center from '../components/Center'

// export default function Home() {
//   const { data: session } = useSession()

//   useEffect(() => {
//     if (session?.error === 'RefreshAccessTokenError') {
//       signIn() // Force sign in to hopefully resolve error
//     }
//   }, [session])

//   return (
//     <div>
//       <Head>
//         <title>Next-Auth Refresh Tokens</title>
//       </Head>
//       <Login />
//       <Center />

//       {!session && (
//         <>
//           Not signed in <br />
//           <button onClick={signIn}>Sign in</button>
//         </>
//       )}
//       {session && (
//         <>
//           Signed in as {session.user.email} <br />
//           <button onClick={signOut}>Sign out</button>
//         </>
//       )}

//       {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
//     </div>
//   )
// }