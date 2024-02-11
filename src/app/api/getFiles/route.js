// /src/app/api/getFiles/route.js
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

// Configura el cliente de S3 con las variables de entorno
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
});

export async function GET() {
  const params = {
    Bucket: "internetisgreat", // Tu nombre de bucket
  };

  try {
    // Usa el comando ListObjectsV2 con el cliente s3
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
    console.log(data); // Corregido el typo de console.logd a console.log
    const files = data.Contents.map((content) => content.Key);
    console.log(files);
    return new Response(JSON.stringify({ files }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
