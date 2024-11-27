'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId: string) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const message = await db.message.findFirst({ where: { id: messageId } });

  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipientId !== session?.user?.id) {
    throw new Error('Unauthorized');
  }

  await db.message.update({ 
    data: {
      read: !message.read,
    },
    where: {
      id: messageId,
    },
  });

  revalidatePath('/messages', 'page');

  return !message.read;
};

export default markMessageAsRead;
