// import ImageKit from "imagekit";
// import type { NextPage } from "next";
// import type { GetStaticProps } from "next";

// interface File {
//   fileId: string;
//   name: string;
//   url: string;
// }
// interface ListFilesProps {
//   files: File[];
// }

// export const getStaticProps: GetStaticProps<ListFilesProps> = async () => {
//   console.log(process.env);

//   const imagekit = new ImageKit({
//     publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//     privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//     urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
//   });
//   console.log(process.env);

//   try {
//     const response = await imagekit.listFiles({
//       type: "file",
//     });
//     console.log(response);
//     const files: File[] = response.map((file) => ({
//       fileId: file.fileId,
//       name: file.name,
//       url: imagekit.url({ path: file.filePath }),
//     }));

//     return { props: { files }, revalidate: 60 }; // revalidate every 60 seconds
//   } catch (error) {
//     console.error("ImageKit error:", error);
//     return { props: { files: [] } };
//   }
// };

// const ListFilesPage: NextPage<ListFilesProps> = ({ files }) => {
//   if (!files || !files.length) {
//     return <p>No files found.</p>;
//   }

//   return (
//     <ul>
//       {files.map((file) => (
//         <li key={file.fileId}>
//           <a href={file.url} target="_blank" rel="noopener noreferrer">
//             {file.name}
//           </a>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ListFilesPage;
