import express from "express";
import { getEvents,getEventsById,createEvents,updateEvents,deleteEvents } from "../controller/EventController.js";

const router = express.Router()

router.get("/event",getEvents)
router.get("/event/:id",getEventsById)
router.post("/add-event",createEvents)
router.patch("/edit-event/:id",updateEvents)
router.delete("/delete-event/:id",deleteEvents)

export default router

