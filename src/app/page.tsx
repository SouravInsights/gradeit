"use client";

import React from "react";
import Header from "@/components/Header";
import ExploreCoursework from "@/components/ExploreCoursework";
import { Calendar, Files } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Chip from "@/components/Chip";
import CourseworkList from "@/components/CourseworkList";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-blue-50">
      <div className="absolute top-4 right-4 flex flex-col items-end space-y-5">
        <Chip
          label="120"
          avatar={{
            src: "./ZU.png",
            alt: "@shadcn",
            fallback: "CN",
          }}
          color="secondary"
          className="font-Mont font-extrabold text-base"
        />
        <Chip
          label="24"
          avatar={{
            src: "./flame.png",
            alt: "@shadcn",
            fallback: "CN",
          }}
          color="default"
          className="font-Mont font-extrabold text-base"
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Calendar className="h-6 w-6" />
              <span className="ml-2 block md:hidden">Home</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Home</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger>
              <Files className="h-6 w-6" />
              <span className="ml-2 block md:hidden">Copy</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="pt-[10rem] ">
        <Header />
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Coursework</h2>
          <CourseworkList />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Explore Coursework</h2>
          <ExploreCoursework />
        </div>
      </div>
    </main>
  );
}
