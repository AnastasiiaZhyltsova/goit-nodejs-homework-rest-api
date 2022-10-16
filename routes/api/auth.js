const express = require("express");
const ctrl = require('../../controllers/auth');
const { ctrlWrapper } = require('../../helpers');
const { validateBody, authenticate} = require("../../middleware");
const { schemas } = require('../../models/user');
const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));
router.post('/login', validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));
router.patch("/subscription", authenticate, ctrlWrapper(ctrl.updateSubscription));


module.exports = router;