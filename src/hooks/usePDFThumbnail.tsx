"use client";
import { Document, Page, pdfjs } from "react-pdf";

import { useState, useEffect } from "react";

// Set up the worker source
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js";

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

        const thumbnail = await new Promise<string>((resolve, reject) => {
          const canvasElement = document.createElement("canvas");
          const renderPage = (page: any) => {
            const viewport = page.getViewport({ scale: 1 });
            canvasElement.height = viewport.height;
            canvasElement.width = viewport.width;
            const context = canvasElement.getContext("2d");
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            page.render(renderContext);
            resolve(canvasElement.toDataURL());
          };

          const onDocumentLoadSuccess = ({
            numPages,
          }: {
            numPages: number;
          }) => {
            if (numPages > 0) {
              pdfjs.getDocument(fileUrl).promise.then((pdf) => {
                pdf.getPage(1).then(renderPage);
              });
            } else {
              reject(new Error("No pages in PDF"));
            }
          };

          const onDocumentLoadFailure = (error: Error) => {
            reject(error);
          };

          return (
            <Document
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadFailure}
            >
              <Page pageNumber={1} />
            </Document>
          );
        });

        setThumbnailUrl(thumbnail);
        setError(null);
      } catch (err) {
        console.error("Failed to generate PDF thumbnail:", err);
        setError("Failed to generate thumbnail");
        setThumbnailUrl(null);
      }
    };

    generateThumbnail();
  }, [file]);

  return { thumbnailUrl, error };
};
