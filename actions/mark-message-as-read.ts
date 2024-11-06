'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Message from "@/models/message";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipient.toString() !== session?.user?.id) {
    throw new Error('Unauthorized');
  }

  message.read = !message.read;
  await message.save();

  revalidatePath('/messages', 'page');

  return message.read;
};

export default markMessageAsRead;
