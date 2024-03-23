const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const { authenticateToken } = require("../middleware/authmiddleware");

router.use(authenticateToken);
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id",  taskController.updateTask);
router.delete("/:id",  taskController.deleteTask);

module.exports = router;
