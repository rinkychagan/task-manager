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

    res.json(taskToComplete);
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

router.delete("/completed-tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("taskmanager");

    const result = await db
      .collection("completed-tasks")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting task" });
  } finally {
    await client.close();
  }
});

router.route("/").get(getTasks).post(createTask);

router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
