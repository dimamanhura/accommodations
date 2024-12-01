import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import PropertyHeaderImage from "@/components/property-header-image";
import PropertyContactForm from "@/components/property-contact-form";
import PropertyDetails from "@/components/property-details";
import BookmarkButton from "@/components/bookmark-button";
import PropertyImages from "@/components/property-images";
import ShareButtons from "@/components/share-buttons";
import { db } from "@/db";
import paths from "@/utils/paths";

interface PropertyPageProps {
  params: Promise<{ id: string }>;
};

const PropertyPage = async ({ params }: PropertyPageProps) => {
  const { id } = await params;
  const property = await db.property.findFirst({ where: { id }});

  if (!property) {
    return notFound();
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link href={paths.properties()} className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyDetails property={property}/>
            <aside className="space-y-4">
              <BookmarkButton property={property} />
              <ShareButtons />
              <PropertyContactForm property={property} />
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  )
};

export default PropertyPage;
