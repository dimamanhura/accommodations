'use server';

import { auth } from "@/utils/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

async function bookmarkPropertyAction(propertyId: string) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      bookmarks: {
      },
    },
  });

  if (!user) {
    throw new Error('User ID is required');
  }

  let isBookmarked = user.bookmarks
    .map(bookmark => bookmark.propertyId)
    .includes(propertyId);
  let message: string;

  if (isBookmarked) {
    await db.bookmark.delete({
      where: {
        userId_propertyId: {
          propertyId,
          userId: session.user.id,
        },
      },
    });
    message = 'Bookmark Removed';
    isBookmarked = false;
  } else {
    await db.bookmark.create({
      data: {
        propertyId,
        userId: session.user.id,
      },
    });
    message = 'Bookmark Added';
    isBookmarked = true;
  }

  revalidatePath('/properties/saved', 'page');

  return {
    isBookmarked,
    message,
  }
};

export default bookmarkPropertyAction;
