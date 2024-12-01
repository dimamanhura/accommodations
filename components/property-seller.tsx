import { formatPhone } from "@/utils/phone";
import { Link } from "@nextui-org/react";
import { Seller } from "@prisma/client";
import { FaEnvelope, FaPhone, FaUser } from "react-icons/fa";

interface PropertySellerProps {
  seller: Seller;
};

const PropertySeller = ({ seller }: PropertySellerProps) => {
  return (
    <div className="flex flex-col gap-4 text-default-500">
      <h4 className="flex items-center">
        <FaUser className="mr-4" />
        {seller.name}
      </h4>

      <Link className='text-default-500' href={`mailto:${seller.email}`}>
        <FaEnvelope className="mr-4" />
        {seller.email}
      </Link>

      <Link className='text-default-500' href={`tel:${seller.phone}`}>
        <FaPhone className="mr-4" />
        {formatPhone(seller.phone)}
      </Link>
    </div>
  );
};

export default PropertySeller;
