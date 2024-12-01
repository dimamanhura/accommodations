'use server';

import { auth } from "@/utils/auth";
import { revalidatePath } from "next/cache";
import cloudinary from "@/utils/cloudinary";
import { db } from "@/db";

async function deletePropertyAction(propertyId: string) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const property = await db.property.findFirst({ where: { id: propertyId } });

  if (!property) {
    throw new Error('Property No Found');
  }

  if (property.ownerId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  await db.property.delete({ where: { id: propertyId } })

  const publicIds = property.images.map((imageUrl: string) => {
    const parts = imageUrl.split('/');
    return parts?.at(-1)?.split('.').at(0);
  });

  if (publicIds.length) {
    for (const publicId of publicIds) {
      await cloudinary.uploader.destroy(`accommodations/${publicId}`);
    }
  }

  revalidatePath('/', 'layout');
};

export default deletePropertyAction;
