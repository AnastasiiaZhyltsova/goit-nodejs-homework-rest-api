const express = require("express");
const ctrl = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload} = require("../../middleware");

const router = express.Router();


// upload.single("avatar") створюємо маршрут та считуємо файл запиту
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));


module.exports = router;