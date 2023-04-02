// import spotifyApi from "~/utils/spotifyApi";
// import { type Account } from "~/utils/types";

// const getGenres = async (account: Account) => {
//   const api = spotifyApi(account?.access_token);
//   const response = await api
//     .get("recommendations/available-genre-seeds", {
//       searchParams: { country: "US", limit: 50 },
//     })
//     .json();
//   return response;
// };

// export default getGenres;