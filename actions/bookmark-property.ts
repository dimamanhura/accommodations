'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

async function bookmarkPropertyAction(propertyId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const user = await User.findById(session.user.id);
  let isBookmarked = user.bookmarks.includes(propertyId);
  let message: string;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = 'Bookmark Added';
    isBookmarked = true;
  }


  await user.save();

  revalidatePath('/properties/saved', 'page');

  return {
    isBookmarked,
    message,
  }
};

export default bookmarkPropertyAction;
