import { useState, useEffect } from "react";

export const usePDFThumbnail = (file: File | null) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setThumbnailUrl(null);
      setError(null);
      return;
    }

    const generateThumbnail = async () => {
      try {
        const fileUrl = URL.createObjectURL(file);
        const image = new Image();
        image.src = fileUrl;

        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });

        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("Unable to create canvas context");
        }

        ctx.drawImage(image, 0, 0);
        const thumbnailDataUrl = canvas.toDataURL("image/png");

        setThumbnailUrl(thumbnailDataUrl);
        setError(null);
      } catch (err) {
        console.error("Failed to generate PDF thumbnail:", err);
        setError("Failed to generate thumbnail");
        setThumbnailUrl(null);
      }
    };

    generateThumbnail();

    return () => {
      if (file) {
        URL.revokeObjectURL(URL.createObjectURL(file));
      }
    };
  }, [file]);

  return { thumbnailUrl, error };
};
