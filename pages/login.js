import React from 'react';
import { useRouter } from 'next/router';
import {SpotifyAuth, Scopes} from 'react-spotify-auth';
import { spotifyApi, setAccessToken } from '../lib/spotify';

const Login = () => {
  const router = useRouter();

  function onSuccess(token) {
    setAccessToken(token);
    router.push('/');
  }

  function onFailure(error) {
    console.error(error);
  }

  return (
    <div>
      <SpotifyAuth
        redirectUri="http://localhost:3000/callback"
        clientID={process.env.NEXT_PUBLIC_CLIENT_ID}
        scopes={['user-read-email', 'user-library-read']}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
};

export default Login;