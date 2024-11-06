import Link from "next/link";
import PropertyCard from "@/components/property-card";
import PropertySearchForm from "@/components/property-search-form";
import connectDB from "@/db/database";
import Property from "@/models/property";
import { convertToSerializableObject } from "@/utils/convert-to-object";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({ searchParams: { location, propertyType } }) => {
  await connectDB();

  const locationPattern = new RegExp(location, 'i');
  
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location.state': locationPattern },
      { 'location.zipcode': locationPattern },
    ]
  };

  if (propertyType && propertyType !== 'All') {
    const typePattern = new RegExp(propertyType, 'i');
    query.type = typePattern;
  }

  const propertiesDocs = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesDocs);

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
                <PropertyCard property={property} key={property._id}/>
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
