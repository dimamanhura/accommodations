'use client';

import { Select, SelectItem, Input, Textarea, CheckboxGroup, Checkbox, Button } from "@nextui-org/react";
import addProperty from "@/actions/add-property";

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
  return (
    <form action={addProperty}>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Add Property
      </h2>

      <Select
        placeholder="Select property type"
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
        placeholder="eg. Beautiful Apartment In Miami"
        isRequired
        className="mb-4"
        label="Listing Name"
        name="name"
      />

      <Textarea
        placeholder="Add an optional description of your property"
        isRequired
        className="mb-4"
        label="Description"
        name="description"
      />

      <div className="mb-4 bg-blue-50 p-4">
        <label className="block text-gray-700 font-bold mb-2">Location</label>

        <Input
          placeholder="Street"
          isRequired
          className="mb-4"
          label="Street"
          type="text"
          name="location.street"
        />
        
        <Input
          placeholder="City"
          isRequired
          className="mb-4"
          label="City"
          type="text"
          name="location.city"
        />

        <Input
          placeholder="State"
          isRequired
          className="mb-4"
          label="State"
          type="text"
          name="location.state"
        />

        <Input
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
          isRequired
          label="Beds"
          type="number"
          name="beds"
          step="1"
        />
        <Input
          isRequired
          label="Baths"
          type="number"
          name="baths"
          step="1"
        />
        <Input
          isRequired
          label="Square Feet"
          type="number"
          name="squareFeet"
          step="1"
        />
      </div>

      <CheckboxGroup
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
            label="Weekly"
            type="number"
            name="rates.weekly"
          />
          <Input
            label="Monthly"
            type="number"
            name="rates.monthly"
          />
          <Input
            label="Nightly"
            type="number"
            name="rates.nightly"
          />
        </div>
      </div>

      <Input
        placeholder="Name"
        isRequired
        className="mb-4"
        label="Seller Name"
        type="text"
        name="seller.name"
      />

      <Input
        placeholder="Email address"
        isRequired
        className="mb-4"
        label="Seller Email"
        type="email"
        name="seller.email"
      />

      <Input
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
          isRequired
          multiple
          accept="image/*"
          type="file"
          name="images"
        />
      </div>

      <div className="w-full">
        <Button type="submit" color="primary" className="w-full">
          Add Property
        </Button>
      </div>
    </form>
  )
};

export default PropertyAddForm;
