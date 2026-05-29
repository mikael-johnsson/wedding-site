import { model, models, Schema } from "mongoose";

type PersonInfo = {
  name: string;
  attending: boolean;
  allergies: string;
  mealChoice?: string;
  notes?: string;
};

export type Guest = {
  primaryGuest: PersonInfo;
  plusOne?: PersonInfo;
  rsvpSubmittedAt?: Date;
  updatedAt?: Date;
  _id: string;
};

const personInfoSchema = new Schema<PersonInfo>(
  {
    name: { type: String, required: true, trim: true },
    attending: { type: Boolean, required: true, default: false },
    allergies: { type: String, required: true, default: "" },
    mealChoice: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { _id: false },
);

const guestSchema = new Schema<Guest>(
  {
    primaryGuest: { type: personInfoSchema, required: true },
    plusOne: { type: personInfoSchema, required: false },
    rsvpSubmittedAt: { type: Date },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const GuestModel = models.Guest || model<Guest>("Guest", guestSchema);

export default GuestModel;
