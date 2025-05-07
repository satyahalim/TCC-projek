import express from "express";
import cors from "cors";
import EventRoute from "./routes/EventRoutes.js"
import UserRoute from "./routes/UserRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(EventRoute);
app.use(UserRoute);
app.listen(5000, ()=>console.log("server is running"));