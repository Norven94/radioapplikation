const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/whoami", userController.whoami);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/register", userController.register);
router.put("/update/:userId", userController.changeUserDetails);
router.get("/details/:userId", userController.getUserDetails);
router.delete("/:userId", userController.deleteUser);


module.exports = router;