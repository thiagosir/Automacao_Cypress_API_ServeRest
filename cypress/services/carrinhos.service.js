import Factory from "../fixtures/factory"

const URL_CARRINHOS = '/carrinhos'

export default class CarrinhoService {
    //CARRINHOS

    //-- /GET --//

    static buscarCarrinhos() {
        return cy.search('GET', URL_CARRINHOS)
    }

    static buscarCarrinhosById() {
        return this.buscarCarrinhos().then(res => {
            let id = res.body.carrinhos[0]._id
            cy.request({
                method: 'GET',
                url: URL_CARRINHOS + "/" + id,
                body: null,
                failOnStatusCode: true
            })
        })
    }

    static buscarCarrinhosByIdSemSucesso() {
        let id = "aFOUqntef4iaOwWfgsdfsd"
        return cy.request({
            method: 'GET',
            url: URL_CARRINHOS + "/" + id,
            body: null,
            failOnStatusCode: false
        })
    }


    //-- /POST --//

    static adicionarCarrinhoComSucesso() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            cy.request({
                method: 'POST',
                url: URL_CARRINHOS,
                body: {
                    "produtos": [
                        {
                            "idProduto": id,
                            "quantidade": 1
                        },
                    ]
                },
                failOnStatusCode: true,
                auth: {
                    bearer: Cypress.env('token')
                }
            })
        })
    }

    static adicionarNaoPermitirProdutoDuplicadoNoCarrinho() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            cy.request({
                method: 'POST',
                url: URL_CARRINHOS,
                body: {

                    "produtos": [
                        {
                            "idProduto": id,
                            "quantidade": 1
                        },
                        {
                            "idProduto": id,
                            "quantidade": 1
                        },
                    ]
                },
                failOnStatusCode: false,
                auth: {
                    bearer: Cypress.env('token')
                }
            })
        })
    }

    static adicionarCarrinhoSemToken() {
        return cy.request({
            method: 'POST',
            url: URL_CARRINHOS,
            body: {

                "produtos": [
                    {
                        "idProduto": "BeeJh5lz3k6kSIzA",
                        "quantidade": 1
                    },
                ]
            },
            failOnStatusCode: false
        })
    }

    //-- /DELETE --//

    static deletarCarrinhoConcluirComSucesso() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/concluir-compra",
            body: null,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static deletarCarrinhoConcluirSemSucesso() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/concluir-compra",
            body: null,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static deletarCarrinhoConcluirSemToken() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/concluir-compra",
            body: null,
            failOnStatusCode: false,
        })
    }

    static deletarCarrinhoCancelarComSucesso() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/cancelar-compra",
            body: null,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static deletarCarrinhoCancelarSemSucesso() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/cancelar-compra",
            body: null,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static deletarCarrinhoCancelarSemToken() {
        return cy.request({
            method: 'DELETE',
            url: URL_CARRINHOS + "/cancelar-compra",
            body: null,
            failOnStatusCode: false,
        })
    }
}