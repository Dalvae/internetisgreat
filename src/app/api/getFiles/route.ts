// src/app/api/getFiles/route.ts
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION || "us-east-1",
});

export async function GET(req: NextRequest) {
  // Verificar el método HTTP
  if (req.method !== "GET") {
    return new NextResponse(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const params = {
    Bucket: "internetisgreat",
  };

  try {
    const command = new ListObjectsV2Command(params);
    const { Contents } = await s3Client.send(command);
    const files = Contents?.map((file) => file.Key ?? "").filter(Boolean) || [];
    console.log(files);
    return new NextResponse(JSON.stringify({ files }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error: "Error al listar los archivos del bucket",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
