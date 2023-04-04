import Search from "./Search";
import Signin from "./Signin";
import SpotifyIcon from "./SpotifyIcon";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClear,
}) {
  return (
    <div className="relative flex items-center justify-between bg-[#152c1e] py-2 px-4">
      <SpotifyIcon />
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleClear={handleClear}
      />
      <Signin />
    </div>
  );
}



// import Link from 'next/link'
// import { signIn, signOut, useSession } from 'next-auth/react'


// function Navbar() {
//   const {session, loading} = useSession()
//   return (
//     <nav className='header'>
//       <h1 className='logo'>
//         <a href='#'>NextAuth</a>
//       </h1>
//       <ul className={`main-nav ${!session && loading ? 'loading' : 'loaded'}`}>
//         <li>
//           <Link href='/'>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link href='/dashboard'>
//             Dashboard
//           </Link>
//         </li>
//         <li>
//           <Link href='/blog'>
//             Blog
//           </Link>
//         </li>

//         {!loading && !session && (
//           <li>
//             <Link href='/api/auth/signin'>
//               <button
//                 onClick={e => {
//                   e.preventDefault()
//                   signIn('spotify')
//                 }}>
//                 Sign In
//               </button>
//             </Link>
//           </li>
//         )}
//         {session && (
//           <li>
//             <Link href='/api/auth/signout'>
//               <button
//                 onClick={e => {
//                   e.preventDefault()
//                   signOut()
//                 }}>
//                 Sign Out
//               </button>
//             </Link>
//           </li>
//         )}
//       </ul>
//     </nav>
//   )
// }

// export default Navbar