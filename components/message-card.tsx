'use client';

import { useState } from "react";
import markMessageAsRead from "@/actions/mark-message-as-read";
import deleteMessage from "@/actions/delete-message";
import { useGlobalContext } from "@/context/global-context";
import { Message, Property, User } from "@prisma/client";
import { Button, Chip } from "@nextui-org/react";

interface MessageCardProps {
  message: Message & { property: Property, sender: User };
};

const MessageCard = ({ message }: MessageCardProps) => {
  const { setUnreadCount } = useGlobalContext();
  const [isRead, setIsRead] = useState(message.read);

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message.id);
    setIsRead(read);
    setUnreadCount((prevCount: number) => read ? prevCount - 1 : prevCount + 1);
  };

  const handleDeleteClick = async () => {
    await deleteMessage(message.id);
    setUnreadCount((prevCount: number) => prevCount - 1);
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-grey-200">
      {!isRead && (
        <Chip className="absolute top-2 right-2" color="warning">New</Chip>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>{' '}
        { message.property.name }
      </h2>
      <p className="text-gray-700">{message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{' '}
          <a href={`mailto:${message.email}`} className="text-blue-500">{message.email}</a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{' '}
          <a href={`tel:${message.email}`} className="text-blue-500">{message.phone}</a>
        </li>
        <li>
          <strong>Received:</strong>{' '}
          { new Date(message.createdAt).toLocaleString() }
        </li>
        <div className="flex gap-2 mt-4">
          <Button color="primary" onClick={handleReadClick}>
            {isRead ? 'Mark As New' : 'Mark As Read'}
          </Button>
          <Button color="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
        </div>
      </ul>
    </div>
  );
};

export default MessageCard;
