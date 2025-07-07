import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";

const router = Router();

// Routes now have authentication directly in the controller functions
router.get("/check", checkAdmin);
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
