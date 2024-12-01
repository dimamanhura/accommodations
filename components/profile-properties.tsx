'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import deletePropertyAction from "@/actions/delete-property";
import { Property } from "@prisma/client";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import PropertyLocation from "@/components/property-location";
import paths from "@/utils/paths";

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
  };

  return properties.map(property => (
    <Card key={property.id}>
      <CardHeader>
        <Link className="relative w-full h-48" href={paths.propertyDetails(property.id)}>
          <Image
            className="w-full rounded-md object-cover"
            src={property.images[0]}
            alt="Property 1"
            fill
          />
        </Link>
      </CardHeader>
      <CardBody>
        <p className="text-lg font-semibold text-default-700">{property.name}</p>
        <PropertyLocation location={property.location} />
      </CardBody>

      <CardFooter className="flex justify-end gap-2">
        <Button color="primary" variant="light" href={paths.propertyEdit(property.id)} as={Link}>
          Edit
        </Button>
        <Button color="danger" variant="light" onClick={() => handleDeleteProperty(property.id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  ))
};

export default ProfileProperties;