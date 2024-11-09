import { Document, Schema, Types, model, models } from 'mongoose';

export interface IProperty extends Document {
  images: string[];
  type: string;
  name: string;
  beds: number;
  baths: number;
  square_feet: number;
  description: string;
  owner: Types.ObjectId;
  amenities: string[];
  is_featured: boolean;
  seller_info: {
    name: string;
    email: string;
    phone: string;
  },
  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  },
  location: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  },
  _id: string;
};

const PropertySchema = new Schema<IProperty>({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  location: {
    street: String,
    city: String,
    state: String,
    zipcode: String, 
  },
  beds: {
    type: Number,
    required: true,
  },
  baths: {
    type: Number,
    required: true,
  },
  square_feet: {
    type: Number,
    required: true,
  },
  amenities: [
    {
      type: String,
    }
  ],
  rates: {
    nightly: Number,
    weekly: Number,
    monthly: Number,
  },
  seller_info: {
    name: String,
    email: String,
    phone: String,
  },
  images: [
    {
      type: String,
    }
  ],
  is_featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Property = models.Property || model<IProperty>('Property', PropertySchema);

export default Property;
