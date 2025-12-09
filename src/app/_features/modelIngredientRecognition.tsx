"use client";
import { useState } from "react";
import { GenerateButton } from "../_components/generateButton";
import { ModelDescription } from "../_components/modelDescription";
import { ModelFooter } from "../_components/modelFooter";
import { ModelHeader } from "../_components/modelHeader";
import { DocumentIcon } from "../_icons/documentIcon";
import { Spinner } from "@/components/ui/spinner";

export const ModelIngredientRecognition = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await (
        await fetch("api/ingredientRecognition", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ food: text }),
        })
      ).json();
      const response =
        data?.res?.candidates?.[0].parts?.[0].text ??
        "Sorry something wrong 🥲";
      if (data) {
        setRes(response);
      }
      if (!data) {
        setError("Sorry something wrong 😓");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(res);

  const renderDescription = () => {
    if (loading === true) {
      return (
        <p className="flex justify-center items-center gap-1">
          <Spinner className="size-4" /> Generating ingredients
        </p>
      );
    }
    if (error) {
      return error;
    }
    if (!res) {
      return "First, enter your text to recognize an ingredients.";
    }
    if (res) {
      return res;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <ModelHeader title={"Ingredient recognition"} />
      <div className="flex flex-col gap-2">
        <ModelDescription
          title={"Describe the food, and AI will detect the ingredients."}
        />
        <textarea
          placeholder="Describe recognition"
          className="outline-none w-full h-[124px] rounded-lg border border-zinc-200 text-[14px] font-regular text-[#18181B] pl-3 pr-3 pb-2 pt-2"
          onChange={(e) => setText(e.target.value)}
        />
        <GenerateButton
          onClick={handleSubmit}
          changeStyle={text.length > 0 ? "bg-black" : "bg-[#71717a]"}
        />
      </div>
      <ModelFooter
        title={"Identified Ingredients"}
        description={renderDescription()}
        icon={<DocumentIcon />}
      />
    </div>
  );
};
