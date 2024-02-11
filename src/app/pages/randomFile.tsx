// pages/randomfile.tsx
"use client";

import RandomFileComponent from "../components/RandomFileComponent";
import React from "react";
import { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";

interface RandomFilePageProps {
  files: string[];
}
// const s3Client = new S3Client({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
//   },
//   region: process.env.AWS_REGION || "us-east-1",
// });

function RandomFilePage() {
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getFiles"); // Ajusta la ruta si es necesario
        const data = await response.json();
        setFiles(data.files);
        setIsLoading(false);

        // Elige un archivo aleatorio después de obtener los archivos
        if (data.files.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.files.length);
          setSelectedFile(data.files[randomIndex]);
        }
      } catch (error) {
        console.error("Error al obtener los archivos:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleSelectFile = (newFile: string) => {
    setSelectedFile(newFile);
  };
  return (
    <div>
      {isLoading ? (
        <PacmanLoader className="my-20" color="#ffffff" size={30}>
          <span className="visually-hidden">Cargando...</span>
        </PacmanLoader>
      ) : (
        <RandomFileComponent
          files={files}
          selectedFile={selectedFile}
          onSelectFile={handleSelectFile}
        />
      )}
    </div>
  );
}

export default RandomFilePage;
