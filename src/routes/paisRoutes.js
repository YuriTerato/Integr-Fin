const express = require('express')
const router = express.Router()
const paisController = require('../controllers/paisController')

router.get('/:codigo', paisController.buscar)

module.exports = router