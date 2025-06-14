import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: '0' , enum: ['0', '1']},
},{timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;