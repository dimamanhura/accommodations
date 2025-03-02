import { auth } from "@/utils/auth";
import MessageCard from "@/components/message-card";
import { fetchMessages } from "@/db/queries/messages";
import { notFound } from "next/navigation";

const ProfileMessagesPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const readMessage = await fetchMessages(session?.user?.id, true);
  const unreadMessage = await fetchMessages(session?.user?.id, false);;

  const messages = [ ...unreadMessage, ...readMessage ];

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
                <MessageCard
                  key={message.id}
                  message={message} 
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileMessagesPage;
