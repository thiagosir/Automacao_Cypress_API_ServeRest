import Factory from "../fixtures/factory"

const URL_USUARIOS = '/usuarios'

export default class UsuarioService {

    ///Usuários

    //-- /GET --//

    static buscarUsuarios() {
        return cy.search('GET', URL_USUARIOS)
    }

    static buscarUsuariosById() {
        return cy.fixture('userId.json').then(res => {
            let id = res._id
            cy.request({
                method: 'GET',
                url: URL_USUARIOS + "/" + id,
                body: null,
                failOnStatusCode: true
            })
        })
    }
    
    //-- /POST --//

    static adicionarUsuarioComSucesso() {
        let user = Factory.gerarUsuario()
        cy.writeFile('./cypress/fixtures/usuario.json', user)
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: user,
            failOnStatusCode: true
        })
    }

    static adicionarUsuarioSemAdminComSucesso() {
        let user = Factory.gerarUsuarioSemAdmin()
        cy.writeFile('./cypress/fixtures/usuarioSemAdmin.json', user)
        return cy.request({
            method: 'POST',
            url: URL_USUARIOS,
            body: user,
            failOnStatusCode: true
        })
    }

    static adicionarUsuarioSemSucesso() {
        return cy.fixture('usuario.json').then(res => {
            let usuario = res;
            cy.request({
                method: 'POST',
                url: URL_USUARIOS,
                body: usuario,
                failOnStatusCode: false
            })
        })
    }

    //-- /DELETE --//

    static deletarUsuarioComSucesso() {
        return cy.fixture('userId.json').then(res => {
            let id = res._id
            cy.request({
                method: 'DELETE',
                url: URL_USUARIOS + "/" + id,
                failOnStatusCode: true
            })
        })
    }
}