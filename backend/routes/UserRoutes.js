import express from "express";
import { getUser,createUser, updateUser,deleteUser,getUserById,login,logout } from "../controller/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";


const router = express.Router()
//untuk ambil refresh token
router.get("/token", refreshToken)

//untuk login logout
router.post("/login",login)
router.delete("/logout",logout)

//crud user
router.get("/user",verifyToken,getUser)
router.post("/add-user", verifyToken,createUser)
router.patch("/edit-user/:id",verifyToken,updateUser)
router.delete("/delete-user/:id",verifyToken,deleteUser)

export default router
