import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js";
import { request } from "express";
import cors from "cors";
import msgRouters from "./routes/msgRoutes.js";

const app = express();
const port = process.env.PORT || 3001;
// since not using cmjs - use this
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(`### pathname is: ${__filename}`);

// body parser middleware
// must be before other
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", msgRouters);

// testing db -- logs latest registy
// const logDB = async () => {
//   const tryDB = await pool.query("SELECT * FROM mssg_board");
//   console.log(tryDB.rows[tryDB.rows.length - 1]);
// };
// logDB();

app.listen(port, () => {
  console.log(`### server is running on port: ${port}`);
});
