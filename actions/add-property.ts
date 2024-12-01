'use server';

import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import cloudinary from "@/utils/cloudinary";
import { auth } from "@/utils/auth";
import { db } from "@/db";

const addPropertySchema = z.object({
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
    nightly: z.number().positive().optional().nullable(), 
    weekly: z.number().positive().optional().nullable(),
    monthly: z.number().positive().optional().nullable(),
  }),
  seller: z.object({
    phone: z.string().min(3).max(255),
    email: z.string().email().min(3).max(255),
    name: z.string().min(3).max(255),
  }),
  images: z.array(z.string()).min(3).max(10),
});

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

interface AddPropertyFormState {
  success?: boolean;
  errors: {
     _errors?: string[];
    description?: {
      _errors?: string[];
    };
    amenities?: {
      _errors?: string[];
    };
    ownerId?: {
      _errors?: string[];
    }; 
    type?:{
      _errors?: string[];
    };
    name?: {
      _errors?: string[];
    };
    squareFeet?: {
      _errors?: string[];
    };
    beds?: {
      _errors?: string[];
    };
    baths?: {
      _errors?: string[];
    };
    location?: {
      _errors?: string[];
      street?: {
        _errors?: string[];
      };
      state?:{
        _errors?: string[];
      };
      city?: {
        _errors?: string[];
      };
      zip?: {
      _errors?: string[];
    };
    };
    rates?: {
      _errors?: string[];
      nightly?: {
        _errors?: string[];
      };
      weekly?: {
        _errors?: string[];
      };
      monthly?: {
        _errors?: string[];
      };
    };
    seller?: {
      _errors?: string[];
      phone?: {
        _errors?: string[];
      };
      email?: {
        _errors?: string[];
      };
      name?: {
        _errors?: string[];
      };
    };
    images?: {
      _errors?: string[];
    }
  };
};

async function addProperty(prevState: AddPropertyFormState, formData: FormData): Promise<AddPropertyFormState> {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    return {
      success: false,
      errors: {
        _errors: ['User ID is required'],
      },
    };
  }

  const amenities = formData.getAll('amenities');
  const images = (formData.getAll('images') as File[]).filter((image) => image.name !== '');
  const imageUrls = await getImageUrls(images);

  const result = addPropertySchema.safeParse({
    amenities,
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
      nightly: formData.get('rates.nightly')
        ? parseInt(formData.get('rates.nightly') as string)
        : null, 
      weekly: formData.get('rates.weekly') 
        ? parseInt(formData.get('rates.weekly') as string)
        : null,
      monthly: formData.get('rates.monthly')
        ? parseInt(formData.get('rates.monthly') as string)
        : null,
    },
    seller: {
      phone: formData.get('seller.phone'),
      email: formData.get('seller.email'),
      name: formData.get('seller.name'),
    },
    images: imageUrls,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.format(),
    };
  }

  const newProperty = await db.property.create({
    data: result.data,
  });

  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty.id}`);

  return {
    success: true,
    errors: {},
  };
};

export default addProperty;
