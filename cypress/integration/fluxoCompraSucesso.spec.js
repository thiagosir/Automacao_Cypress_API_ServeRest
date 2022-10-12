/// <reference types="cypress" />

import CarrinhoService from '../services/carrinhos.service'
import UsuarioService from '../services/usuarios.service'
import ProdutoService from '../services/produtos.service'
import LoginService from '../services/login.service'
import ValidaServerest from '../services/validaServerest.service'


describe("Fluxo prioritário (Concluir-compra) da API Serverest", () => {
    context('Logando com sucesso', () => {
        before('', () => {
            UsuarioService.adicionarUsuarioComSucesso().then(res => {
                cy.writeFile('./cypress/fixtures/userId.json', res.body)
                ValidaServerest.validaAdicaoDeUsuarioComSucesso(res)
                LoginService.login().then(res => {
                    ValidaServerest.validarLoginComSucesso(res)
                    LoginService.salvarToken(res)
                })
            })
        })

        it('Deve criar um produto', () => {
            ProdutoService.adicionarProdutoComSucesso().then(res => {
                cy.writeFile('./cypress/fixtures/produtoId.json', res)
                cy.validacaoContrato(res, 'post-produtos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarAdicaoDeProdutoComSucesso(res)
            })
        })

        it('Deve criar um carrinho e adicionar produtos ligados à ele', () => {
            CarrinhoService.adicionarCarrinhoComSucesso().then(res => {
                cy.validacaoContrato(res, 'post-carrinhos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarAdicaoDeCarrinhos(res)
            })
        })

        it('Deve deletar um carrinho-concluir e deletar o usuário', () => {
            CarrinhoService.deletarCarrinhoConcluirComSucesso().then(res => {
                cy.validacaoContrato(res, 'delete-carrinhos-concluir', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarRemocaoDeCarrinhoConcluirComSucesso(res)
                ProdutoService.deletarProduto().then(res => {
                    ValidaServerest.validarRemocaoDeProdutoComSucesso(res)
                })
                UsuarioService.deletarUsuarioComSucesso().then(res => {
                    ValidaServerest.validaRemocaoDeUsuarioComSucesso(res)
                })
               
            })
        })
    })
})