import express from "express";
import cors from "cors";
import EventRoute from "./routes/EventRoutes.js"
import UserRoute from "./routes/UserRoutes.js"
import RegistRoute from "./routes/RegistRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(EventRoute);
app.use(UserRoute);
app.use(RegistRoute);
app.listen(5000, ()=>console.log("server is running"));