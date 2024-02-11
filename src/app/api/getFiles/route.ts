// src/app/api/getFiles/route.ts
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import type { NextApiRequest, NextApiResponse } from "next";
import type { NextRequest } from "next/server";

const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  region: process.env.AWS_REGION || "us-east-1",
});

interface ApiResponse {
  files: string[];
  error?: string;
  message?: string;
}

export async function GET(
  req: NextApiRequest | Request | NextRequest,
  res: NextApiResponse<ApiResponse>
) {
  const params = {
    Bucket: "internetisgreat",
  };

  try {
    const command = new ListObjectsV2Command(params);
    const { Contents } = await s3Client.send(command);
    const files = Contents?.map((file) => file.Key ?? "").filter(Boolean) || [];

    console.log(files);
    console.log(res);
    console.log(typeof res.status);
    return Response.json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al listar los archivos del bucket",
      message: error.message,
      stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
  }
}
