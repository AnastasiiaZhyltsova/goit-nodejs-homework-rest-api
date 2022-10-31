const express = require("express");
const ctrl = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate, upload} = require("../../middleware");
const { schemas } = require("../../models/user");

const router = express.Router();


// upload.single("avatar") створюємо маршрут та считуємо файл запиту
router.patch("/avatars", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));
// якщо не пришов лист на верифікацію при реємтрації
router.post('/verify', validateBody(schemas.verifyEmailSchema), ctrlWrapper(ctrl.resendVerify));


module.exports = router;