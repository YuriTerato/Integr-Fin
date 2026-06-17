const express = require('express')
const router = express.Router()
const eventoController = require('../controllers/eventoController')

router.post('/compra-finalizada', eventoController.compraFinalizada)

module.exports = router