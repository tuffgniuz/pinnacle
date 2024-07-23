"use client";
import { FC, FormEvent, useState, useEffect } from "react";
import { LucideCircle, LucideCircleCheckBig, LucideX } from "lucide-react";
import { State } from "@/app/lib/types/models";
import useColors from "@/app/lib/hooks/projects/useColors";
import useStateUpdate from "@/app/lib/hooks/projects/useStateUpdate";
import BaseModal from "../../data-display/base-modal";
import TextArea from "../../data-input/text-area";
import FormGroup from "../form-group";
import Label from "../label";
import Button from "../../actions/button";
import TextInput from "../../data-input/text-input";

const StateUpdateModalForm: FC<{
  state: State | undefined;
  showModal: boolean;
  onClose: () => void;
}> = ({ state, showModal, onClose }) => {
  const { data: colors } = useColors();
  const { mutation } = useStateUpdate(state?.id);

  const [name, setName] = useState<string | undefined>(state?.name || "");
  const [description, setDescription] = useState<string>(
    state?.description || "",
  );
  const [colorId, setColorId] = useState<string>(state?.color_id || "");
  const [limit, setLimit] = useState<number>(state?.limit);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, description, color_id: colorId, limit });
    onClose();
  };

  useEffect(() => {
    if (state) {
      setName(state.name);
      setDescription(state.description);
      setColorId(state.color_id);
      setLimit(state.limit);
    }
  }, [state]);

  const selectedColor = colors?.find((color) => color.id === colorId);
  const iconColor = selectedColor ? selectedColor.name : "";

  return (
    <BaseModal show={showModal} onClose={onClose} className="w-1/5">
      <div className="flex items-center justify-between border-b dark:border-b-accent-dark-400 p-4">
        <h1 className="font-semibold">Edit state options</h1>
        <button onClick={onClose}>
          <LucideX size={18} />
        </button>
      </div>
      <div className="h-24 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <LucideCircle size={18} style={{ color: iconColor }} />
          <h2>{name}</h2>
        </div>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label value="Color" />
            <div className="flex justify-between">
              {colors?.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={`flex justify-center items-center h-10 w-10 rounded-md`}
                  style={{
                    backgroundColor: color.name,
                  }}
                  onClick={() => setColorId(color.id)}
                >
                  {color.id === state?.color_id ? (
                    <LucideCircleCheckBig size={18} />
                  ) : (
                    <LucideCircle size={18} className="opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </FormGroup>
          <FormGroup>
            <Label value="Work in Progress Limit" />
            <TextInput
              fullWidth
              padding="sm"
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            />
          </FormGroup>
          <FormGroup>
            <Label value="Status name" />
            <TextInput
              padding="sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label value="Description" />
            <TextArea
              className="w-full"
              placeholder="Description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormGroup>
          <div className="flex justify-end">
            <Button padding="sm" type="submit" value="Update" />
          </div>
        </form>
      </div>
    </BaseModal>
  );
};

export default StateUpdateModalForm;
