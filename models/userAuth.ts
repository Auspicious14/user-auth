const { isEmail } = require("validator");
import dotenv from "dotenv";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

dotenv.config();
const userRoleNumber = process.env.USER_ROLE_NUMBER;
const adminRoleNumber = process.env.ADMIN_ROLE_NUMBER;
const employeeRoleNumber = process.env.EMPLOYEE_ROLE_NUMBER;

const userAuthSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: isEmail,
    },
    password: { type: String, required: true, minLength: 6 },
    roles: {
      user: {
        type: String,
        default: userRoleNumber,
      },
      admin: {
        type: String,
      },
      employee: { type: String },
    },
  },
  { timestamps: true }
);

const userAuthModel = mongoose.model("userAuth", userAuthSchema);
export default userAuthModel;
