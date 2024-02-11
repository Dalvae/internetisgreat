// import type { NextApiRequest, NextApiResponse } from "next";
// import ImageKit from "imagekit";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const imagekit = new ImageKit({
//     publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//     urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
//   });
//   try {
//     const response = await imagekit.listFiles({
//       path: "Internet is great",
//       fileType: "all", // Modify for images or videos
//     });

//     res.status(200).json(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch files" });
//   }
// }
