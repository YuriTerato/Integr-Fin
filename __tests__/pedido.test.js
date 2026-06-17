const { calcularDesconto } = require('../src/services/pedidoService')
const request = require('supertest')
const app = require('../app')

describe('Testes do pedido', () => {
    
    //Teste 1 - desconto progressivo
  test('deve calcular desconto progressivo corretamente', () => {
    expect(calcularDesconto(1)).toBe(0)
    expect(calcularDesconto(2)).toBe(0)
    expect(calcularDesconto(3)).toBe(0.05)
    expect(calcularDesconto(4)).toBe(0.05)
    expect(calcularDesconto(5)).toBe(0.12)
  })

   // TESTE 2 — estoque insuficiente
  test('deve rejeitar pedido com estoque insuficiente', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Carlos",
        pais: "BR",
        itens: [{ produtoId: 3, quantidade: 999 }]
      })

    expect(resposta.status).toBe(400)
    expect(resposta.body.erro).toContain('insuficiente')
  })
})

// TESTE 3 — criar pedido com sucesso
  test('POST /pedidos retorna 201 com desconto e moeda', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({
        cliente: "Carlos",
        pais: "BR",
        itens: [{ produtoId: 1, quantidade: 5 }]
      })

    expect(resposta.status).toBe(201)
    expect(resposta.body.desconto).toBe('12%')
    expect(resposta.body.moeda).toBe('BRL')
  })