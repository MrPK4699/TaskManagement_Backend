const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../middleware/authmiddleware");

const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/profile", authenticateToken, authController.getUserProfile);
router.put("/profile", authenticateToken, authController.updateUserProfile)

module.exports = router;
