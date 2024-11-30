'use client';

import { useActionState } from "react";
import { Select, SelectItem, Input, Textarea, CheckboxGroup, Checkbox, Chip } from "@nextui-org/react";
import addProperty from "@/actions/add-property";
import SubmitButton from "@/components/submit-button";

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

const PropertyAddForm = () => {
  const [state, action] = useActionState(addProperty, {
    success: false,
    errors: {},
  });

  return (
    <form action={action}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Add Property
      </h2>

      <Select
        errorMessage={state.errors.type?._errors?.join(', ')}
        placeholder="Select property type"
        isInvalid={!!state.errors.type?._errors}
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
        errorMessage={state.errors.name?._errors?.join(', ')}
        isInvalid={!!state.errors.name?._errors}
        placeholder="eg. Beautiful Apartment In Miami"
        isRequired
        className="mb-4"
        label="Listing Name"
        name="name"
      />

      <Textarea
        errorMessage={state.errors.description?._errors?.join(', ')}
        isInvalid={!!state.errors.description?._errors}
        placeholder="Add an optional description of your property"
        isRequired
        className="mb-4"
        label="Description"
        name="description"
      />

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>

        <Input
          errorMessage={state.errors.location?.street?._errors?.join(', ')}
          isInvalid={!!state.errors.location?.street?._errors}
          placeholder="Street"
          isRequired
          className="mb-4"
          label="Street"
          type="text"
          name="location.street"
        />
        
        <Input
          errorMessage={state.errors.location?.city?._errors?.join(', ')}
          isInvalid={!!state.errors.location?.city?._errors}
          placeholder="City"
          isRequired
          className="mb-4"
          label="City"
          type="text"
          name="location.city"
        />

        <Input
          errorMessage={state.errors.location?.state?._errors?.join(', ')}
          isInvalid={!!state.errors.location?.state?._errors}
          placeholder="State"
          isRequired
          className="mb-4"
          label="State"
          type="text"
          name="location.state"
        />

        <Input
          errorMessage={state.errors.location?.zip?._errors?.join(', ')}
          isInvalid={!!state.errors.location?.zip?._errors}
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
          errorMessage={state.errors.beds?._errors?.join(', ')}
          isInvalid={!!state.errors.beds?._errors}
          isRequired
          label="Beds"
          type="number"
          name="beds"
          step="1"
        />
        <Input
          errorMessage={state.errors.baths?._errors?.join(', ')}
          isInvalid={!!state.errors.baths?._errors}
          isRequired
          label="Baths"
          type="number"
          name="baths"
          step="1"
        />
        <Input
          errorMessage={state.errors.squareFeet?._errors?.join(', ')}
          isInvalid={!!state.errors.squareFeet?._errors}
          isRequired
          label="Square Feet"
          type="number"
          name="squareFeet"
          step="1"
        />
      </div>

      <CheckboxGroup
        errorMessage={state.errors.amenities?._errors?.join(', ')}
        orientation="horizontal"
        isInvalid={!!state.errors.amenities?._errors}
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
            errorMessage={state.errors.rates?.weekly?._errors?.join(', ')}
            isInvalid={!!state.errors.rates?.weekly?._errors}
            label="Weekly"
            type="number"
            name="rates.weekly"
          />
          <Input
            errorMessage={state.errors.rates?.monthly?._errors?.join(', ')}
            isInvalid={!!state.errors.rates?.monthly?._errors}
            label="Monthly"
            type="number"
            name="rates.monthly"
          />
          <Input
            errorMessage={state.errors.rates?.nightly?._errors?.join(', ')}
            isInvalid={!!state.errors.rates?.nightly?._errors}
            label="Nightly"
            type="number"
            name="rates.nightly"
          />
        </div>
      </div>

      <Input
        errorMessage={state.errors.seller?.name?._errors?.join(', ')}
        isInvalid={!!state.errors.seller?.name?._errors}
        placeholder="Name"
        isRequired
        className="mb-4"
        label="Seller Name"
        type="text"
        name="seller.name"
      />

      <Input
        errorMessage={state.errors.seller?.email?._errors?.join(', ')}
        isInvalid={!!state.errors.seller?.email?._errors}
        placeholder="Email address"
        isRequired
        className="mb-4"
        label="Seller Email"
        type="email"
        name="seller.email"
      />

      <Input
        errorMessage={state.errors.seller?.phone?._errors?.join(', ')}
        isInvalid={!!state.errors.seller?.phone?._errors}
        placeholder="Phone"
        isRequired
        className="mb-4"
        label="Seller Phone"
        type="text"
        name="seller.phone"
      />

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
         Images (Select up to 4 images)
        </label>

        <Input
          errorMessage={state.errors.images?._errors?.join(', ')}
          isInvalid={!!state.errors.images?._errors}
          isRequired
          multiple
          accept="image/*"
          type="file"
          name="images"
        />
      </div>

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

      {!!state.errors.ownerId?._errors && (
        <Chip
          className="px-4 py-6 text-sm w-full max-w-full"
          variant="flat"
          radius="sm"
          color="danger"
          size="lg"
        >
          {state.errors.ownerId._errors.join(', ')}
        </Chip>
      )}

      <div className="w-full">
        <SubmitButton>
          Add Property
        </SubmitButton>
      </div>
    </form>
  );
};

export default PropertyAddForm;
