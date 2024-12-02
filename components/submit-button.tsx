'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface SubmitButtonProps {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  children: React.ReactNode; 
  color?: "primary" | "default" | "secondary" | "success" | "warning" | "danger" | undefined; 
};

const SubmitButton = ({
  startContent,
  endContent,
  children,
  color = 'primary',
}: SubmitButtonProps) => {
  const status = useFormStatus();

  return (
    <Button
      startContent={startContent}
      isDisabled={status.pending}
      endContent={endContent}
      fullWidth
      color={color}
      type="submit"
    >
      {status.pending ? 'Loading...' : children}
    </Button>
  );
};

export default SubmitButton;
