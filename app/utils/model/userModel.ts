import { Document, Schema, models, model } from "mongoose";

interface iUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface iUserData extends iUser, Document {}

const userModel = new Schema<iUserData>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserData = models.User || model("User", userModel);

export default UserData;
