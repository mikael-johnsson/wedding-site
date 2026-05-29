import { model, models, Schema } from "mongoose";

export type User = {
  username: string;
  password: string;
};

export type UserDTO = {
  username: string;
};

export const toUserDTO = (user: User): UserDTO => {
  return {
    username: user.username,
  };
};

const userSchema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const UserModel = models.User || model<User>("User", userSchema);

export default UserModel;
