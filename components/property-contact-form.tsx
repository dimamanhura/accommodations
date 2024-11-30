'use client';

import { useActionState } from "react";
import { useSession } from "next-auth/react";
import { Chip, Input, Textarea } from "@nextui-org/react";
import { Property } from "@prisma/client";
import addMessage from "@/actions/add-message";
import { FaPaperPlane } from "react-icons/fa";
import SubmitButton from "./submit-button";

interface PropertyContactFormProps {
  property: Property;
};

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
  const session = useSession();
  const [state, action] = useActionState(addMessage, {
    success: false,
    errors: {},
  });

  return session?.data?.user?.id && (
    <form action={action}>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
        <div className="w-full flex flex-col gap-4">
          {state.success && (
            <Chip
              className="px-4 py-6 text-sm w-full max-w-full"
              variant="flat"
              radius="sm"
              color="success"
              size="lg"
            >
              Your message has been sent
            </Chip>
          )}

          {!!state.errors._errors?.length && (
            <Chip
              className="px-4 py-6 text-sm w-full max-w-full"
              variant="flat"
              radius="sm"
              color="danger"
              size="lg"
            >
              {state.errors._errors.join(', ')}
            </Chip>
          )}

          {!!state.errors.recipientId?._errors && (
            <Chip
              className="px-4 py-6 text-sm w-full max-w-full"
              variant="flat"
              radius="sm"
              color="danger"
              size="lg"
            >
              {state.errors.recipientId?._errors.join(', ')}
            </Chip>
          )}

          {!!state.errors.propertyId?._errors && (
            <Chip
              className="px-4 py-6 text-sm w-full max-w-full"
              variant="flat"
              radius="sm"
              color="danger"
              size="lg"
            >
              {state.errors.propertyId?._errors.join(', ')}
            </Chip>
          )}

          {!!state.errors.senderId?._errors && (
            <Chip
              className="px-4 py-6 text-sm w-full max-w-full"
              variant="flat"
              radius="sm"
              color="danger"
              size="lg"
            >
              {state.errors.senderId?._errors.join(', ')}
            </Chip>
          )}

          <input
            defaultValue={property.id}
            type="hidden"
            name="propertyId"
            id="propertyId"
          />
          
          <input
            defaultValue={property.ownerId}
            type="hidden"
            name="recipientId"
            id="recipientId"
          />
          
          <Input
            errorMessage={state.errors.name?._errors?.join(', ')}
            isRequired
            isInvalid={!!state.errors.name?._errors}
            label="Name"
            size="lg"
            name="name"
            id="name"
          />
          
          <Input
            errorMessage={state.errors.email?._errors?.join(', ')}
            isRequired
            isInvalid={!!state.errors.email?._errors}
            label="Email"
            size="lg"
            type="email"
            name="email"
            id="email"
          />

          <Input
            errorMessage={state.errors.phone?._errors?.join(', ')}
            isRequired
            isInvalid={!!state.errors.phone?._errors}
            label="Phone"
            size="lg"
            name="phone"
            id="phone"
          />

          <Textarea
            errorMessage={state.errors.body?._errors?.join(', ')}
            isRequired
            isInvalid={!!state.errors.body?._errors}
            label="Message"
            name="body"
            size="lg"
            id="body"
          />
      
          <SubmitButton startContent={<FaPaperPlane />}>
            Send Message
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default PropertyContactForm;
