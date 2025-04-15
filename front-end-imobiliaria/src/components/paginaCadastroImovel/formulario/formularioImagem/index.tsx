"use client";

import Image from "next/image";
import { useState } from "react";

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
        <div className="w-full h-full">
          <Image
            src={imagePreview}
            alt="Pré-visualização"
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
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
  const [scale, setScale] = useState(1);

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
      setScale(1); // Reset scale when opening fullscreen
    }
  };

  const handleFullscreenClick = () => {
    setIsFullscreen(false);
    setSelectedImageIndex(null);
    setScale(1);
  };

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(prev => Math.max(prev - 0.2, 0.5));
  };

  if (isFullscreen && selectedImageIndex !== null) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
        onClick={handleFullscreenClick}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            <div 
              style={{ 
                transform: `scale(${scale})`,
                transition: 'transform 0.2s ease-out'
              }}
            >
              <Image
                src={imagePreviews[selectedImageIndex] || ''}
                alt="Visualização em tela cheia"
                className="max-w-full max-h-full object-contain"
                width={1200}
                height={800}
              />
            </div>
          </div>
          
          {/* Controles de zoom */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button 
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl"
              onClick={handleZoomOut}
            >
              -
            </button>
            <button 
              className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-xl"
              onClick={handleZoomIn}
            >
              +
            </button>
          </div>

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
    <div className="flex flex-col font-montserrat w-full">
      <div className="rounded-2xl w-full flex flex-col p-2 sm:p-4">
        <div className="flex flex-col items-start mb-4 sm:mb-5">
          <label className="text-lg sm:text-xl font-medium text-black">Fotos do imóvel</label>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Adicione até 7 fotos do imóvel. A primeira foto será a principal e será exibida em destaque.
            As demais fotos serão exibidas em tamanho menor abaixo.
          </p>
        </div>

        <div className="w-full flex flex-col items-center gap-2 sm:gap-4">
          <ImageUpload
            imagePreview={selectedImageIndex !== null ? imagePreviews[selectedImageIndex] : imagePreviews[0]}
            handleFileChange={handleFileChange}
            className="h-48 sm:h-64 w-full max-w-2xl"
            onClick={() => handleImageClick(0)}
            index={0}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 w-full max-w-2xl">
            {[...Array(6)].map((_, index) => (
              <ImageUpload
                key={index}
                imagePreview={imagePreviews[index + 1]}
                handleFileChange={handleFileChange}
                className="h-20 sm:h-24 w-full"
                onClick={() => handleImageClick(index + 1)}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

