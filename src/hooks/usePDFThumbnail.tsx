"use client";
import { Document, Page, pdfjs } from "react-pdf";

import { useState, useEffect } from "react";

// Set up the worker source
pdfjs.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

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
        const pdf = await pdfjs.getDocument(fileUrl).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
          throw new Error("Unable to create canvas context");
        }

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport })
          .promise;

        setThumbnailUrl(canvas.toDataURL());
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
