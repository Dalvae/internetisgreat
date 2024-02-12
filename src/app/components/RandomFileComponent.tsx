import React, { useState, useEffect } from "react";
import { videoMimeTypes, imageMimeTypes } from "./mimeType";
import { CSSProperties } from "react";
import { PacmanLoader } from "react-spinners";

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      setIsLoading(true);
      const fileExtension = selectedFile.split(".").pop()?.toLowerCase() ?? "";

      if (videoMimeTypes.includes(fileExtension)) {
        setMediaSource("video");
      } else if (imageMimeTypes.includes(fileExtension)) {
        setMediaSource("image");
      } else {
        setMediaSource(null);
        setIsLoading(false);
      }
    }
  }, [selectedFile]);

  const pickRandomFile = () => {
    setIsLoading(true);
    const randomIndex = Math.floor(Math.random() * files.length);
    onSelectFile(files[randomIndex]);
  };

  const getFileSource = () => {
    return `https://internetisgreat.s3.eu-west-3.amazonaws.com/${selectedFile}`;
  };

  const mediaStyles: CSSProperties = {
    width: "460px",
    height: "574px",
    objectFit: "cover",
  };

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="items-center">
      {isLoading && (
        <div className="flex justify-center items-center ">
          <PacmanLoader className="my-20" color="#ffffff" size={30} />
        </div>
      )}
      {selectedFile && mediaSource === "video" && (
        <video
          key={selectedFile}
          autoPlay
          loop
          style={mediaStyles}
          controls={false}
          onLoadedData={handleMediaLoad}
        >
          <source
            src={getFileSource()}
            type={`video/${selectedFile.split(".").pop() ?? "mp4"}`}
          />
        </video>
      )}
      {selectedFile && mediaSource === "image" && (
        <img
          src={getFileSource()}
          alt="Archivo Random"
          key={selectedFile}
          style={mediaStyles}
          onLoad={handleMediaLoad} // Maneja la carga de la imagen
        />
      )}
      {!isLoading && (
        <div className="flex justify-center items-center rainbow-text my-10">
          <button
            className="px-4 py-2 rainbow-button text-white font-pixel rounded transition duration-300"
            onClick={pickRandomFile}
          >
            <p className="text-stroke">Load another</p>
          </button>
        </div>
      )}
    </div>
  );
};

export default RandomFileComponent;
