import { Button } from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

const SubmitMessageButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      startContent={<FaPaperPlane />}
      isDisabled={pending}
      fullWidth
      radius="full"
      color="primary"
      type="submit"
    >
      {pending ? 'Sending...' : 'Send Message'}
    </Button>
  );
};

export default SubmitMessageButton;
