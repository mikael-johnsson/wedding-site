import { model, models, Schema } from "mongoose";

export type WeddingDay = "friday" | "saturday" | "sunday";

type PersonInfo = {
  name: string;
  attending: boolean;
  allergies?: string;
  mealChoice: string;
  notes?: string;
  daysAttending: WeddingDay[];
  daysOvernighting: WeddingDay[];
  transport: string;
};

export type Guest = {
  primaryGuest: PersonInfo;
  plusOne?: PersonInfo;
  rsvpSubmittedAt?: Date;
  updatedAt?: Date;
  numberOfGuests: number;
  _id: string;
};

const personInfoSchema = new Schema<PersonInfo>(
  {
    name: { type: String, required: true, trim: true },
    attending: { type: Boolean, required: true, default: false },
    allergies: { type: String, required: false, default: "" },
    mealChoice: { type: String, required: true, default: "" },
    notes: { type: String, default: "" },
    daysAttending: {
      type: [String],
      required: true,
      default: [],
      enum: ["friday", "saturday", "sunday"],
    },
    daysOvernighting: {
      type: [String],
      required: true,
      default: [],
      enum: ["friday", "saturday", "sunday"],
    },
    transport: { type: String, required: false, default: "" },
  },
  { _id: false },
);

const guestSchema = new Schema<Guest>(
  {
    primaryGuest: { type: personInfoSchema, required: true },
    plusOne: { type: personInfoSchema, required: false },
    rsvpSubmittedAt: { type: Date },
    updatedAt: { type: Date, default: Date.now },
    numberOfGuests: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const GuestModel = models.Guest || model<Guest>("Guest", guestSchema);

export default GuestModel;
