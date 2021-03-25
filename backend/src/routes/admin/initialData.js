const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();
const { upload, adminMiddleware, requireSignin } = require("../../common-middleware");

router.post('/initialData',requireSignin,adminMiddleware,initialData);




module.exports = router;