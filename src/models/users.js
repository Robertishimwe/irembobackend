import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 30,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    max: 30,
    min: 3,
  },
  gender: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    max: 50,
    min: 3,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  maritalStatus: {
    type: String,
    enum: ["MARRIED", "SINGLE", "DIVORCED", "WIDOWED"],
  },
  nationality: {
    type: String,
  },
  verificationStatus: {
    type: String,
    enum: ["VERIFIED", "UNVERIFIED", "PENDING-VERIFICATION"],
    default: "PENDING-VERIFICATION",
  },
  password: {
    required: true,
    type: String,
  },
  profilePicture: {
    type: String,
  },
  document: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    unique: true,
    sparse: true,
  },
  Role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
  },
  isMfaEnabled: {
    type: Boolean,
    default: false,
  },
  loginTokens:{
    type: Array,
  },
  CreatedDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
