'use client';

import { useActionState } from "react";
import { useSession } from "next-auth/react";
import addMessage from "@/actions/add-message";
import SubmitMessageButton from "./submit-message-button";
import { Property } from "@prisma/client";

interface PropertyContactFormProps {
  property: Property;
}

const PropertyContactForm = ({ property }: PropertyContactFormProps) => {
  const session = useSession();
  const [state, formAction] = useActionState(addMessage, { submitted: false, error: null });

  return session?.data?.user?.id && (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {state.submitted && (
        <p className="text-green-500 mb-4">Your message has been sent</p>
      )}
      {state.error && (
        <p className="text-red-500 mb-4">{state.error}</p>
      )}
      <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
      <form action={formAction}>
        <input type="hidden" name="propertyId" id="propertyId" defaultValue={property.id} />
        <input type="hidden" name="recipientId" id="recipientId" defaultValue={property.ownerId} />
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Phone:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            name="phone"
            type="text"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message:
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
            id="body"
            name="body"
            placeholder="Enter your message"
          ></textarea>
        </div>
        <div>
          <SubmitMessageButton />
        </div>
      </form>
    </div>
  )
};

export default PropertyContactForm;
