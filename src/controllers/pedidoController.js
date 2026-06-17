const pedidoService = require('../services/pedidoService')
const { pedidos } = require ('../data/store')

const criar = async (req, res) => {
    const { cliente, pais, itens } = req.body

    if (!cliente || !pais || !itens){
        return res.status(400).json({erro: "cliente, pais e itens sao obrigatorios"})
    }

    try{
        const pedido = await pedidoService.criarPedido(cliente, pais, itens)
        res.status(201).json(pedido)
    } catch (erro) {
        res.status(400).json({erro: erro.message})
    }   
}

const listar = (req, res) => {
        res.json(pedidos)
    }


    module.exports = {criar, listar}