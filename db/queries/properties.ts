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

export const getPropertiesTotal = cache((): Promise<number> => {
  return db.property.count();
});

export const fetchProperties = cache(async ({
  pageSize,
  page,
}: {
  pageSize: string;
  page: string;
}): Promise<Property[]> => {
  await new Promise(r => setTimeout(r, 2000));
  const skip = (parseInt(page) - 1) * parseInt(pageSize);
  const take = parseInt(pageSize);
  const properties = await db.property.findMany({ skip, take });
  return properties;
});
