import pool from "../config/db.js";

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await pool.query("SELECT * FROM mssg_board");
    res.status(200).json(messages.rows);
  } catch (error) {
    console.log(error.message);
  }
};
const getOneMessage = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id); // returns value of "id"
    console.log(id);
    const message = await pool.query("SELECT * FROM mssg_board WHERE id=$1", [
      id
    ]);
    res.status(200).json(message.rows);
  } catch (error) {
    console.log(error.message);
  }
};
const postMessage = async (req, res, next) => {
  try {
    const { content, author } = req.body;
    const newMessage = await pool.query(
      "INSERT INTO mssg_board (content,author,post_date) VALUES ($1,$2,$3) RETURNING *",
      [content, author, new Date()]
    );
    res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

export { getAllMessages, getOneMessage, postMessage };
