import { signIn, signOut, useSession } from "next-auth/react";

const Signin = () => {
    const { data: sessionData, status } = useSession();
  
    return (
        <button
          className="rounded bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
    );
  };

export default Signin