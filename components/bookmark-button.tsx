'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaBookmark } from "react-icons/fa";
import bookmarkPropertyAction from "@/actions/bookmark-property";
import checkBookmarkStatus from "@/actions/check-bookmark-status";
import { Property } from "@prisma/client";

interface BookmarkButtonProps {
  property: Property;
}

const BookmarkButton = ({ property }: BookmarkButtonProps) => {
  const session = useSession();

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = async () => {
    if (!session?.data?.user?.id) {
      alert('You need to be signed in to bookmark a listing')
    } else {
      const response = await bookmarkPropertyAction(property.id);
      setIsBookmarked(response.isBookmarked);
      alert(response.message);
    }
  };

  useEffect(() => {
    if (!session?.data?.user?.id) {
      setIsLoading(false);
      return;
    }

    checkBookmarkStatus(property.id).then((res) => {
      setIsBookmarked(res.isBookmarked);
      setIsLoading(false);
    });
  }, [property.id, session?.data?.user?.id]);

  if (isLoading) {
    return (<p className="text-center">Loading...</p>);
  }

  return isBookmarked ? (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Bookmark
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Bookmark Property
    </button>
  );
};

export default BookmarkButton;