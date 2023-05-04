import mongoose from "mongoose";

export interface UserInterface extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password:string;
}