import FeaturedPropertyCard from "./featured-property-card";
import { db } from "@/db";

const FeaturedProperties = async () => {
  const properties = await db.property.findMany({
    where: {
      isFeatured: true,
    }
  });

  return properties.length > 0 ? (
    <section className="bg-blue-50 px-4 pt-6 pb-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          Featured Properties
        </h2>  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {properties.map(property => (
            <FeaturedPropertyCard
              property={property}
              key={property.id}
            />
          ))}
        </div>
      </div>
    </section>
  ) : null;
};

export default FeaturedProperties;
