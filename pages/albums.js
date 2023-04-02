// import spotifyApi from "~/utils/spotifyApi";
// import { type Account } from "~/utils/types";

// const getAlbums = async (account: Account) => {
//   const api = spotifyApi(account?.access_token);
//   const response = await api
//     .get("browse/new-releases", {
//       searchParams: { country: "US", limit: 50 },
//     })
//     .json();
//   return response;
// };

// export default getAlbums;