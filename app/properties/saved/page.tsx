import { auth } from "@/auth";
import PropertyCard from "@/components/property-card";
import connectDB from "@/db/database";
import { IProperty } from "@/models/property";
import User from "@/models/user";
import { notFound } from "next/navigation";

const SavedPropertiesPage = async () => {
  await connectDB();

  const session = await auth();

  const user = await User
    .findById(session?.user?.id)
    .populate<{ bookmarks: IProperty[] }>('bookmarks');

  if (!user) {
    notFound();
  }

  const { bookmarks } = user;

  return (
    <section className="px-4 py-6">
      <div className="container lg:container m-auto px-4 py-6">
        <h1 className="text-2xl mb-4">Saved properties</h1>
        {
          !bookmarks.length ? (
            <p>No Saved Properties</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {
                bookmarks.map((property) => (
                  <PropertyCard property={property} key={property._id} />
                ))
              }
            </div>
          )
        }
      </div>
    </section>
  )
};

export default SavedPropertiesPage;
