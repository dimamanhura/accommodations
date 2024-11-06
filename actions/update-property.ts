'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function updatePropertyAction(propertyId: string, formData: FormData) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const existingProperty = await Property.findById(propertyId);

  if (existingProperty?.owner.toString() !== session.user.id) {
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
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      email: formData.get('seller_info.email'),
      phone: formData.get('seller_info.phone'),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData);

  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);
};

export default updatePropertyAction;
