'use server';

import { z } from 'zod';
import { auth } from "@/auth";
import { db } from "@/db";

const propertySchema = z.object({
  recipientId: z.string(),
  propertyId: z.string(),
  senderId: z.string(),
  email: z.string().email().min(3).max(255),
  phone: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  body: z.string().min(3).max(1000),
});

async function addMessage(prevState: { submitted: boolean, error: string | null }, formData: FormData) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const recipientId = formData.get('recipientId');

  if (session.user.id === recipientId) {
    return {
      submitted: false,
      error: 'You can not send a message to yourself',
    };
  }

  const result = propertySchema.safeParse({
    recipientId,
    propertyId: formData.get('propertyId'),
    senderId: session.user.id,
    email: formData.get('email'),
    phone: formData.get('phone'),
    name: formData.get('name'),
    body: formData.get('body'),
  });

  if (!result.success) {
    throw new Error('Invalid data');
  }

  await db.message.create({
    data: result.data,
  });

  return {
    submitted: true,
    error: null,
  };
};

export default addMessage;
