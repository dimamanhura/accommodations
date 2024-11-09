'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import User from "@/models/user";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

async function bookmarkPropertyAction(propertyId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const user = await User.findById(session.user.id);

  if (!user) {
    throw new Error('User ID is required');
  }

  let isBookmarked = user.bookmarks
    .map(bookmark => bookmark.toString())
    .includes(propertyId);
  let message: string;

  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    user.bookmarks.push(new mongoose.Types.ObjectId(propertyId));
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
