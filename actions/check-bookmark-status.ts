'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import User from "@/models/user";

async function checkBookmarkStatus(propertyId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const user = await User.findById(session.user.id);
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
};

export default checkBookmarkStatus;
