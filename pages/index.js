// import { useSession, signIn, signOut } from 'next-auth/react';

// export default function Home() {
//   const { data: session, loading } = useSession()

//     const handleSignOut = () => signOut({ redirect: false, callbackUrl: '/login' })
  
//   return (
//     <>
//     <main>
//       {/* <h1>
//         {session ? `${session.user.name},` : ''}Welcome to{' '}
//       </h1> */}
//     </main>

//     <div>
//       {session ? (
//         <>
//           <button onClick={handleSignOut}>
//             Sign out
//           </button>
//         </>
//       ) : (
//           <>
//             <button onClick={signIn}>
//               Sign in
//             </button>
//         </>
//       )}
//     </div>
//     </>
//   )
// }

// import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import Center from '../components/center'
export default function Home() {
  return (
    <div className="bg-black h-screen overfolw-hidden">
        <main className="flex">
        <Sidebar />
          {/* <Nav /> */}
          <Center />
        </main>


      <div>
        {/* Player */}
      </div>
      </div>
  )
}


