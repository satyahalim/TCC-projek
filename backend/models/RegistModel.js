import {Sequelize } from "sequelize";
import db from "../database/db.js";
import User from "./UserModel.js";
import Event from "./EventModel.js";

const {DataTypes} = Sequelize
const Registration = db.define(
    "registration",{
    status: DataTypes.STRING
})
  
  // Relasi
  User.hasMany(Registration, { foreignKey: "user_id" });
  Registration.belongsTo(User, { foreignKey: "user_id" });
  
  Event.hasMany(Registration, { foreignKey: "event_id" });
  Registration.belongsTo(Event, { foreignKey: "event_id" });
  
  db.sync().then(()=> console.log("regist synchronized"));
  export default Registration;