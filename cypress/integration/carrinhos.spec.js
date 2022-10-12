/// <reference types="cypress" />

import CarrinhoService from '../services/carrinhos.service'
import ProdutoService from '../services/produtos.service'
import UsuarioService from '../services/usuarios.service'
import LoginService from '../services/login.service'
import ValidaServerest from '../services/validaServerest.service'


describe("Casos de teste do endpoint /carrinhos da API Serverest", () => {
    context('Testes para rota /carrinhos, cadastrar e deletar carrinhos', () => {
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

        context('Carrinho concluir-compra', () => {
            it('Deve criar um produto', () => {
                ProdutoService.adicionarProdutoComSucesso().then(res => {
                    cy.writeFile('./cypress/fixtures/produtoId.json', res)
                    cy.validacaoContrato(res, 'post-produtos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAdicaoDeProdutoComSucesso(res)
                })
            })

            it('Não deve criar um carrinho, pois não é permitido possuir produto duplicado', () => {
                CarrinhoService.adicionarNaoPermitirProdutoDuplicadoNoCarrinho().then(res => {
                    cy.validacaoContrato(res, 'post-carrinhos', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarNaoPermitirAdicaoDeProdutoDuplicado(res)
                })
            })

            it('Deve criar um carrinho e adicionar os produtos especificados ligados à ele', () => {
                CarrinhoService.adicionarCarrinhoComSucesso().then(res => {
                    cy.validacaoContrato(res, 'post-carrinhos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAdicaoDeCarrinhos(res)
                })
            })

            it('Deve deletar um carrinho-concluir', () => {
                CarrinhoService.deletarCarrinhoConcluirComSucesso().then(res => {
                    cy.validacaoContrato(res, 'delete-carrinhos-concluir', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarRemocaoDeCarrinhoConcluirComSucesso(res)
                })
            })
        })

        context('Carrinho cancelar-compra', () => {

            it('Deve criar um carrinho e adicionar os produtos especificados ligados à ele', () => {
                CarrinhoService.adicionarCarrinhoComSucesso().then(res => {
                    cy.validacaoContrato(res, 'post-carrinhos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAdicaoDeCarrinhos(res)
                })
            })

            it('Deve deletar um carrinho-cancelar, deletar usuario e produto', () => {
                CarrinhoService.deletarCarrinhoCancelarComSucesso().then(res => {
                    cy.validacaoContrato(res, 'delete-carrinhos-cancelar', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarRemocaoDeCarrinhoCancelarComSucesso(res)
                    ProdutoService.deletarProduto().then(res => {
                        ValidaServerest.validarRemocaoDeProdutoComSucesso(res)
                    })
                    UsuarioService.deletarUsuarioComSucesso().then(res => {
                        ValidaServerest.validaRemocaoDeUsuarioComSucesso(res)
                    })
                })
            })

            it('Deve deletar usuario e produto', () => {
                ProdutoService.deletarProduto().then(res => {
                    ValidaServerest.validarRemocaoDeProdutoComSucesso(res)
                })
                UsuarioService.deletarUsuarioComSucesso().then(res => {
                    ValidaServerest.validaRemocaoDeUsuarioComSucesso(res)
                })
            })
        })

        context('Usuário sem Token', () => {

            it('Não deve criar um carrinho, pois o token é inválido, inexistente ou expirado', () => {
                LoginService.loginSemSucesso().then(usuario => {
                    CarrinhoService.adicionarCarrinhoSemToken().then(res => {
                        cy.validacaoContrato(res, 'post-carrinhos', 400).then(res => expect(res).to.be.eq('Contrato válido'))
                        ValidaServerest.validarAdicaoDeCarrinhoSemToken(res)
                    })
                })
            })

            it('Não deve deletar um carrinho-concluir, pois o token é inválido, inexistente ou expirado', () => {
                LoginService.loginSemSucesso().then(usuario => {
                    CarrinhoService.deletarCarrinhoConcluirSemToken().then(res => {
                        cy.validacaoContrato(res, 'delete-carrinhos-concluir', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                        ValidaServerest.validarRemocaoDeCarrinhoConcluirSemToken(res)
                    })
                })
            })

            it('Não deve deletar um carrinho-cancelar, pois o token é inválido, inexistente ou expirado', () => {
                LoginService.loginSemSucesso().then(usuario => {
                    CarrinhoService.deletarCarrinhoCancelarSemToken().then(res => {
                        cy.validacaoContrato(res, 'delete-carrinhos-cancelar', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                        ValidaServerest.validarRemocaoDeCarrinhoCancelarSemToken(res)
                    })
                })
            })
        })
    })
})