"use client";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, useRef } from "react";
import { debounce } from "lodash";
import { changeName } from "../_actions/change-name";

export function Name({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [originalName] = useState(initialName);

  const debouncedSaveName = useRef(
    debounce(async (currentName: string) => {
      if (currentName.trim() === "") {
        setName(originalName);
        return;
      }

      if (currentName !== name) {
        try {
          const response = await changeName({ name: currentName });

          if (response.error) {
            console.log(response.error);
            setName(originalName);
            return;
          }

          console.log("Salvo com Sucesso");
        } catch (error) {
          console.log(error);
          setName(originalName);
        }
      }
    }, 500),
  ).current;

  function handleChangeName(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    setName(value);
  }

  return (
    <Input
      className="text-xl md:text-2xl font-bold bg-gray-50 border boder-gray-100 rounded-md outiline-none p-2 w-full max-w-2xl text-center my-3 "
      value={name}
      onChange={handleChangeName}
    />
  );
}
