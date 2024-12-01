'use client';

import { useFormState } from "react-dom";
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
import FormSection from "@/components/form-section";
import amenities from '@/amenities';
import types from '@/types';

interface PropertyEditFormProps {
  property: Property;
};

const PropertyEditForm = ({ property }: PropertyEditFormProps) => {
  const [state, action] = useFormState(editProperty.bind(null, property.id), {
    success: false,
    errors: {},
  });
  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <h2 className="text-3xl text-center font-semibold">
          Edit Property
        </h2>

        <FormSection>
          <Select
            defaultSelectedKeys={[property.type]}
            errorMessage={state.errors.type?._errors?.join(', ')}
            placeholder="Select property type"
            isInvalid={!!state.errors.type?._errors}
            isRequired
            label="Property Type"
            name="type"
          >
            {types.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </Select>

          <Input
            defaultValue={property.name}
            errorMessage={state.errors.name?._errors?.join(', ')}
            isInvalid={!!state.errors.name?._errors}
            placeholder="eg. Beautiful Apartment In Miami"
            isRequired
            label="Listing Name"
            name="name"
          />

          <Textarea
            defaultValue={property.description}
            errorMessage={state.errors.description?._errors?.join(', ')}
            isInvalid={!!state.errors.description?._errors}
            placeholder="Add an optional description of your property"
            isRequired
            label="Description"
            name="description"
          />
        </FormSection>

        <FormSection title="Location">
          <Input
            defaultValue={property.location.street}
            errorMessage={state.errors.location?.street?._errors?.join(', ')}
            isInvalid={!!state.errors.location?.street?._errors}
            placeholder="Street"
            isRequired
            label="Street"
            type="text"
            name="location.street"
          />
          
          <Input
            defaultValue={property.location.city}
            errorMessage={state.errors.location?.city?._errors?.join(', ')}
            isInvalid={!!state.errors.location?.city?._errors}
            placeholder="City"
            isRequired
            label="City"
            type="text"
            name="location.city"
          />

          <Input
            defaultValue={property.location.state}
            errorMessage={state.errors.location?.state?._errors?.join(', ')}
            isInvalid={!!state.errors.location?.state?._errors}
            placeholder="State"
            isRequired
            label="State"
            type="text"
            name="location.state"
          />

          <Input
            defaultValue={property.location.zip}
            errorMessage={state.errors.location?.zip?._errors?.join(', ')}
            isInvalid={!!state.errors.location?.zip?._errors}
            placeholder="ZIP Code"
            isRequired
            label="ZIP Code"
            type="text"
            name="location.zip"
          />
        </FormSection>

        <FormSection title="Facilities">
          <div className="flex w-full gap-4">
            <Input
              defaultValue={`${property.beds}`}
              errorMessage={state.errors.beds?._errors?.join(', ')}
              isInvalid={!!state.errors.beds?._errors}
              isRequired
              label="Beds"
              type="number"
              name="beds"
              step="1"
            />
            <Input
              defaultValue={`${property.baths}`}
              errorMessage={state.errors.baths?._errors?.join(', ')}
              isInvalid={!!state.errors.baths?._errors}
              isRequired
              label="Baths"
              type="number"
              name="baths"
              step="1"
            />
            <Input
            defaultValue={`${property.squareFeet}`}
              errorMessage={state.errors.squareFeet?._errors?.join(', ')}
              isInvalid={!!state.errors.squareFeet?._errors}
              isRequired
              label="Square Feet"
              type="number"
              name="squareFeet"
              step="1"
            />
          </div>
        </FormSection>

        <FormSection title="Amenities">
          <CheckboxGroup
            defaultValue={property.amenities}
            errorMessage={state.errors.amenities?._errors?.join(', ')}
            classNames={{
              wrapper: "grid grid-cols-3 gap-2"
            }}
            isInvalid={!!state.errors.amenities?._errors}
            name="amenities"
          >
            {amenities.map((amenity) => (
              <Checkbox value={amenity.value} key={amenity.value}>
                {amenity.label}
              </Checkbox>
            ))}  
          </CheckboxGroup>
        </FormSection>

        <FormSection title="Rates (Leave blank if not applicable)">
          <div className="flex w-full gap-4">
            <Input
              defaultValue={`${property.rates.weekly}`}
              errorMessage={state.errors.rates?.weekly?._errors?.join(', ')}
              isInvalid={!!state.errors.rates?.weekly?._errors}
              label="Weekly"
              type="number"
              name="rates.weekly"
            />
            <Input
              defaultValue={`${property.rates.monthly}`}
              errorMessage={state.errors.rates?.monthly?._errors?.join(', ')}
              isInvalid={!!state.errors.rates?.monthly?._errors}
              label="Monthly"
              type="number"
              name="rates.monthly"
            />
            <Input
              defaultValue={`${property.rates.nightly}`}
              errorMessage={state.errors.rates?.nightly?._errors?.join(', ')}
              isInvalid={!!state.errors.rates?.nightly?._errors}
              label="Nightly"
              type="number"
              name="rates.nightly"
            />
          </div>
        </FormSection>

        <FormSection title="Seller">
          <Input
            defaultValue={property.seller.name}
            errorMessage={state.errors.seller?.name?._errors?.join(', ')}
            isInvalid={!!state.errors.seller?.name?._errors}
            placeholder="Name"
            isRequired
            label="Seller Name"
            type="text"
            name="seller.name"
          />

          <Input
            defaultValue={property.seller.email}
            errorMessage={state.errors.seller?.email?._errors?.join(', ')}
            isInvalid={!!state.errors.seller?.email?._errors}
            placeholder="Email address"
            isRequired
            label="Seller Email"
            type="email"
            name="seller.email"
          />

          <Input
            defaultValue={property.seller.phone}
            errorMessage={state.errors.seller?.phone?._errors?.join(', ')}
            isInvalid={!!state.errors.seller?.phone?._errors}
            placeholder="Phone"
            isRequired
            label="Seller Phone"
            type="text"
            name="seller.phone"
          />
        </FormSection>

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

        <SubmitButton>Edit Property</SubmitButton>
      </div>
    </form>
  );
};

export default PropertyEditForm;