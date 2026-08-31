"use server";

import { connectDB } from "../lib/db";
import UserModel, { toUserDTO } from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Creates a new user
 * @param formData FormData containing username and password
 * @returns a promise resolving to the created user DTO
 */
export const createUser = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await connectDB();
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    throw new Error("Username already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await UserModel.create({
    username,
    password: hashedPassword,
  });
};

/**
 * Logs in a user
 * @param formData FormData containing username and password
 * @returns a promise resolving to the user DTO
 */
export const loginUser = async (formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  await connectDB();
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid username or password");
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: "1h" });

  const cookieStore = await cookies();

  cookieStore.set({
    name: "wedding_auth_token",
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  redirect("/");
};

export const checkAuth = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("wedding_auth_token")?.value;

  if (!token) {
    return null;
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    await connectDB();
    const user = await UserModel.findById(decoded.userId);
    return user ? toUserDTO(user) : null;
  } catch (error) {
    console.error("Error verifying JWT:", error);
    return null;
  }
};
