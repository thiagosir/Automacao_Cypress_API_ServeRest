import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'
const URL_LOGIN = '/login'

export default class LoginService {

    ///Login

    static login(usuario) {
        return cy.fixture('usuario.json').then(json => {
            let usuario = {
                email: json.email,
                password: json.password
            }
            cy.search('POST', URL_LOGIN, usuario)
        })
    }

    static loginUserSemAdmin(){
        return cy.fixture('usuarioSemAdmin.json').then(json => {
            let usuarioSemAdmin = {
                email: json.email,
                password: json.password
            }
            cy.search('POST', URL_LOGIN, usuarioSemAdmin)
        })
    }

    static salvarToken(res) {
        Cypress.env('token', res.body.authorization.slice(7))
    }

    static loginSemSucesso() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: {
                "email": "fafadebelem@qa.com",
                "password": "teste"
            },
            failOnStatusCode: false
        })
    }

    static loginCamposVazios() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: {
                "email": "fulano@qa.com",
                "password": ""
            },
            failOnStatusCode: false
        })
    }

    static loginDadosNulos() {
        return cy.request({
            method: 'POST',
            url: URL_LOGIN,
            body: null,
            failOnStatusCode: false
        })
    }

}