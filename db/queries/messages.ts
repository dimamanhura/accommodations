import { cache } from "react";
import type { Message } from "@prisma/client";
import { db } from "@/db";

export const fetchMessages = cache((userId: string, read: boolean): Promise<Message[]> => {
  return db.message
    .findMany({
      include: {
        property: {},
        sender: {},
      },
      where: {
        recipientId: userId,
        read,
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
});
