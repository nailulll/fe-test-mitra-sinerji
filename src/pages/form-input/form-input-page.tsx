import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import FormHandler from "./form-handler";
import { FormInputProvider } from "@/contexts/form-input-context";

const FormInputPage = () => {
  return (
    <FormInputProvider>
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-xl font-semibold">Form Input</h1>
        <Button asChild size="icon">
          <Link to="/">
            <ChevronRightIcon />
          </Link>
        </Button>
      </div>
      <FormHandler />
    </FormInputProvider>
  );
};

export default FormInputPage;
