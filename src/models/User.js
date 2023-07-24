import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { addListener } from 'nodemon';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
});

UserSchema.pre("save", async (next) => {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const User = mongoose.model("User", UserSchema);

export default User;