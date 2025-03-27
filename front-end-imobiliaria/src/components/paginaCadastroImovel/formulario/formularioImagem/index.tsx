"use client";

import { useState } from "react";
import PanZoom from "react-easy-panzoom";

interface FormularioImagemProps {
  onImagesChange: (files: File[]) => void;
}

interface ImageUploadProps {
  imagePreview: string | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  className?: string;
  onClick?: () => void;
  onDoubleClick?: () => void;
  index: number;
}

function ImageUpload({ imagePreview, handleFileChange, className = "", onClick, onDoubleClick, index }: ImageUploadProps) {
  return (
    <div 
      className={`relative cursor-pointer bg-gray-300 hover:bg-gray-400 rounded-2xl flex items-center justify-center overflow-hidden transition border border-gray-500 shadow-lg ${className}`}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
    >
      {imagePreview ? (
        <PanZoom>
          <img
            src={imagePreview}
            alt="Pré-visualização"
            className="w-full h-full object-cover"
          />
        </PanZoom>
      ) : (
        <span className="rounded-full px-3 py-1 bg-gray-400 text-white text-2xl">+</span>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e, index)}
        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

export function FormularioImagem({ onImagesChange }: FormularioImagemProps) {
  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>(Array(8).fill(null));
  const [imageFiles, setImageFiles] = useState<File[]>(Array(8).fill(null));
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const newPreviews = [...imagePreviews];
          newPreviews[index] = e.target.result as string;
          setImagePreviews(newPreviews);
          
          const newFiles = [...imageFiles];
          newFiles[index] = file;
          setImageFiles(newFiles);
          
          onImagesChange(newFiles.filter((f): f is File => f !== null));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (index: number) => {
    if (imagePreviews[index]) {
      setSelectedImageIndex(index);
      setIsFullscreen(true);
    }
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setSelectedImageIndex(null);
  };

  if (isFullscreen && selectedImageIndex !== null) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={handleFullscreenClick}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <PanZoom>
            <img
              src={imagePreviews[selectedImageIndex] || ''}
              alt="Visualização em tela cheia"
              className="max-w-full max-h-full object-contain"
            />
          </PanZoom>
          <button 
            className="absolute top-4 right-4 text-white text-2xl bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
            onClick={handleFullscreenClick}
          >
            X
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col font-montserrat h-full gap-2">
      <div className=" rounded-2xl w-full h-full flex-row justi flex p-4">
        <div className="flex flex-col">
          <label className="text-xl font-medium text-black mb-5">Foto do imóvel</label>

          <ImageUpload
            imagePreview={selectedImageIndex !== null ? imagePreviews[selectedImageIndex] : imagePreviews[0]}
            handleFileChange={handleFileChange}
            className="h-48 w-[35rem]"
            onClick={() => handleImageClick(0)}
            index={0}
          />

          <div className="flex mt-4 gap-4">
            {[...Array(6)].map((_, index) => (
              <ImageUpload
                key={index}
                imagePreview={imagePreviews[index + 1]}
                handleFileChange={handleFileChange}
                className="h-20 w-20"
                onClick={() => handleImageClick(index + 1)}
                index={index + 1}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col mt-12 ml-4 gap-4">
          {[...Array(2)].map((_, index) => (
            <ImageUpload
              key={index}
              imagePreview={imagePreviews[index + 7]}
              handleFileChange={handleFileChange}
              className="h-20 w-20"
              onClick={() => handleImageClick(index + 7)}
              index={index + 7}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
