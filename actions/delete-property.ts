'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { revalidatePath } from "next/cache";
import cloudinary from "@/cloudinary";

async function deletePropertyAction(propertyId: string) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Error('Property No Found');
  }

  if (property.owner.toString() !== session.user.id.toString()) {
    throw new Error('Unauthorized');
  }

  await property.deleteOne();

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
