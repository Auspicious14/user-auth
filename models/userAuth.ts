import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  roles: [{ type: String }],
});

const userAuthModel = mongoose.model("userAuth", userAuthSchema);
export default userAuthModel;
