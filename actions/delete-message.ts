'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId: string) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const message = await db.message.findFirst({ where: { id: messageId } });

  if (!message) {
    throw new Error('Property No Found');
  }

  if (message.recipientId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  await db.message.delete({ where: { id: messageId } });


  revalidatePath('/', 'layout');
};

export default deleteMessage;
