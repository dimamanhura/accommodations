import PropertyEditForm from "@/components/property-edit-form";
import { db } from "@/db";
import { notFound } from "next/navigation";

interface PropertyEditPageProps {
  params: Promise<{ id: string }>;
};

const PropertyEditPage = async ({ params }: PropertyEditPageProps) => {
  const { id } = await params;
  const property = await db.property.findFirst({ where: { id }});

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
