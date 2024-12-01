'use server';

import { auth } from "@/utils/auth";
import { db } from "@/db";

async function getUnreadMessageCount() {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const count = await db.message.count({
    where: {
      recipientId: session.user.id,
      read: false,
    },
  });

  return count;
};

export default getUnreadMessageCount;
