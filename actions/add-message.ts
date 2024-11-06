'use server';

import { auth } from "@/auth";
import connectDB from "@/db/database";
import Message from "@/models/message";

async function addMessageAction(prevState: any, formData: FormData) {
  await connectDB();

  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    throw new Error('User ID is required');
  }

  const recipient = formData.get('recipient');

  if (session.user.id === recipient) {
    return {
      submitted: false,
      error: 'You can not send a message to yourself',
    };
  }

  const newMessage = new Message({
    property: formData.get('property'),
    recipient,
    sender: session.user.id,
    email: formData.get('email'),
    phone: formData.get('phone'),
    name: formData.get('name'),
    body: formData.get('body'),
  });

  await newMessage.save();

  return {
    submitted: true,
    error: null,
  };
};

export default addMessageAction;
