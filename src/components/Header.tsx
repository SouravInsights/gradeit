"use client";

import Image from "next/image";
import React from "react";
import EssayEvaluationForm from "./EssayEvaluationForm";
import EvaluationDisplay from "./EvaluationDisplay";
import { useEssayEvaluationStore } from "@/store";

export default function Header() {
  const { isEvaluationRequested } = useEssayEvaluationStore();
  return (
    <div className="flex flex-row gap-5 ">
      <div className="flex flex-col gap-4 ">
        <h1 className="font-Mont text-[2.5rem] font-bold text-[#2D264B]">
          Hey IB Folks! Unsure about the quality of your <br /> answers?{" "}
          <span className="text-[#6947BF]">We get you.</span>
        </h1>
        <EssayEvaluationForm />
        {isEvaluationRequested && <EvaluationDisplay />}
      </div>
      <div className="flex">
        <Image
          src="/robot.png"
          alt="Robot"
          width={344}
          height={626}
          className="object-contain "
        />
      </div>
    </div>
  );
}
