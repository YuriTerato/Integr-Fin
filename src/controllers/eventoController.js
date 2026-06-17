const compraFinalizada = (req, res) => {
    const { pedidoId, cliente, pais, total, moeda} = req.body

    if(!pedidoId || !cliente || !pais || !total || !moeda) {
        return  res.status(400).json({erro: "Todos os campos sao obrigatorios"})
    }

    console.log(`Evento recebido - Compra #${pedidoId} de ${cliente} no valor de ${moeda} ${total}`)

    res.status(202).json({
        status: "aceito",
        mensagem: `Compra #${pedidoId} em processamento`
    })
}

module.exports = { compraFinalizada }

