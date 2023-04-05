import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { setAccessToken } from '../lib/spotify';

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce((acc, item) => {
        const [key, value] = item.split('=');
        acc[key] = value;
        return acc;
      }, {});

    if (hash.access_token) {
      setAccessToken(hash.access_token);
      router.push('/');
    }
  }, [router]);

  return <div>Logging you in...</div>;
};

export default Callback;