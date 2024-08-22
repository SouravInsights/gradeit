"use client";
import React from "react";
import useEssayEvaluationStore from "@/store/essayEvaluationStore";
import CourseworkItem from "./CourseworkItem";

const CourseworkList: React.FC = () => {
  const { courseworkList } = useEssayEvaluationStore();

  if (courseworkList.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No coursework uploaded yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {courseworkList.map((coursework) => {
        console.log("thumbnailUrl:", coursework.thumbnailUrl);
        return (
          <CourseworkItem
            key={coursework.id}
            title={coursework.title}
            subject={coursework.subject}
            readTime={`${Math.ceil(coursework.wordCount / 200)} min read`}
            wordCount={coursework.wordCount}
            rating={coursework.rating}
            language={coursework.language}
            thumbnailUrl={coursework.thumbnailUrl}
          />
        );
      })}
    </div>
  );
};

export default CourseworkList;
