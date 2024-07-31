import express from "express";
const router = express.Router();
import {
  getAllMessages,
  getOneMessage,
  postMessage
} from "../controller/messageControllers.js";

router.get("/", getAllMessages);
router.get("/message/:id", getOneMessage);
router.post("/new", postMessage);

export default router;
