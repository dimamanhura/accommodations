'use server';

import { z } from 'zod';
import { auth } from "@/auth";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const updatePropertySchema = z.object({
  description: z.string().min(3).max(1000),
  amenities: z.array(z.string()),
  ownerId: z.string(),
  type: z.string().min(3).max(255),
  name: z.string().min(3).max(255),
  squareFeet: z.number().positive().min(1),
  beds: z.number().positive().min(1),
  baths: z.number().positive().min(1),
  location: z.object({
    street: z.string().min(3).max(255),
    state: z.string().min(3).max(255),
    city: z.string().min(3).max(255),
    zip: z.string().min(3).max(255),
  }),
  rates: z.object({
    nightly: z.number().positive().min(1), 
    weekly: z.number().positive().min(1),
    monthly: z.number().positive().min(1),
  }),
  seller: z.object({
    phone: z.string().min(3).max(255),
    email: z.string().email().min(3).max(255),
    name: z.string().min(3).max(255),
  }),
});

async function updateProperty(propertyId: string, formData: FormData) {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const existingProperty = await db.property.findFirst({ where: { id: propertyId } });

  if (existingProperty?.ownerId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const result = updatePropertySchema.safeParse({
    amenities: formData.getAll('amenities'),
    ownerId: session.user.id,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      state: formData.get('location.state'),
      city: formData.get('location.city'),
      zip: formData.get('location.zip'),
    },
    beds: parseInt(formData.get('beds') as string),
    baths: parseInt(formData.get('baths') as string),
    squareFeet: parseInt(formData.get('squareFeet') as string),
    rates: {
      nightly: parseInt(formData.get('rates.nightly') as string), 
      weekly: parseInt(formData.get('rates.weekly') as string),
      monthly: parseInt(formData.get('rates.monthly') as string),
    },
    seller: {
      phone: formData.get('seller.phone'),
      email: formData.get('seller.email'),
      name: formData.get('seller.name'),
    },
  });

  if (!result.success) {
    throw new Error('Invalid data');
  }

  await db.property.update({
    data: result.data,
    where: {
      id: propertyId,
    },
  });

  revalidatePath('/', 'layout');
  redirect(`/properties/${propertyId}`);
};

export default updateProperty;
