import express from "express";
import { getEvents,getEventsById,createEvents,updateEvents,deleteEvents } from "../controller/EventController.js";

const router = express.Router()

router.get("/event",getEvents)
router.get("/event/:id",getEventsById)
router.post("/event",createEvents)
router.patch("/event/:id",updateEvents)
router.delete("/event/:id",deleteEvents)

export default router

