'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Message from "@/models/message";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new Error('Property No Found');
  }

  if (message.recipient.toString() !== session.user.id.toString()) {
    throw new Error('Unauthorized');
  }

  await message.deleteOne();


  revalidatePath('/', 'layout');
};

export default deleteMessage;
