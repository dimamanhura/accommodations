import Image from "next/image";
import { auth } from "@/auth";
import profileDefault from '@/assets/images/profile.png';
import { notFound } from "next/navigation";
import ProfileProperties from "@/components/profile-properties";
import { fetchUserProperties } from "@/db/queries/properties";
import { User } from "@nextui-org/react";

const ProfilePage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const properties = await fetchUserProperties(session.user.id);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4">
              <User
                description={session.user.email}
                name={session.user.name}
                avatarProps={{
                  src: session?.user?.image || ''
                }}
              />
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              <ProfileProperties initialProperties={properties} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
