const { produtos } = require('../data/store')

let proximoId = 4

const listar = () => {
    return produtos
}

const criar = (nome, preco, estoque, categoria) => {
    const novoProduto = { id: proximoId++, nome, preco, estoque, categoria }
    produtos.push(novoProduto)
    return novoProduto
}

const atualizar = (id, dados) => {
    const produto = produtos.find(p => p.id === id)

    if (!produto){
        throw new Error('Produto nao encontrado')
    }

    if (dados.nome) produto.nome = dados.nome
    if (dados.preco) produto.preco = dados.preco
    if (dados.estoque) produto.estoque = dados.estoque
    if (dados.categoria) produto.categoria = dados.categoria

    return produto
}

module.exports = {listar, criar, atualizar}