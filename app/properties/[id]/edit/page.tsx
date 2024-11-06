import PropertyEditForm from "@/components/property-edit-form";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { convertToSerializableObject } from "@/utils/convert-to-object";
import { notFound } from "next/navigation";

interface PropertyPageProps {
  params: {
    id: string;
  };
};

const PropertyEditPage = async ({ params }: PropertyPageProps) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();

  if (!propertyDoc) {
    return notFound();
  }

  const property = convertToSerializableObject(propertyDoc);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb04 shadow-md rounded-md border m-4 md:m-0">
          <PropertyEditForm property={property} />
        </div>
      </div>
    </section>
  )
};

export default PropertyEditPage;
