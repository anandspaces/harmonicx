import { Router } from "express";

const router = Router();

router.get("/",(req,res) => {
    res.send("User route with GET method");
});
router.post("/",(req,res) => {
    res.send("User route with POST method");
});
router.delete("/",(req,res) => {
    res.send("User route with DELETE method");
});

export default router;