const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { MongoClient, ObjectId } = require("mongodb");
const router = express.Router();
const client = new MongoClient("mongodb://localhost:27017");

router.put("/complete/:id", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("taskmanager");

    const taskId = req.params.id;
    const objectId = new ObjectId(taskId);

    const taskToComplete = await db
      .collection("tasks")
      .findOne({ _id: objectId });

    if (!taskToComplete) {
      return res.status(404).json({ message: "Task not found" });
    }

    await db.collection("completed-tasks").insertOne(taskToComplete);
    await db.collection("tasks").deleteOne({ _id: objectId });

    res.json(taskToComplete); // Return the completed task for frontend use
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    await client.close();
  }
});

router.get("/completed", async (req, res) => {
  try {
    await client.connect();
    const db = client.db("taskmanager");
    const completedTasks = await db
      .collection("completed-tasks")
      .find({})
      .toArray();
    res.json(completedTasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  } finally {
    await client.close();
  }
});

router.route("/").get(getTasks).post(createTask);

router.route("/:id").put(updateTask).delete(deleteTask);

router.put("/complete/:id", async (req, res) => {});

module.exports = router;
