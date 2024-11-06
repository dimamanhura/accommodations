import connectDB from "@/db/database";
import Message from "@/models/message";
import { convertToSerializableObject } from "@/utils/convert-to-object";
import { auth } from "@/auth";
import MessageCard from "@/components/message-card";

const MessagePage = async () => {
  await connectDB();
  const session = await auth();

  const readMessage = await Message
    .find({
      recipient: session?.user?.id,
      read: true,
    })
    .sort({
      createdAt: -1,
    })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const unreadMessage = await Message
    .find({
      recipient: session?.user?.id,
      read: false,
    })
    .sort({
      createdAt: -1,
    })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [ ...unreadMessage, ...readMessage ]
    .map(messageDoc => {
      const message = convertToSerializableObject(messageDoc);
      message.sender = convertToSerializableObject(messageDoc.sender);
      message.property = convertToSerializableObject(messageDoc.property);
      return message;
    });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-5 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Message</h1>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : ( 
              messages.map(message => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage