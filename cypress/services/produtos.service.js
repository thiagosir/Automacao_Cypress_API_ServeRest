import Factory from "../fixtures/factory"

const URL_PRODUTOS = '/produtos'


export default class ProdutoService {

    //PRODUTOS

    //-- /GET --//

    static buscarProdutos() {
        return cy.search('GET', URL_PRODUTOS)
    }

    static buscarProdutosById() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            cy.request({
                method: 'GET',
                url: URL_PRODUTOS + "/" + id,
                body: null,
                failOnStatusCode: true
            })
        })
    }

    static buscarProdutosByIdSemSucesso() {
        let id = "dsiabdjsfdskgfds"
        return cy.request({
            method: 'GET',
            url: URL_PRODUTOS + "/" + id,
            body: null,
            failOnStatusCode: false
        })
    }

    //-- /POST --//

    static adicionarProdutoComSucesso() {
        let product = Factory.gerarProduto();
        cy.writeFile('./cypress/fixtures/produto.json', product)
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: product,
            failOnStatusCode: true,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static adicionarProdutoJaExistente() {
        return cy.fixture('produto.json').then(res => {
            let nome = res.nome;
            cy.request({
                method: 'POST',
                url: URL_PRODUTOS,
                body: {
                    'nome': nome,
                    'preco': 500,
                    'descricao': 'Computador',
                    'quantidade': 67
                },
                failOnStatusCode: false,
                auth: {
                    bearer: Cypress.env('token')
                }
            })
        })
    }

    static adicionarProdutoSemAdmin() {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                'nome': 'Pc oitafdsgdfo',
                'preco': 5000,
                'descricao': 'Computadores',
                'quantidade': 67
            },
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    static adicionarProdutoSemToken() {
        return cy.request({
            method: 'POST',
            url: URL_PRODUTOS,
            body: {
                'nome': 'Pc oitaokk',
                'preco': 5000,
                'descricao': 'Computadores',
                'quantidade': 67
            },
            failOnStatusCode: false,
        })
    }

    //-- /DELETE --//

    static deletarProduto() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            cy.request({
                method: 'DELETE',
                url: URL_PRODUTOS + "/" + id,
                body: null,
                auth: {
                    bearer: Cypress.env('token')
                },
                failOnStatusCode: true
            })
        })
    }

    static deletarProdutoSemAdmin() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            return cy.request({
                method: 'DELETE',
                url: URL_PRODUTOS + "/" + id,
                body: null,
                failOnStatusCode: false,
                auth: {
                    bearer: Cypress.env('token')
                }
            })
        })
    }
    static deletarProdutoSemToken() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            return cy.request({
                method: 'DELETE',
                url: URL_PRODUTOS + "/" + id,
                body: null,
                failOnStatusCode: false,
            })
        })
    }

    static deletarProdutoSemSucesso() {
        let id = "sefY9vP8l6J2xlpNknghh"
        return cy.request({
            method: 'DELETE',
            url: URL_PRODUTOS + "/" + id,
            body: null,
            failOnStatusCode: false,
            auth: {
                bearer: Cypress.env('token')
            }
        })
    }

    //-- /PUT --//

    static editarProdutoComSucesso() {
        return cy.fixture('produtoId.json').then(res => {
            let id = res.body._id
            let produto = Factory.gerarProduto()
            cy.request({
                method: 'PUT',
                url: URL_PRODUTOS + "/" + id,
                auth: {
                    bearer: Cypress.env('token')
                },
                body: produto,
                failOnStatusCode: true
            })
        })
    }

    static editarProdutoJaExistente() {
        let id = "BeeJh5lz3k6kSIzAfg"
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + "/" + id,
            auth: {
                bearer: Cypress.env('token')
            },
            body: {
                "nome": "Logitech MX Vertical",
                "preco": 47500,
                "descricao": "Mouse",
                "quantidade": 262,
            },
            failOnStatusCode: false,
        })
    }

    static editarProdutoSemAdmin() {
        let id = "BeeJh5lz3k6kSIzA"
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + "/" + id,
            auth: {
                bearer: Cypress.env('token')
            },
            body: {
                "nome": "Logitech MX Vertical",
                "preco": 47500,
                "descricao": "Mouse",
                "quantidade": 262,
            },
            failOnStatusCode: false,
        })
    }

    static editarProdutoSemToken() {
        let id = "BbDFaVH4s3w8YfKs"
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + "/" + id,
            body: {
                "nome": "Fantastic Concrete Bacon",
                "preco": 50000,
                "descricao": "started with the 1984 ABC800J",
                "quantidade": 10737,
            },
            failOnStatusCode: false,
        })
    }

    static editarProdutoNomeDiferenteComSucesso() {
        let id = "BbDFaVH4s3w8YfKshj"
        return cy.request({
            method: 'PUT',
            url: URL_PRODUTOS + "/" + id,
            auth: {
                bearer: Cypress.env('token')
            },
            body: {
                "nome": "Fantastic body eith holy omigodness",
                "preco": 50000,
                "descricao": "started with the 1984 ABC800J",
                "quantidade": 10737,
            },
            failOnStatusCode: true,
        })
    }
}