'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface SubmitButtonProps {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  children: React.ReactNode; 
};

const SubmitButton = ({
  startContent,
  endContent,
  children,
}: SubmitButtonProps) => {
  const status = useFormStatus();

  return (
    <Button
      startContent={startContent}
      isDisabled={status.pending}
      endContent={endContent}
      fullWidth
      color="primary"
      type="submit"
    >
      {status.pending ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
