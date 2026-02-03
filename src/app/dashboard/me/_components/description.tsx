"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { changeName } from "../_actions/change-name";
import { toast } from "sonner";
import { changeDescription } from "../_actions/change-bio";

export function Description({
  initialDescription,
}: {
  initialDescription: string;
}) {
  const [description, setDescription] = useState(initialDescription);
  const [originalDescription] = useState(initialDescription);

  const debouncedSaveDescription = useRef(
    debounce(async (currentDescription: string) => {
      if (currentDescription.trim() === "") {
        setDescription(originalDescription);
        return;
      }

      if (currentDescription !== description) {
        try {
          const response = await changeDescription({
            description: currentDescription,
          });

          if (response.error) {
            console.log(response.error);
            setDescription(originalDescription);
            return;
          }

          toast.success("Bio alterada com sucesso");

          console.log("Salvo com Sucesso");
        } catch (error) {
          console.log(error);
          setDescription(originalDescription);
        }
      }
    }, 500),
  ).current;

  function handleChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;

    setDescription(value);

    debouncedSaveDescription(value);
  }

  return (
    <textarea
      className="text-xl h-40 md:text-2xl resize-none bg-gray-50 border boder-gray-100 rounded-md outiline-none p-2 w-full max-w-2xl text-center my-3 "
      value={description}
      onChange={handleChangeDescription}
    />
  );
}
