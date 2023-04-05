import { spotifyApi } from '../lib/spotify';
import Nav2 from '../components/Nav2';

export default function Home({ user }) {
  return (
    <div>
      <Nav2 />
      <h1>Welcome, {user.display_name}!</h1>
      <p>Your email address: {user.email}</p>
      <p>Your Spotify URI: {user.uri}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { accessToken } = context.req.cookies;

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  spotifyApi.setAccessToken(accessToken);

  const user = await spotifyApi.getMe();

  return {
    props: {
      user,
    },
  };
}

// import { getProviders, signIn } from "next-auth/react";

// function Login({ providers }) {
//   return (
//     <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
//       <img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt="spotify logo" />
      
//       {Object.values(providers).map((provider) => (
//         <div key={provider.name}>
//           <button className="bg-[#18d860] text-white p-5 rounded-lg"
//           onClick={() => signIn(provider.id, { callbackUrl: "/" })}
//           >
//             Login with {provider.name}
//           </button>
//         </div>
//       ))}
//   </div>
//   );
// }

// export default Login;

// export async function getServerSideProps() {
//   const providers = await getProviders();

//   return {
//     props: {
//       providers,
//     }
//   }
// }