const express = require('express')
const app = express()

app.use(express.json())

const produtoRoutes = require('./src/routes/produtoRoutes')
const pedidoRoutes = require('./src/routes/pedidoRoutes')
const paisRoutes = require('./src/routes/paisRoutes')
const eventoRoutes = require('./src/routes/eventoRoutes')

app.use('/produtos', produtoRoutes)
app.use('/pedidos', pedidoRoutes)
app.use('/pais', paisRoutes)
app.use('/eventos', eventoRoutes)

module.exports = app