import Image from "next/image";
import Link from "next/link";
import {
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarked,
  FaBath,
  FaBed,
} from "react-icons/fa";

interface PropertyCardProps {
  property: {
    images: string[];
    type: string;
    name: string;
    beds: number;
    baths: number;
    square_feet: number;
    rates: {
      weekly?: number;
      monthly?: number;
      nightly?: number;
    },
    location: {
      city: string;
      state: string;
    },
    _id: number;
  };
};

const FeaturedPropertyCard = ({ property }: PropertyCardProps) => {
  const getRateDisplay = () => {
    const { rates: { monthly, weekly, nightly } } = property;

    if (monthly) {
      return `$${monthly.toLocaleString()}/mo`;
    }

    if (weekly) {
      return `$${weekly.toLocaleString()}/wk`;
    }

    if (nightly) {
      return `$${nightly.toLocaleString()}/night`;
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row"
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src={property.images[0]}
        alt=""
        className="w-full h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl md:w-2/5"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" /> {property.square_feet}
            <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div
          className="flex justify-center gap-4 text-green-900 text-sm mb-4"
        >
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Nightly
            </p>
          )}

          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Weekly
            </p>
          )}
          
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="md:hidden lg:inline" /> Monthly
            </p>
          )}
        </div>

        <div className="border border-gray-200 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <span className="text-orange-700">
              <FaMapMarked className="text-lg text-orange-700 mr-2 inline-block" /> {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
};

export default FeaturedPropertyCard;