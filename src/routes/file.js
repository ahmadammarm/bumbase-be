const express = require("express")
const { fileController } = require("../controllers")
const isAuthenticated = require("../middlewares/isAuthenticated")
const isAdmin = require("../middlewares/isAdmin")
const router = express.Router()

router.post('/file/upload', isAuthenticated, isAdmin, fileController.fileUpload)

module.exports = router