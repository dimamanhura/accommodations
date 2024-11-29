import { Button } from "@nextui-org/react";
import { FaShare } from "react-icons/fa";

const ShareButtons = () => {
  return (
    <>
      <h1 className="text-xl font-bold text-center pt-2">Share This Property:</h1>
      <Button
        startContent={<FaShare />}
        fullWidth
        radius="full"
        color="warning"
      >
        Share Property
      </Button>
    </>
  );
};

export default ShareButtons;
