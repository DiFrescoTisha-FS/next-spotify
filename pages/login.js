import { signIn, signOut, useSession, getProviders} from 'next-auth/react'
import { useEffect } from 'react'


function Login() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn() // Force sign in to hopefully resolve error
    }
  }, [session])

    const handleSignOut = () => signOut({ redirect: false, callbackUrl: '/login' })
    const handleSignIn = () => signIn({ redirect: false, callbackUrl: '/' })


  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img className="w-28 mb-5" src="https://links.papareact.com/9xl" alt="spotify logo" />
        <p className="text-tracking-2 mb-6 text-white">To search for artists, tracks, and songs,<br />you must login to your Spotify account</p>
      {!session && (
        <>

          <button className="bg-[#18d860] text-white p-2 rounded-lg" onClick={handleSignIn}>Sign in with Spotify</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button className="bg-[#18d860] text-white p-2 rounded-lg" onClick={handleSignOut}>Sign out</button>
        </>
      )}

      {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  
  // return (
  //   <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
  //     <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="spotify logo" />
      

  //       <div>
  //         <button className="bg-[#18d860] text-white p-5 rounded-lg"
  //         onClick={() => signIn(provider.id, { callbackUrl: "/" })}
  //         >
  //           Login with {}
  //         </button>
  //         <>
  //       </>
  //       </div>
  // </div>
  );
}

export default Login;

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     }
//   }
// }