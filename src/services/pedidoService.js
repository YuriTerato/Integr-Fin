const {produtos, pedidos} = require('../data/store')
const paisService = require('./paisService')

const calcularDesconto = (quantidade) => {
    if (quantidade >= 5) return 0.12
    if(quantidade >= 3) return 0.05
    return 0
}

const criarPedido = async (cliente, pais, itens) => {
    const infoPais = await paisService.buscarPais(pais)

    let subtotal = 0
    let totalItens = 0

    for (const item of itens){
        const produto = produtos.find(p => p.id === item.produtoId)

        if(!produto) {
            throw new Error(`Produto ${item.produtoId} nao encontrado`)
        }

        if(produto.estoque < item.quantidade) {
            throw new Error(`Estoque insuficiente para o produto ${produto.nome} - disponivel: ${produto.estoque}`)
        }

        subtotal += produto.preco * item.quantidade
        totalItens += item.quantidade
    }

    const desconto = calcularDesconto(totalItens)
    const total = subtotal * (1 - desconto)

    for (const item of itens) {
        const produto = produtos.find(p => p.id === item.produtoId)
        produto.estoque -= item.quantidade
    }

    const novoPedido = {
        id: pedidos.length + 1,
        cliente,
        pais: infoPais.pais,
        moeda: infoPais.moeda,
        itens,
        subtotal: parseFloat(subtotal.toFixed(2)),
        desconto: `${desconto * 100}%`,
        total: parseFloat(total.toFixed(2))
    }

    pedidos.push(novoPedido)
    return novoPedido
}

module.exports = { calcularDesconto, criarPedido}