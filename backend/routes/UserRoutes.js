import express from "express";
import { getUser,createUser, updateUser,deleteUser } from "../controller/UserController.js";

const router = express.Router()
router.get("/user",getUser)
router.post("/add-user",createUser)
router.patch("/edit-user/:id",updateUser)
router.delete("/delete-user/:id",deleteUser)

export default router
