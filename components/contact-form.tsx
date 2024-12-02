'use client';

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Chip, Input, Textarea } from "@nextui-org/react";
import { contactRequest } from "@/actions/contact-request";
import SubmitButton from "@/components/submit-button";

const ContactForm = () => {
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(contactRequest, {
    errors: {},
  });
  const [isSuccessMessageShown, setIsSuccessMessageShown] = useState(false);

  useEffect(() => {
    if (formState.success) {
      setIsSuccessMessageShown(true);
      ref.current?.reset();
    }
  }, [formState.success]);

  return (
    <form action={action} ref={ref}>
      <div className="text-xs flex flex-col gap-4 p-4 w-full bg-white dark:bg-black rounded-md">
        {!!formState.errors._errors?.length && (
          <Chip
            className="px-4 py-6 text-sm w-full max-w-full"
            variant="flat"
            radius="sm"
            color="danger"
            size="lg"
          >
            {formState.errors._errors.join(', ')}
          </Chip>
        )}

        {isSuccessMessageShown && (
          <Chip
            className="px-4 py-6 text-sm w-full max-w-full"
            variant="flat"
            radius="sm"
            color="success"
            size="lg"
          >
            Your submission has been sent
          </Chip>
        )}

        <Input
          errorMessage={formState.errors.name?._errors?.join(', ')}
          placeholder="Name"
          isInvalid={!!formState.errors.name?._errors}
          name="name"
        />

        <Input
          errorMessage={formState.errors.email?._errors?.join(', ')}
          placeholder="Email"
          isInvalid={!!formState.errors.email?._errors}
          name="email"
        />

        <Textarea
          errorMessage={formState.errors.message?._errors?.join(', ')}
          placeholder="Message"
          isInvalid={!!formState.errors.message?._errors}
          name="message"
        />

        <SubmitButton color="default">
          Send
        </SubmitButton>
      </div>
    </form>
  );
};

export default ContactForm;
