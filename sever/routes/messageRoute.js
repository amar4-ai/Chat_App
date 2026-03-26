import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMessages, getUserForSidebar, markaMessageAsSeen, sendMessage } from "../controllers/messageController.js";


const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("mark/:id", protectRoute, markaMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage)

export default messageRouter;