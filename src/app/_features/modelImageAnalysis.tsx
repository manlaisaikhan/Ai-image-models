"use client";
import { useState } from "react";
import { GenerateButton } from "../_components/generateButton";
import { ModelDescription } from "../_components/modelDescription";
import { ModelFooter } from "../_components/modelFooter";
import { ModelHeader } from "../_components/modelHeader";
import { DocumentIcon } from "../_icons/documentIcon";
import { RemoveIcon } from "../_icons/removeIcon";
import { Spinner } from "@/components/ui/spinner";

type DetectedObject = {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
};

export const ModelImageAnalysis = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [objects, setObjects] = useState<DetectedObject[]>([]);
  const [error, setError] = useState<string | null>(null);
  const imageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setObjects([]);
    }
  };
  const detectImage = async () => {
    if (!image) return;
    setLoading(true);
    setObjects([]);
    try {
      const formData = new FormData();
      formData.append("image", image);
      const data = await (
        await fetch("/api/image", {
          method: "POST",
          body: formData,
        })
      ).json();
      if (!data.objects || data.objects.length === 0) {
        return setError("Image is not detected please try another image.");
      }
      setObjects(data.objects || []);
      setLoading(false);
      console.log(formData, "this is form data");
      console.log(image, "this is image");
    } catch (err) {
      console.log(err, "fix your front end");
    } finally {
      setLoading(false);
    }
  };

  const renderDescription = () => {
    if (loading === true) {
      return (
        <p className="flex justify-center items-center gap-1">
          <Spinner className="size-4" /> Working
        </p>
      );
    }
    if (error) return error;
    if (image === null && imagePreview === null) {
      return "First, enter your image to recognize an ingredients.";
    }
    if (objects.length > 0) {
      return objects.map((ob) => ob.label).join(", ");
    } else {
      return "First, enter your image to recognize an ingredients.";
    }
  };

  // fetch('/api/image', {method: "POST", body})
  return (
    <div className="flex flex-col gap-6">
      <ModelHeader title={"Image analysis"} />
      <div className="flex flex-col gap-2">
        <ModelDescription
          title={"Upload a food photo, and AI will detect the ingredients."}
        />

        <label>
          {!imagePreview && (
            <div className="w-full min-h-10 rounded-lg flex border items-center pl-2.5 gap-2">
              <input
                type="file"
                className="w-[95px] h-10 hidden"
                accept="image/png, image/jpeg"
                onChange={imageUpload}
              />
              <p className="cursor-pointer text-[14px] text-black font-medium">
                Choose file
              </p>
              <p className="text-[14px] text-[#71717A] font-normal">
                JPG , PNG
              </p>
            </div>
          )}
          {imagePreview && (
            <div className="w-52 h-[141px] rounded-lg p-1 relative border flex justify-end items-end">
              <img
                src={imagePreview}
                className="absolute w-[200px] h-[133px] object-cover rounded-lg z-[-1]"
              />
              <button
                className="w-6 h-6 rounded-lg border cursor-pointer flex justify-center items-center bg-white mb-1.5 mr-1.5"
                onClick={() => {
                  setImagePreview(null);
                  setImage(null);
                }}
              >
                <RemoveIcon />
              </button>
            </div>
          )}
        </label>
        <GenerateButton
          changeStyle={imagePreview ? "bg-black" : "bg-[#71717a]"}
          onClick={detectImage}
        />
      </div>
      <ModelFooter
        title={"Here is the summary"}
        description={renderDescription()}
        icon={<DocumentIcon />}
      />
    </div>
  );
};
