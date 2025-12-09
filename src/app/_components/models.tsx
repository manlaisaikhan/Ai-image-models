"use client";
import { useState } from "react";
import { ModelImageAnalysis } from "../_features/modelImageAnalysis";
import { ModelIngredientRecognition } from "../_features/modelIngredientRecognition";
import { ModelImageCreator } from "../_features/modelImageCreator";
export const Models = () => {
  const [state, setState] = useState("Image analysis");
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[580px] flex flex-col gap-6">
        <div className="w-[420px] h-9 flex bg-[#F4F4F5] rounded-xl items-center justify-evenly">
          <button
            className={`w-[123px] h-7 font-medium text-[14px] cursor-pointer rounded-xl flex justify-center items-center ${
              state === "Image analysis"
                ? "text-black bg-white"
                : "text-[#71717A]"
            }`}
            onClick={() => setState("Image analysis")}
          >
            Image analysis
          </button>
          <button
            className={`w-[170px] h-7 font-medium text-[14px] cursor-pointer rounded-xl flex justify-center items-center ${
              state === "Ingredient recognition"
                ? "text-black bg-white"
                : "text-[#71717A]"
            }`}
            onClick={() => setState("Ingredient recognition")}
          >
            Ingredient recognition
          </button>
          <button
            className={`w-[117px] h-7 font-medium text-[14px] cursor-pointer rounded-xl flex justify-center items-center ${
              state === "Image creator"
                ? "text-black bg-white"
                : "text-[#71717A]"
            }`}
            onClick={() => setState("Image creator")}
          >
            Image creator
          </button>
        </div>
        {state === "Image analysis" && <ModelImageAnalysis />}
        {state === "Ingredient recognition" && <ModelIngredientRecognition />}
        {state === "Image creator" && <ModelImageCreator />}
      </div>
    </div>
  );
};
