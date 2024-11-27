import { auth } from "@/auth";
import PropertyCard from "@/components/property-card";
import { db } from "@/db";
import { notFound } from "next/navigation";

const SavedPropertiesPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const user = await db.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      bookmarks: {},
    }
  });

  if (!user) {
    return notFound();
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
                  <PropertyCard property={property} key={property.id} />
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
