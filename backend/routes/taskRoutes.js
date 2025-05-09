const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authenticate = require("../middleware/authMiddleware"); // ensures req.user.id is available


router.post("/", authenticate, taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
