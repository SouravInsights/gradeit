"use client";
import React from "react";
import { Clock, Book, Star } from "lucide-react";
import Chip from "./Chip";
import Image from "next/image";

interface CourseworkItemProps {
  title: string;
  subject: string;
  readTime: string;
  wordCount: number;
  rating: number;
  language: string;
  thumbnailUrl: string;
}

const CourseworkItem: React.FC<CourseworkItemProps> = ({
  title,
  subject,
  readTime,
  wordCount,
  rating,
  language,
  thumbnailUrl,
}) => {
  return (
    <div className="flex flex-row items-start p-6 bg-gradient-to-r from-purple-100 to-white rounded-lg shadow-lg max-w-full w-[460px]">
      {/* Image Section */}
      <div className="bg-white relative w-[120px] h-[160px] p-1 rounded-lg rounded-bl-lg border border-gray-300 overflow-hidden">
        <Image
          src={thumbnailUrl}
          width={300}
          height={500}
          alt={`Cover for ${title}`}
          className="w-full h-full object-fill"
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 pl-4">
        <h2 className="text-lg font-Mont font-extrabold leading-6 text-gray-800">
          {title}
        </h2>
        <p className="text-xs font-Mont font-semibold leading-4 text-gray-600 mt-2">
          {subject}
        </p>
        <div className="mt-2 flex flex-wrap gap-1">
          <Chip
            label={`${wordCount} words`}
            avatar={{
              src: "./paper3d.png",
              alt: "Physics HL",
              fallback: "HL",
            }}
          />
          <Chip
            label={readTime}
            avatar={{
              src: "./clock.png",
              fallback: "Clock",
            }}
          />
          <Chip
            label={`${rating}/7`}
            avatar={{
              src: "./star.png",
              fallback: "Star",
            }}
          />
          <Chip
            label={language}
            avatar={{
              src: "./HandGesture.png",
              alt: "Physics HL",
              fallback: "HL",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseworkItem;
