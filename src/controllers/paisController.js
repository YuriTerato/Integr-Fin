const paisService = require('../services/paisService')

const buscar = async (req, res) => {
    const { codigo } = req.params

    try {
        const resultado = await paisService.buscarPais(codigo)
        res.json(resultado

        )
    } catch (erro) {
        res.status(404).json({erro: erro.message})
    }
    
}

module.exports = { buscar }