'use server';

import { z } from 'zod';
import { auth } from "@/auth";
import { db } from "@/db";

const addMessageSchema = z.object({
  recipientId: z.string(),
  propertyId: z.string(),
  senderId: z.string(),
  email: z.string().email().min(3).max(255),
  phone: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  body: z.string().min(3).max(1000),
});

interface AddMessageFormState {
  success?: boolean;
  errors: {
    recipientId?: {
      _errors?: string[];
    };
    propertyId?: {
      _errors?: string[];
    };
    senderId?: {
      _errors?: string[];
    };
    email?: {
      _errors?: string[];
    };
    phone?: {
      _errors?: string[];
    };
    name?: {
      _errors?: string[];
    };
    body?: {
      _errors?: string[];
    };
    _errors?: string[];
  };
};

async function addMessage(prevState: AddMessageFormState, formData: FormData): Promise<AddMessageFormState> {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    return {
      success: false,
      errors: {
        _errors: ['User ID is required']
      },
    };
  }

  const recipientId = formData.get('recipientId');

  if (session.user.id === recipientId) {
    return {
      success: false,
      errors: {
        _errors: ['You can not send a message to yourself']
      },
    };
  }

  const result = addMessageSchema.safeParse({
    recipientId,
    propertyId: formData.get('propertyId'),
    senderId: session.user.id,
    email: formData.get('email'),
    phone: formData.get('phone'),
    name: formData.get('name'),
    body: formData.get('body'),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  await db.message.create({
    data: result.data,
  });

  return {
    success: true,
    errors: {},
  };
};

export default addMessage;
