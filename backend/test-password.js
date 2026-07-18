import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

dotenv.config();

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);


async function test(){

    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;

console.log("[TEST] Mongo URI exists:", !!uri);

await mongoose.connect(uri);

    const user = await User.findOne({
        email: "admin@formaitgroup.com"
    });

    console.log("USER:", user.email);

    const result = await bcrypt.compare(
        "YOUR_PASSWORD_HERE",
        user.password
    );

    console.log("PASSWORD MATCH:", result);

    process.exit();
}

test();