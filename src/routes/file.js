/* eslint-disable prettier/prettier */
const express = require("express")
const { fileController } = require("../controllers")
const isAuthenticated = require("../middlewares/isAuthenticated")
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/fileUpload");
const router = express.Router();

router.post('/file/upload', isAuthenticated, isAdmin, upload.single("image"), fileController.fileUpload)

module.exports = router