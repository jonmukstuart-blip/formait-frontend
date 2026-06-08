import express from "express";
import Message from "../models/Message.js";
import { adminAuth } from "../middleware/auth.js";

const router = express.Router();

// GET ALL MESSAGES
router.get("/messages", adminAuth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;