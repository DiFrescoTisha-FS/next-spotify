// lib/spotify.js

export const topTracks = async () => {
    const { access_token } = await getAccessToken();
  
    return fetch("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  };