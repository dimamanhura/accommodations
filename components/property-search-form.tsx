'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

const apartmentTypes = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'Apartment',
    label: 'Apartment',
  },
  {
    value: 'Condo',
    label: 'Condo',
  },
  {
    value: 'House',
    label: 'House',
  },
  {
    value: 'Cabin or Cottage',
    label: 'CabinOrCottage',
  },
  {
    value: 'Room',
    label: 'Room',
  },
  {
    value: 'Studio',
    label: 'Studio',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

interface PropertySearchFormProps {
  propertyType?: string;
  location?: string;
}

export const PropertySearchForm = (props: PropertySearchFormProps) => {
  const [location, setLocation] = useState(props.location || '');
  const [propertyType, setPropertyType] = useState(props.propertyType || '');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (location === '' && propertyType === 'All') {
      router.push('/properties')
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results/${query}`)
    }
  };

  return (
    <form
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row gap-4 items-center"
      onSubmit={handleSubmit}
    >
      <Input
        placeholder="Enter Location (City, State, Zip, etc)"
        label="Location"
        value={location}
        type="text"
        onChange={(e) => setLocation(e.target.value)}
      />

      <Select
        defaultSelectedKeys={propertyType ? [propertyType] : []}
        placeholder="Select Property Type"
        label="Property Type"
        onChange={(e) => setPropertyType(e.target.value)}
      >
        {apartmentTypes.map((apartmentType) => (
          <SelectItem key={apartmentType.value}>
            {apartmentType.label}
          </SelectItem>
        ))}
      </Select>

      <Button size="lg" type="submit">
        Search
      </Button>
    </form>
  )
};

export default PropertySearchForm;
