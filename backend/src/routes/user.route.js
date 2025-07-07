import { Router } from "express";
import { getAllUsers, getMessages } from "../controller/user.controller.js";

const router = Router();

// Routes now have authentication directly in the controller functions
router.get("/", getAllUsers);
router.get("/messages/:userId", getMessages);

export default router;
