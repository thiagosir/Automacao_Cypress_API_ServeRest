/// <reference types="cypress" />

import UsuarioService from '../services/usuarios.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste do endpoint /usuarios da API Serverest', () => {
    context('Cadastrar e deletar usuário', () => {
        it("Deve cadastrar um usuário", () => {
            UsuarioService.adicionarUsuarioComSucesso().then(res => {
                cy.writeFile('./cypress/fixtures/userId.json', res.body)
                cy.validacaoContrato(res, 'post-usuarios', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validaAdicaoDeUsuarioComSucesso(res)
            })
        })

        it('Não deve cadastrar um novo usuário, retornando que o usuário já existe', () => {
            UsuarioService.adicionarUsuarioSemSucesso().then(res => {
                cy.validacaoContrato(res, 'post-usuarios', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validaAdicaoDeUsuarioSemSucesso(res)
            })
        })

        it("Deve deletar um usuário", () => {
            UsuarioService.deletarUsuarioComSucesso().then(res => {
                cy.validacaoContrato(res, 'delete-usuarios', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validaRemocaoDeUsuarioComSucesso(res)
            })
        })
    })
})