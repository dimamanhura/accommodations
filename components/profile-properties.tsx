'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deletePropertyAction from "@/actions/delete-property";
import { Property } from "@prisma/client";
import { Button } from "@nextui-org/react";

interface ProfilePropertiesProps {
  initialProperties: Property[];
};

const ProfileProperties = ({ initialProperties }: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');

    if (!confirmed) {
      return;
    }

    deletePropertyAction(propertyId);

    const updatedProperties = properties.filter(property => property.id !== propertyId);
    setProperties(updatedProperties);
  }

  return properties.map(property => (
    <div className="mb-10" key={property.id}>
      <Link href={`/properties/${property.id}`}>
        <Image
          className="h-32 w-full rounded-md object-cover"
          src={property.images[0]}
          alt="Property 1"
          width={1000}
          height={200}
        />
      </Link>
      <div className="mt-2">
        <p className="text-lg font-semibold">{property.name}</p>
        <p className="text-gray-600">Address: {property.location.city}, {property.location.state}, {property.location.street}</p>
      </div>
      <div className="flex gap-2 mt-2">
        <Button color="primary" href={`/properties/${property.id}/edit`} as={Link}>
          Edit
        </Button>
        <Button color="danger" onClick={() => handleDeleteProperty(property.id)}>
          Delete
        </Button>
      </div>
    </div>
  ))
};

export default ProfileProperties;