const { MongoClient, ObjectId } = require("mongodb");
const connectDB = require("../config/db");

const getTasks = async (req, res) => {
  try {
    const db = await connectDB();

    const tasks = await db.collection("tasks").find({}).toArray();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const createTask = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Name and description are required" });
  }

  try {
    const db = await connectDB();

    const task = { name, description, completed: false };

    const result = await db.collection("tasks").insertOne(task);

    if (result.insertedId) {
      res.status(201).json({ _id: result.insertedId, ...task });
    } else {
      res.status(500).json({ message: "Failed to create task" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  try {
    const db = await connectDB();

    const task = await db
      .collection("tasks")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { name, description, completed } },
        { returnOriginal: false }
      );

    if (!task.value) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task.value);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const db = await connectDB();

    const task = await db
      .collection("tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (task.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
