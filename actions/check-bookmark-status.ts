'use server';

import { auth } from "@/auth";
import { db } from "@/db";

async function checkBookmarkStatus(propertyId: string) {

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

  const isBookmarked = user.bookmarks
    .map(bookmark => bookmark.propertyId)
    .includes(propertyId);

  return { isBookmarked };
};

export default checkBookmarkStatus;
