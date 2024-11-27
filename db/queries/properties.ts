import { cache } from "react";
import type { Property } from "@prisma/client";
import { db } from "@/db";

export const fetchUserProperties = cache((userId: string): Promise<Property[]> => {
  return db.property.findMany({
    where: {
      ownerId: userId,
    },
  })
});
