"use server";

import { redirect } from "next/navigation";
import { connectDB } from "../lib/db";
import GuestModel from "../models/Guest";
import { revalidatePath } from "next/cache";

type PersonInput = {
  name: string;
  attending: boolean;
  allergies: string;
  mealChoice: string;
  notes: string;
};

const readString = (formData: FormData, key: string) => {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
};

const readBoolean = (formData: FormData, key: string) => {
  return formData.get(key) === "yes";
};

const readPerson = (formData: FormData, prefix: string): PersonInput => {
  return {
    name: readString(formData, `${prefix}Name`),
    attending: readBoolean(formData, `${prefix}Attending`),
    allergies: readString(formData, `${prefix}Allergies`),
    mealChoice: readString(formData, `${prefix}MealChoice`),
    notes: readString(formData, `${prefix}Notes`),
  };
};

export const saveGuestRsvp = async (formData: FormData) => {
  const hasPlusOne = formData.get("hasPlusOne") === "on";

  const primaryGuest = readPerson(formData, "primary");

  if (!primaryGuest.name) {
    throw new Error("Primary guest name is required");
  }

  await connectDB();

  const plusOne = hasPlusOne ? readPerson(formData, "plusOne") : undefined;

  if (hasPlusOne && !plusOne?.name) {
    throw new Error("Plus one name is required when the +1 option is selected");
  }

  const numberOfGuests =
    (primaryGuest.attending ? 1 : 0) + (plusOne?.attending ? 1 : 0);

  await GuestModel.create({
    primaryGuest,
    plusOne,
    numberOfGuests,
    rsvpSubmittedAt: new Date(),
  });

  redirect("/osa?submitted=1");
};

export const deleteGuest = async (guestId: string) => {
  await connectDB();
  await GuestModel.findByIdAndDelete(guestId);
  revalidatePath("/guests");
};
