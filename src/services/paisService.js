const axios = require('axios')

const API_KEY = 'rc_live_945c2fa38dab48c78490104340506b18'

const buscarPais = async (codigo) => {
  try {
    const resposta = await axios.get(`https://api.restcountries.com/countries/v5?q=${codigo}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })

    const objetos = resposta.data.data.objects
    const dados = objetos.find(p => 
      p.codes.alpha_2 === codigo.toUpperCase() || 
      p.codes.alpha_3 === codigo.toUpperCase()
    )

    if (!dados) {
      throw new Error(`País não encontrado`)
    }

    return {
      pais: dados.names.common,
      moeda: dados.currencies[0].code
    }
  } catch (erro) {
    throw new Error(`País com código ${codigo} não encontrado`)
  }
}

module.exports = { buscarPais }