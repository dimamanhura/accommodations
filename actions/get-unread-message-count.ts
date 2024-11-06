'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Message from "@/models/message";

async function getUnreadMessageCount() {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const count = await Message.countDocuments({
    recipient: session.user.id,
    read: false,
  });

  return count;
};

export default getUnreadMessageCount;
