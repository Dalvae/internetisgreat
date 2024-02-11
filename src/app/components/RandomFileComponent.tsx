import React, { useState, useEffect } from "react";
import { videoMimeTypes, imageMimeTypes } from "./mimeType"; // Importa los tipos MIME
import { CSSProperties } from "react";
// Importa el tipo CSSProperties para estilos
interface RandomFileProps {
  files: string[];
  selectedFile: string;
  onSelectFile: (newFile: string) => void;
}

const RandomFileComponent: React.FC<RandomFileProps> = ({
  files,
  selectedFile,
  onSelectFile,
}) => {
  const [mediaSource, setMediaSource] = useState<"video" | "image" | null>(
    null
  );

  useEffect(() => {
    if (selectedFile) {
      // Asegura un valor por defecto para fileExtension para evitar el problema de string | undefined
      const fileExtension = selectedFile.split(".").pop()?.toLowerCase() ?? "";

      if (videoMimeTypes.includes(fileExtension)) {
        setMediaSource("video");
      } else if (imageMimeTypes.includes(fileExtension)) {
        setMediaSource("image");
      } else {
        setMediaSource(null); // Maneja tipos de archivo no soportados de forma elegante
      }
    }
  }, [selectedFile]);

  const pickRandomFile = () => {
    const randomIndex = Math.floor(Math.random() * files.length);
    onSelectFile(files[randomIndex]);
  };

  // Función para obtener el src completo del archivo, aplicable tanto para video como imagen
  const getFileSource = () => {
    return `https://internetisgreat.s3.eu-west-3.amazonaws.com/${selectedFile}`;
  };

  const mediaStyles: CSSProperties = {
    width: "460px",
    height: "574px",
    objectFit: "cover", // Especifica el valor correcto para objectFit
  };

  return (
    <div className="items-center">
      {selectedFile && mediaSource && (
        <div>
          {mediaSource === "video" && (
            <video
              key={selectedFile}
              autoPlay
              loop
              style={mediaStyles}
              controls={false}
            >
              <source
                src={getFileSource()}
                type={`video/${selectedFile.split(".").pop() ?? "mp4"}`}
              />
              {/* Se puede agregar fallbacks aquí si es necesario */}
            </video>
          )}
          {mediaSource === "image" && (
            <img
              src={getFileSource()}
              alt="Archivo Random"
              key={selectedFile}
              style={mediaStyles}
            />
          )}
        </div>
      )}
      <div className="flex justify-center items-center  rainbow-text my-10">
        <button
          className="px-4 py-2 rainbow-button text-white font-pixel rounded transition duration-300 "
          onClick={pickRandomFile}
        >
          <p className=" text-stroke">Load another</p>
        </button>
      </div>
    </div>
  );
};

export default RandomFileComponent;
