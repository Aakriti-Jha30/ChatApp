import Router from "express";
import { sendMessage } from "../controllers/message.controller.js";
import { getMessages } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router=Router();

router.get("/:id",protectRoute,getMessages); //=>We will get message between current user and user from params
router.post("/send/:id",protectRoute,sendMessage);

export default router;  