const produtoService = require('../services/produtoService')

const listar = (req, res) => {
    const produtos = produtoService.listar()
    res.json(produtos)
}

const criar = (req, res) => {
    const {nome, preco, estoque } = req.boddy
    
    if (!nome || !preco || !estoque) {
        return res.status(400).json({ erro: "nome, preco e estoque sao obrigatorios"})
    }

    const novoProduto = produtoService.criar(nome, preco, estoque)
    res.status(201).json(novoProduto)
}

const atualizar = (req, res) => {
    const id = parseInt(req.params.id)
   
    try{
        const produto = produtoService.atualizar(id, req.boddy)
        res.json(produto)
        }  catch (erro){
            res.status(404).json({erro: erro.message})
        }
    }

module.exports = {listar, criar, atualizar}
