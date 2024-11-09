'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deletePropertyAction from "@/actions/delete-property";
import { IProperty } from "@/models/property";

interface ProfilePropertiesProps {
  initialProperties: IProperty[];
};

const ProfileProperties = ({ initialProperties }: ProfilePropertiesProps) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this property?');

    if (!confirmed) {
      return;
    }

    deletePropertyAction(propertyId);

    const updatedProperties = properties.filter(property => property._id !== propertyId);
    setProperties(updatedProperties);
  }

  return properties.map(property => (
    <div className="mb-10" key={property._id}>
      <Link href={`/properties/${property._id}`}>
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
      <div className="mt-2">
        <Link
          href={`/properties/${property._id}/edit`}
          className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
          type="button"
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))
};

export default ProfileProperties;