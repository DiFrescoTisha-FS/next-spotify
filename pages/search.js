// import { getServerSession } from "next-auth";
// import { authOptions } from "~/server/auth";
// import { prisma } from "~/server/db";
// import spotifyApi from "~/utils/spotifyApi";
// import { type Account } from "~/utils/types";

// export default async function handler(req, res) {
//   const { q: search_term } = req.query;
//   const session = await getServerSession(req, res, authOptions);

//   const getAlbums = async (session, search_term: string) => {
//     const account = await prisma.account.findFirst({
//       where: {
//         userId: session.user.id,
//       },
//     });

//     const api = spotifyApi(account?.access_token);
//     const response = await api
//       .get("search", {
//         searchParams: {
//           country: "US",
//           limit: 50,
//           q: search_term,
//           type: "album,artist,track",
//         },
//       })
//       .json();
//     return response;
//   };

//   getAlbums(session, search_term)
//     .then((data) => {
//       res.status(200).json({ ...data, ok: true });
//     })
//     .catch((err) => {
//       res.status(500).json({ error: err.message, ok: false });
//     });
// }