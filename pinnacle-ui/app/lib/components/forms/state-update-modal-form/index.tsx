import { FC } from "react";
import { LucideCircle, LucideX } from "lucide-react";
import { State } from "@/app/lib/types/models";
import useColors from "@/app/lib/hooks/projects/useColors";
import BaseModal from "../../data-display/base-modal";
import TextArea from "../../data-input/text-area";
import FormGroup from "../form-group";
import Label from "../label";
import Button from "../../actions/button";
import TextInput from "../../data-input/text-input";

const StateUpdateModalForm: FC<{
  state: State;
  showModal: boolean;
  onClose: () => void;
}> = ({ state, showModal, onClose }) => {
  const { data: colors } = useColors();

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
          <LucideCircle size={18} />
          <h2>{state.name}</h2>
        </div>
      </div>
      <div className="p-4">
        <form action="">
          <FormGroup>
            <Label value="Color" />
            <div className="flex justify-between">
              {colors?.map((color) => (
                <button
                  className={`p-2 rounded-md`}
                  style={{
                    backgroundColor: color.name,
                    opacity: 0.5,
                  }}
                >
                  <LucideCircle color={color.name} />
                </button>
              ))}
            </div>
          </FormGroup>
          <FormGroup>
            <Label value="Work in Progress Limit" />
            <TextInput fullWidth padding="sm" value={state.limit} />
          </FormGroup>
          <FormGroup>
            <Label value="Status name" />
            <TextInput padding="sm" value={state.name} />
          </FormGroup>
          <FormGroup>
            <Label value="Description" />
            <TextArea className="w-full" placeholder="Description..." />
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
