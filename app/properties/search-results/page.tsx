import { FaArrowAltCircleLeft } from "react-icons/fa";
import Link from "next/link";
import PropertySearchForm from "@/components/property-search-form";
import PropertyCard from "@/components/property-card";
import { db } from "@/db";

interface SearchResultsPageProps {
  searchParams: Promise<{ propertyType?: string; location: string; }>;
};

const SearchResultsPage = async ({ searchParams }: SearchResultsPageProps) => {
  const { location, propertyType } = await searchParams;
  const properties = await db.property.findMany({
    where: {
      type: {
        contains: propertyType && propertyType !== 'All'
          ? propertyType
          : '',
        mode: 'insensitive',
      },
      OR: [
        {
          name: {
            contains: location,
            mode: 'insensitive',
          },
          description: {
            contains: location,
             mode: 'insensitive',
          },

        },
        // { 'location.street': locationPattern },
        // { 'location.city': locationPattern },
        // { 'location.state': locationPattern },
        // { 'location.zip': locationPattern },
      ],
    }
  });

  return (
    <>
      <section className="bg-blue-700 py-2">
        <div className="max-2-7xl mx-auto px-4 flex flex-col items-start lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link href="/properties" className="flex items-center text-blue-500 hover:underline mb-3">
            <FaArrowAltCircleLeft className="mr-2 mb-1" /> Back To Properties
          </Link>
          <h1 className="text-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No Search Results</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-col-3 gap-6">
              {
                properties.map(property => (
                  <PropertyCard
                    property={property}
                    key={property.id}
                  />
                ))
              }
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
