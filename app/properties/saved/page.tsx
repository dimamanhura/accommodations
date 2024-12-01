import { auth } from "@/utils/auth";
import PropertyCard from "@/components/property-card";
import { db } from "@/db";
import { notFound } from "next/navigation";

const SavedPropertiesPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return notFound();
  }

  const bookmarks = await db.bookmark.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      property: {},
    }
  });

  if (!bookmarks) {
    return notFound();
  }

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
                bookmarks.map((bookmark) => (
                  <PropertyCard
                    property={bookmark.property}
                    key={bookmark.id}
                  />
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
