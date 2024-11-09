import PropertyEditForm from "@/components/property-edit-form";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { notFound } from "next/navigation";

interface PropertyEditPageProps {
  params: Promise<{ id: string }>;
};

const PropertyEditPage = async ({ params }: PropertyEditPageProps) => {
  const { id } = await params;

  await connectDB();

  const property = await Property.findById(id).lean();

  if (!property) {
    return notFound();
  }

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
