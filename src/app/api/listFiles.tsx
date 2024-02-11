// // pages/api/listFiles.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import ImageKit from "imagekit";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   const imagekit = new ImageKit({
//     publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//     urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
//   });

//   imagekit.listFiles(
//     {
//       path: "Internet is great",
//       fileType: "all", // O "image" si solo quieres imágenes, "video" para videos
//     },
//     function (error, result) {
//       if (error) {
//         return res.status(500).json({ error });
//       } else {
//         return res.status(200).json(result);
//       }
//     }
//   );
// }
