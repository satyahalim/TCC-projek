import { Sequelize } from "sequelize";

const db = new Sequelize(
  "campusevent", // nama database
  "root",        // user
  "",            // password (kosong)
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306     // port default MySQL
  }
);

export default db;
