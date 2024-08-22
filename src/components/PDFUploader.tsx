import React, { useState, useEffect, useCallback } from "react";
import { useDropzone, FileRejection, DropzoneOptions } from "react-dropzone";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB in bytes

interface UploadedFile extends File {
  preview?: string;
}

interface PDFUploaderProps {
  onFileUpload: (files: File[]) => void;
  value?: File[];
}

const PDFUploader: React.FC<PDFUploaderProps> = ({
  onFileUpload,
  value = [],
}) => {
  const [files, setFiles] = useState<UploadedFile[]>(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update files when value prop changes
    setFiles(value);
  }, [value]);

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError("File size exceeds the limit of 25 MB.");
        return false;
      }
      return true;
    });

    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles, ...validFiles];
      onFileUpload(updatedFiles);
      return updatedFiles;
    });

    if (validFiles.length > 0) {
      setError(null);
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      handleFiles(acceptedFiles);

      if (fileRejections.length > 0) {
        setError(fileRejections[0].errors[0].message);
      }
    },
    []
  );

  const dropzoneOptions: DropzoneOptions = {
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: MAX_FILE_SIZE,
  };

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone(dropzoneOptions);

  return (
    <div className="mx-auto">
      <div
        {...getRootProps()}
        className={`flex flex-col text-center border-dashed border-[1px] border-gray-300 rounded-lg p-10 ${
          isDragActive ? "border-[#6947BF] bg-[#F8F6FE]" : ""
        }`}
      >
        <input {...getInputProps()} id="file-upload" />
        <div className="flex justify-center content-center">
          <Upload className="size-12 text-[#98A1BB]" />
        </div>
        <label htmlFor="file-upload" className="cursor-pointer">
          <div>
            <p className="text-gray-400 font-Mont font-bold text-base">
              {isDragActive ? "Drop the PDF here" : "Drag and drop a PDF"}
            </p>
            <p className="text-gray-400 font-Mont font-semibold text-base">
              Limit 25 MB per file
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4 bg-white text-[#6947BF] border-[#CEC4EB] focus:outline-none font-extrabold text-base rounded-3xl border-[1px]"
            onClick={(e) => e.preventDefault()}
          >
            Upload your file
          </Button>
        </label>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files:</h3>
          <ul className="list-disc pl-5">
            {files.map((file, index) => (
              <li key={index} className="text-sm text-gray-600">
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
