import { Sequelize } from "sequelize";
import db from "../database/db.js";

const {DataTypes} = Sequelize
const Event = db.define(
    "events",{
        title : DataTypes.STRING,
        description : DataTypes.TEXT,
        location : DataTypes.STRING,
        holder : DataTypes.STRING,
        date : DataTypes.DATEONLY,
        quota: DataTypes.INTEGER
    })

db.sync().then(()=>console.log("events synchronized"))
export default Event