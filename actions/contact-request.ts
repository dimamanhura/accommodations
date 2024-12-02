'use server';

import { z } from 'zod';
import { db } from '@/db';

const createContactRequestSchema = z.object({
  message: z.string().min(3).max(1000),
  email: z.string().email().min(10).max(255),
  name: z.string().min(3).max(255),
});

interface CreateContactRequestFormState {
  success?: boolean;
  errors: {
    _errors?: string[];
    message?: {
      _errors?: string[];
    };
    email?: {
      _errors?: string[];
    };
    name?: {
      _errors?: string[];
    };
  };
};

export async function contactRequest(
  formState: CreateContactRequestFormState,
  formData: FormData
): Promise<CreateContactRequestFormState> {
  const result = createContactRequestSchema.safeParse({
    message: formData.get('message'),
    email: formData.get('email'),
    name: formData.get('name'),
  });

  if (!result.success) {
    return {
      errors: result.error.format(),
    };
  }

  try {
    await db.contactRequest.create({
      data: {
        message: result.data.message,
        email: result.data.email,
        name: result.data.name,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _errors: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _errors: ['Failed to submit contact request'],
        },
      };
    }
  }

  return {
    success: true,
    errors: {},
  };
};
