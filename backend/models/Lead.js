import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        default: ""
    },

    phone: {
        type: String,
        default: ""
    },

    message: {
        type: String,
        required: true
    },

    details: {
        type: String,
        default: ""
    },

    sessionId: {
        type: String,
        default: ""
    },

    source: {
        type: String,
        default: "AI Chat"
    },

    status: {
        type: String,
        enum: ["new", "contacted", "qualified", "lost", "won"],
        default: "new"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    notes: {
        type: String,
        default: ""
    }

}, { timestamps: true });

export default mongoose.model("Lead", leadSchema);