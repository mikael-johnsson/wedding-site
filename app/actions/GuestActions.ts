"use server";

import { redirect } from "next/navigation";
import { connectDB } from "../lib/db";
import GuestModel, { WeddingDay } from "../models/Guest";
import { revalidatePath } from "next/cache";

type PersonInput = {
	name: string;
	attending: boolean;
	allergies: string;
	mealChoice: string;
	mealChoiceFriday: string;
	notes: string;
	daysAttending: WeddingDay[];
	daysOvernighting: WeddingDay[];
	transport: string;
};

const weddingDays: WeddingDay[] = ["friday", "saturday", "sunday"];
const uuidPattern =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const isDuplicateKeyError = (error: unknown): error is { code: number } => {
	return (
		typeof error === "object" &&
		error !== null &&
		"code" in error &&
		typeof error.code === "number" &&
		error.code === 11000
	);
};

const readString = (formData: FormData, key: string) => {
	const value = formData.get(key);

	return typeof value === "string" ? value.trim() : "";
};

const readBoolean = (formData: FormData, key: string) => {
	return formData.get(key) === "yes";
};

const readDays = (formData: FormData, key: string): WeddingDay[] => {
	return formData
		.getAll(key)
		.filter((value): value is WeddingDay => {
			return (
				typeof value === "string" && weddingDays.includes(value as WeddingDay)
			);
		})
		.map((value) => value as WeddingDay);
};

const readPerson = (formData: FormData, prefix: string): PersonInput => {
	return {
		name: readString(formData, `${prefix}Name`),
		attending: readBoolean(formData, `${prefix}Attending`),
		allergies: readString(formData, `${prefix}Allergies`),
		mealChoice: readString(formData, `${prefix}MealChoice`),
		mealChoiceFriday: readString(formData, `${prefix}MealChoiceFriday`),
		notes: readString(formData, `${prefix}Notes`),
		daysAttending: readDays(formData, `${prefix}DaysAttending`),
		daysOvernighting: readDays(formData, `${prefix}DaysOvernighting`),
		transport: readString(formData, `${prefix}Transport`),
	};
};

export const saveGuestRsvp = async (formData: FormData) => {
	let redirectPath = "/?submitted=osaError";
	let submissionToken = "";

	try {
		submissionToken = readString(formData, "submissionToken");

		if (!uuidPattern.test(submissionToken)) {
			throw new Error("A valid submission token is required");
		}

		const hasPlusOne = formData.get("hasPlusOne") === "on";

		const primaryGuest = readPerson(formData, "primary");

		if (!primaryGuest.name) {
			throw new Error("Primary guest name is required");
		}

		await connectDB();

		const plusOne = hasPlusOne ? readPerson(formData, "plusOne") : undefined;

		if (hasPlusOne && !plusOne?.name) {
			throw new Error(
				"Plus one name is required when the +1 option is selected",
			);
		}

		const numberOfGuests =
			(primaryGuest.attending ? 1 : 0) + (plusOne?.attending ? 1 : 0);

		const res = await GuestModel.create({
			primaryGuest,
			plusOne,
			submissionToken,
			numberOfGuests,
			rsvpSubmittedAt: new Date(),
		});
		console.log("Res", res);

		redirectPath = primaryGuest.attending
			? "/?submitted=osaSuccess"
			: "/?submitted=osaDeclined";
	} catch (error) {
		if (isDuplicateKeyError(error) && submissionToken) {
			const existingGuest = await GuestModel.findOne({ submissionToken })
				.select("primaryGuest.attending")
				.lean();

			if (existingGuest) {
				redirectPath = existingGuest.primaryGuest.attending
					? "/?submitted=osaSuccess"
					: "/?submitted=osaDeclined";
			}
		} else {
			console.error("Error saving guest RSVP:", error);
		}
	}

	redirect(redirectPath);
};

export const deleteGuest = async (guestId: string) => {
	await connectDB();
	await GuestModel.findByIdAndDelete(guestId);
	revalidatePath("/guests");
};
