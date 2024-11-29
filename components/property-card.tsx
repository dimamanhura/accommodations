import { Button } from "@nextui-org/react";
import { Property } from "@prisma/client";
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
  property: Property;
};

const PropertyCard = ({ property }: PropertyCardProps) => {
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
    <div className="rounded-xl shadow-md relative">
      <Link href={`/properties/${property.id}`}>
        <Image
          src={`${property.images[0]}`}
          alt=""
          width={'0'}
          height={'0'}
          sizes="100vw"
          className="w-full h-auto rounded-t-xl"
        />
      </Link>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3
          className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right"
        >
          {getRateDisplay()}
        </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="md:hidden lg:inline" /> {property.beds}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
            <FaBath className="md:hidden lg:inline" /> {property.baths}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="md:hidden lg:inline" /> {property.squareFeet}
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

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarked className="text-orange-600 mt-1" />
            <span className="text-orange-700"> {property.location.city} {property.location.state} </span>
          </div>
          <Button color="primary" href={`/properties/${property.id}`} as={Link}>
            Details
          </Button>
        </div>
      </div>
    </div>
  )
};

export default PropertyCard;