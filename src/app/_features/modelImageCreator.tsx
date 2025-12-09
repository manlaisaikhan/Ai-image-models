"use client";
import { useState } from "react";
import { GenerateButton } from "../_components/generateButton";
import { ModelDescription } from "../_components/modelDescription";
import { ModelFooter } from "../_components/modelFooter";
import { ModelHeader } from "../_components/modelHeader";
import { ImageIcon } from "../_icons/imageIcon";
import { Spinner } from "@/components/ui/spinner";

export const ModelImageCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const createImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl(null);
    try {
      const data = await fetch("/api/textToImage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const jsonData = await data.json();
      if (jsonData.err) {
        console.error(jsonData.err);
        setError("Please describe more.");
      } else if (jsonData.image) {
        setImageUrl(jsonData.image);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderDescription = () => {
    if (loading === true) {
      return (
        <p className="flex justify-center items-center gap-1">
          <Spinner className="size-4" /> Creating your image please wait
        </p>
      );
    }
    if (error) {
      return error;
    }
    if (imageUrl) {
      return (
        <img
          className="w-[360px] h-[360px] rounded-lg object-cover"
          src={imageUrl}
        />
      );
    }
    if (imageUrl === null) {
      return "First, enter your text to generate an image.";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <ModelHeader title={"Food image creator"} />
      <div className="flex flex-col gap-2">
        <ModelDescription
          title={"What food image do you want? Describe it briefly."}
        />
        <textarea
          placeholder="Describe food"
          className="outline-none w-full h-[124px] rounded-lg border border-zinc-200 text-[14px] font-regular text-[#18181B] pl-3 pr-3 pb-2 pt-2"
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
        />
        <GenerateButton
          changeStyle={prompt.length > 0 ? "bg-black" : "bg-[#71717a]"}
          onClick={createImage}
        />
      </div>
      <ModelFooter
        title={"Result"}
        description={renderDescription()}
        icon={<ImageIcon />}
      />
    </div>
  );
};
