const express = require("express");
const { initialData } = require("../../controllers/admin/initialData");
const router = express.Router();

router.post('/initialData',initialData);




module.exports = router;