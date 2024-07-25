import { FC, FormEvent } from "react";
import { motion } from "framer-motion";
import useToggleElement from "@/app/lib/hooks/useToggleElement";
import Label from "../label";
import FormGroup from "../form-group";
import Button from "../../actions/button";
import TextInput from "../../data-input/text-input";

const slideVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const LabelCreateForm: FC = () => {
  const { isVisible, setIsVisible, ref, handleBlur } =
    useToggleElement<HTMLFormElement>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Button
        onClick={() => setIsVisible(!isVisible)}
        padding="sm"
        value="Create label"
        className="mb-10"
      />
      {isVisible && (
        <motion.form
          layout
          onSubmit={handleSubmit}
          ref={ref}
          onBlur={handleBlur}
          className="flex items-center gap-5 w-full"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={slideVariants}
          transition={{ duration: 0.3 }}
        >
          <FormGroup>
            <Label value="Name" />
            <TextInput padding="sm" placeholder="Label name" />
          </FormGroup>
          <FormGroup>
            <Label value="Description" />
            <TextInput padding="sm" placeholder="Description" />
          </FormGroup>
          <FormGroup>
            <Label value="Color" />
            <TextInput padding="sm" placeholder="" />
          </FormGroup>
          <div className="flex">
            <Button padding="sm" value="Save" />
          </div>
        </motion.form>
      )}
    </>
  );
};

export default LabelCreateForm;
