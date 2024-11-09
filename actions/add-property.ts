'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/cloudinary";

const getImageUrls = async (images: File[]) => {
  const imageUrls = [];

  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
      folder: 'accommodations',
    });
    imageUrls.push(result.secure_url);
  }

  return imageUrls;
};

async function addPropertyAction(formData: FormData) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const amenities = formData.getAll('amenities');
  const images = (formData.getAll('images') as File[]).filter((image) => image.name !== '');
  const imageUrls = await getImageUrls(images);

  const propertyData = {
    amenities,
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
    images: imageUrls,
  };

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
};

export default addPropertyAction;
