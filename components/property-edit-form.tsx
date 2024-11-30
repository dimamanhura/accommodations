'use client';

import { useActionState } from "react";
import editProperty from "@/actions/edit-property";
import {
  CheckboxGroup,
  SelectItem,
  Checkbox,
  Textarea,
  Select,
  Input,
  Chip,
} from "@nextui-org/react";
import { Property } from "@prisma/client";
import SubmitButton from "@/components/submit-button";

interface PropertyEditFormProps {
  property: Property;
};

const apartmentTypes = [
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

const amenities = [
  {
    label: 'Wifi',
    value: 'amenity_wifi'
  },
  {
    label: 'Full kitchen',
    value: 'amenity_kitchen'
  },
  {
    label: 'Washer & Dryer',
    value: 'amenity_washer_dryer'
  },
  {
    label: 'Free Parking',
    value: 'amenity_free_parking'
  },
  {
    label: 'Swimming Pool',
    value: 'amenity_pool'
  },
  {
    label: 'Hot Tub',
    value: 'amenity_hot_tub'
  },
  {
    label: '24/7 Security',
    value: 'amenity_24_7_security'
  },
  {
    label: 'Wheelchair Accessible',
    value: 'amenity_wheelchair_accessible'
  },
  {
    label: 'Elevator Access',
    value: 'amenity_elevator_access'
  },
  {
    label: 'Dishwasher',
    value: 'amenity_dishwasher'
  },
  {
    label: 'Gym/Fitness Center',
    value: 'amenity_gym_fitness_center'
  },
  {
    label: 'Air Conditioning',
    value: 'amenity_air_conditioning'
  },
  {
    label: 'Balcony/Patio',
    value: 'amenity_balcony_patio'
  },
  {
    label: 'Smart TV',
    value: 'amenity_smart_tv'
  },
  {
    label: 'Coffee Maker',
    value: 'amenity_coffee_maker'
  },
];

const PropertyEditForm = ({ property }: PropertyEditFormProps) => {
  const [state, action] = useActionState(editProperty.bind(null, property.id), {
    success: false,
    errors: {},
  });
  return (
    <form action={action}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Edit Property
      </h2>

      <Select
        defaultSelectedKeys={[property.type]}
        placeholder="Select property type"
        errorMessage={state.errors?.type?._errors?.join(', ')}
        isInvalid={!!state.errors?.type?._errors}
        isRequired
        className="mb-4"
        label="Property Type"
        name="type"
      >
        {apartmentTypes.map((apartmentType) => (
          <SelectItem key={apartmentType.value} value={apartmentType.value}>
            {apartmentType.label}
          </SelectItem>
        ))}
      </Select>

      <Input
        errorMessage={state.errors?.name?._errors?.join(', ')}
        isInvalid={!!state.errors?.name?._errors}
        defaultValue={property.name}
        placeholder="eg. Beautiful Apartment In Miami"
        isRequired
        className="mb-4"
        label="Listing Name"
        name="name"
      />

      <Textarea
        errorMessage={state.errors?.description?._errors?.join(', ')}
        isInvalid={!!state.errors?.description?._errors}
        defaultValue={property.description}
        placeholder="Add an optional description of your property"
        isRequired
        className="mb-4"
        label="Description"
        name="description"
      />

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>

        <Input
          errorMessage={state.errors?.location?.street?._errors?.join(', ')}
          isInvalid={!!state.errors?.location?.street?._errors}
          defaultValue={property.location.street}
          placeholder="Street"
          isRequired
          className="mb-4"
          label="Street"
          type="text"
          name="location.street"
        />
        
        <Input
          errorMessage={state.errors?.location?.city?._errors?.join(', ')}
          isInvalid={!!state.errors?.location?.city?._errors}
          defaultValue={property.location.city}
          placeholder="City"
          isRequired
          className="mb-4"
          label="City"
          type="text"
          name="location.city"
        />

        <Input
          errorMessage={state.errors?.location?.state?._errors?.join(', ')}
          isInvalid={!!state.errors?.location?.state?._errors}
          defaultValue={property.location.state}
          placeholder="State"
          isRequired
          className="mb-4"
          label="State"
          type="text"
          name="location.state"
        />

        <Input
          errorMessage={state.errors?.location?.zip?._errors?.join(', ')}
          isInvalid={!!state.errors?.location?.zip?._errors}
          defaultValue={property.location.zip}
          placeholder="ZIP Code"
          isRequired
          className="mb-4"
          label="ZIP Code"
          type="text"
          name="location.zip"
        />
      </div>

      <div className="flex w-full gap-4 mb-4">
        <Input
          errorMessage={state.errors?.beds?._errors?.join(', ')}
          isInvalid={!!state.errors?.beds?._errors}
          defaultValue={`${property.beds}`}
          isRequired
          label="Beds"
          type="number"
          name="beds"
          step="1"
        />
        <Input
          errorMessage={state.errors?.baths?._errors?.join(', ')}
          isInvalid={!!state.errors?.baths?._errors}
          defaultValue={`${property.baths}`}
          isRequired
          label="Baths"
          type="number"
          name="baths"
          step="1"
        />
        <Input
          errorMessage={state.errors?.squareFeet?._errors?.join(', ')}
          isInvalid={!!state.errors?.squareFeet?._errors}
          defaultValue={`${property.squareFeet}`}
          isRequired
          label="Square Feet"
          type="number"
          name="squareFeet"
          step="1"
        />
      </div>

      <CheckboxGroup
        defaultValue={property.amenities}
        errorMessage={state.errors?.amenities?._errors?.join(', ')}
        isInvalid={!!state.errors?.amenities?._errors}
        orientation="horizontal"
        className="mb-4"
        label="Amenities"
        name="amenities"
      >
        {amenities.map((amenity) => (
          <Checkbox value={amenity.value} key={amenity.value}>
            {amenity.label}
          </Checkbox>
        ))}  
      </CheckboxGroup>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Input
            errorMessage={state.errors?.rates?.weekly?._errors?.join(', ')}
            isInvalid={!!state.errors?.rates?.weekly?._errors}
            defaultValue={`${property.rates.weekly}`}
            label="Weekly"
            type="number"
            name="rates.weekly"
          />
          <Input
            errorMessage={state.errors?.rates?.monthly?._errors?.join(', ')}
            isInvalid={!!state.errors?.rates?.monthly?._errors}
            defaultValue={`${property.rates.monthly}`}
            label="Monthly"
            type="number"
            name="rates.monthly"
          />
          <Input
            errorMessage={state.errors?.rates?.nightly?._errors?.join(', ')}
            isInvalid={!!state.errors?.rates?.nightly?._errors}
            defaultValue={`${property.rates.nightly}`}
            label="Nightly"
            type="number"
            name="rates.nightly"
          />
        </div>
      </div>

      <Input
        errorMessage={state.errors?.seller?.name?._errors?.join(', ')}
        isInvalid={!!state.errors?.seller?.name?._errors}
        defaultValue={property.seller.name}
        placeholder="Name"
        isRequired
        className="mb-4"
        label="Seller Name"
        type="text"
        name="seller.name"
      />

      <Input
        errorMessage={state.errors?.seller?.email?._errors?.join(', ')}
        isInvalid={!!state.errors?.seller?.email?._errors}
        defaultValue={property.seller.email}
        placeholder="Email address"
        isRequired
        className="mb-4"
        label="Seller Email"
        type="email"
        name="seller.email"
      />

      <Input
        errorMessage={state.errors?.seller?.phone?._errors?.join(', ')}
        isInvalid={!!state.errors?.seller?.phone?._errors}
        defaultValue={property.seller.phone}
        placeholder="Phone"
        isRequired
        className="mb-4"
        label="Seller Phone"
        type="text"
        name="seller.phone"
      />

      {!!state.errors._errors?.length && (
        <Chip
          className="px-4 py-6 text-sm w-full max-w-full"
          variant="flat"
          radius="sm"
          color="danger"
          size="lg"
        >
          {state.errors._errors.join(', ')}
        </Chip>
      )}

      <div className="w-full">
        <SubmitButton>
          Edit Property
        </SubmitButton>
      </div>
    </form>
  );
};

export default PropertyEditForm;