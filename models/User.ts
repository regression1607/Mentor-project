import mongoose, { Schema, type Document, type Model } from "mongoose"
import type { UserRole } from "@/types/auth"

export interface IUser extends Document {
  _id: string | mongoose.Types.ObjectId
  name: string
  email: string
  image?: string
  emailVerified?: Date
  role: UserRole
  password:string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>(
  {
    _id: { type:mongoose.Schema.ObjectId},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
    password:{type: String, required:true,select:true},
    role: {
      type: String,
      enum: ["user", "mentor", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
)

// Prevent model overwrite error in development due to hot reloading
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema)

export default User

