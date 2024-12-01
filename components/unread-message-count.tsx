'use client';

import { useGlobalContext } from "@/context/global-context";
import paths from "@/utils/paths";
import { Badge } from "@nextui-org/react";
import Link from "next/link";
import { FaBell } from "react-icons/fa";

const UnreadMessageCount = () => {
  const { unreadCount } = useGlobalContext();

  if (!unreadCount) {
    return null;
  }

  return (
    <Link href={paths.messages()}>
      <Badge
        content={unreadCount}
        shape="circle"
        color="danger"
      >
        <FaBell className="fill-current" size={24} />
      </Badge>
    </Link>
  );
};

export default UnreadMessageCount;
