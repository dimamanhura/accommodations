'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import { Property } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updatePropertyAction(propertyId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const existingProperty = await db.property.findFirst({ where: { id: propertyId } });

  if (existingProperty?.ownerId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const propertyData = {
    amenities: formData.getAll('amenities'),
    owner: session.user.id,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zip: formData.get('location.zip'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    squareFeet: formData.get('squareFeet'),
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller: {
      name: formData.get('seller.name'),
      email: formData.get('seller.email'),
      phone: formData.get('seller.phone'),
    },
  };

  await db.property.update({
    data: propertyData as unknown as Property,
    where: {
      id: propertyId,
    },
  });

  revalidatePath('/', 'layout');
  redirect(`/properties/${propertyId}`);
};

export default updatePropertyAction;
