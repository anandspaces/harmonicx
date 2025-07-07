import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: false,
			unique: true,
			sparse: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		id: {
			type: String,
			required: false,
			unique: true,
			sparse: true,
		},
		googleId: {
			type: String,
			required: false,
			unique: true,
			sparse: true,
		},
	},
	{ timestamps: true } //  createdAt, updatedAt
);

export const User = mongoose.model("User", userSchema);
