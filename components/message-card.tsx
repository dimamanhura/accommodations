'use client';

import { useState } from "react";
import NextLink from "next/link";
import markMessageAsRead from "@/actions/mark-message-as-read";
import deleteMessage from "@/actions/delete-message";
import { useGlobalContext } from "@/context/global-context";
import { Message, Property, User as UserModel } from "@prisma/client";
import { Button, Card, CardBody, CardFooter, Link, Chip, User } from "@nextui-org/react";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { formatPhone } from "@/utils/phone";

interface MessageCardProps {
  message: Message & { property: Property, sender: UserModel };
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
    <Card className="relative bg-white p-4 rounded-md shadow-md border border-grey-200">
      {!isRead && (
        <Chip className="absolute top-2 right-2" variant="flat" radius="sm" color="primary">New</Chip>
      )}

      <CardBody>
        <NextLink href={`/properties/${message.property.id}`}>
          <User
            className="justify-start"
            description={`${message.name}, ${new Date(message.createdAt).toLocaleString()}`}
            avatarProps={{
              radius: 'sm',
              src: message.property.images[0] || ''
            }}
            name={message.property.name}
          />
        </NextLink>
        
        <p className="text-default-400 text-small mt-4">
          {message.body}
        </p>

        <div className="flex gap-4 justify-start mt-4 text-small">
          <Link href={`mailto:${message.email}`} color="primary">
            <FaEnvelope className="mr-2" />
            {message.email}
          </Link>

          <Link href={`tel:${message.phone}`} color="primary">
            <FaPhone className="mr-2" />
            {formatPhone(message.phone)}
          </Link>
        </div>

      </CardBody>
      <CardFooter>
        <Button variant="light" color="primary" onClick={handleReadClick}>
          {isRead ? 'Mark As New' : 'Mark As Read'}
        </Button>
        <Button variant="light" color="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
