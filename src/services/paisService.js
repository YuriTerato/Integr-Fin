const axios = require('axios')

const API_KEY = 'rc_live_945c2fa38dab48c78490104340506b18'

const buscarPais = async (codigo) => {
  try {
    const resposta = await axios.get(`https://api.restcountries.com/countries/v5/codes.alpha_2/${codigo.toUpperCase()}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })

    const dados = resposta.data.data.objects[0]

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