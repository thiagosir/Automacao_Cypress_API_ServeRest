/// <reference types="cypress" />

import LoginService from '../services/login.service'
import UsuarioService from '../services/usuarios.service'
import ValidaServerest from '../services/validaServerest.service'


describe("Casos de teste do endpoint /login da API Serverest", () => {
    it("Deve realizar login ", () => {
        UsuarioService.adicionarUsuarioComSucesso().then(res => {
            ValidaServerest.validaAdicaoDeUsuarioComSucesso(res)
            LoginService.login().then(res => {
                cy.validacaoContrato(res, 'post-login', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarLoginComSucesso(res)
                LoginService.salvarToken(res)
                UsuarioService.deletarUsuarioComSucesso()
            })
        })
    })

    it("Não deve realizar login pois não será especificado dados", () => {
        LoginService.loginDadosNulos().then(res => {
            cy.validacaoContrato(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
            ValidaServerest.validarloginDadosNulos(res)
        })
    })

    it("Não deve realizar login pois os campos estão vazios", () => {
        LoginService.loginCamposVazios().then(res => {
            cy.validacaoContrato(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
            ValidaServerest.validarloginDadosNulos(res)
        })
    })

    it("Não deve realizar login pois os dados serão inválidos", () => {
        LoginService.loginSemSucesso().then(res => {
            cy.validacaoContrato(res, 'post-login', 400).then(res => expect(res).to.be.eq('Contrato válido'))
            ValidaServerest.validarLoginSemSucesso(res)
        })
    })
})