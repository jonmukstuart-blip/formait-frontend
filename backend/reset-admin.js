import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import dns from "dns";

dotenv.config();

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);


async function createAdmin(){

    try {

        console.log("[ADMIN ENGINE] Connecting to Atlas...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("[ADMIN ENGINE] MongoDB Connected");


        const email = "admin@formaitgroup.com";
        const password = "Javo&Jo20.";


        const hashedPassword = await bcrypt.hash(password, 12);


        const existing = await User.findOne({ email });


        if(existing){

            existing.password = hashedPassword;
            await existing.save();

            console.log("✅ Existing admin password updated");

        } else {

            await User.create({
                email,
                password: hashedPassword
            });

            console.log("✅ New admin account created");

        }


        console.log("--------------------------------");
        console.log("LOGIN EMAIL:", email);
        console.log("--------------------------------");


        await mongoose.disconnect();


    } catch(error){

        console.error("ADMIN CREATION FAILED");
        console.error(error);

    }

}


createAdmin();