import { FC, FormEvent, useState } from "react";
import { LucidePlus } from "lucide-react";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import Button from "../../../actions/button";
import TextInput from "../../../data-input/text-input";
import useStateCreate from "@/app/lib/hooks/projects/useStateCreate";

const StateQuickCreateForm: FC<{ workflowId: string | undefined }> = ({
  workflowId,
}) => {
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLFormElement>();
  const { mutation } = useStateCreate();
  const [name, setName] = useState<string | undefined>(undefined);

  const handleSubmit = (e: FormEvent) => {
    console.log("create handle submit state called");
    e.preventDefault();
    mutation.mutate({ name, workflow_id: workflowId });
  };

  return (
    <div className="mb-10">
      {isVisible ? (
        <form onSubmit={handleSubmit} ref={ref} onBlur={handleBlur}>
          <TextInput
            autoFocus
            fullWidth
            padding="sm"
            placeholder="Todo..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      ) : (
        <Button
          padding="sm"
          icon={<LucidePlus size={18} />}
          value="Add column"
          onClick={() => setIsVisible(true)}
        />
      )}
    </div>
  );
};

export default StateQuickCreateForm;
