const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");

router.get("/channels/:usersId", profileController.getFavoriteChannels);
router.get("/programs/:usersId", profileController.getFavoritePrograms);
router.post("/channel", profileController.addFavoriteChannel);
router.post("/program", profileController.addFavoriteProgram);

module.exports = router;