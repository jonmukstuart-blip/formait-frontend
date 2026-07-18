import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function checkUsers(){

    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo Connected");

    const users = await User.find({}).select("email");

    console.log("FOUND USERS:");
    console.log(users);

    await mongoose.disconnect();
}

checkUsers().catch(console.error);