/// <reference types="cypress" />

import CarrinhoService from '../services/carrinhos.service'
import UsuarioService from '../services/usuarios.service'
import ProdutoService from '../services/produtos.service'
import LoginService from '../services/login.service'
import ValidaServerest from '../services/validaServerest.service'

describe('Casos de teste do endpoint /produtos da API Serverest', () => {
    context('CRUD para a rota /produtos', () => {
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

        it('Deve listar todos os produtos', () => {
            ProdutoService.buscarProdutos().then(res => {
                cy.validacaoContrato(res, 'get-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarBuscarProdutos(res)
            })
        })

        it('Deve adicionar um novo produto com sucesso', () => {
            ProdutoService.adicionarProdutoComSucesso().then(res => {
                cy.writeFile('./cypress/fixtures/produtoId.json', res)
                cy.validacaoContrato(res, 'post-produtos', 201).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarAdicaoDeProdutoComSucesso(res)
            })
        })
    
        it('Deve buscar um produto por seu ID', () => {
            ProdutoService.buscarProdutosById().then(res => {
                cy.validacaoContrato(res, 'get-produtos-by-id', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarBuscarProdutosById(res)
            })
        })
    
        it('Deve editar um produto com sucesso', () => {
            ProdutoService.editarProdutoComSucesso().then(res => {
                cy.validacaoContrato(res, 'put-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarEdicaoDeProdutoComSucesso(res)
            })
        })
    
        it('Deve deletar um produto com sucesso', () => {
            ProdutoService.deletarProduto().then(res => {
                cy.validacaoContrato(res, 'delete-produtos', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarRemocaoDeProdutoComSucesso(res)
                UsuarioService.deletarUsuarioComSucesso()
            })
        })
    })

    context('Usuário sem Token', () => {
        it('Não deve deletar um produto, pois o token é inválido, inexistente ou expirado', () => {
            LoginService.loginSemSucesso().then(usuario => {
                ProdutoService.deletarProdutoSemToken().then(res => {
                    cy.validacaoContrato(res, 'delete-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarRemocaoDeProdutoSemToken(res)
                })
            })
        })

        it('Não deve editar um produto, pois o token é inválido, inexistente ou expirado', () => {
            LoginService.loginSemSucesso().then(usuario => {
                ProdutoService.editarProdutoSemToken().then(res => {
                    cy.validacaoContrato(res, 'put-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarEdicaoDeProdutoSemToken(res)
                })
            })
        })
            
        it('Não deve adicionar um produto, pois o token é inválido, inexistente ou expirado', () => {
            LoginService.loginSemSucesso().then(usuario => {
                ProdutoService.adicionarProdutoSemToken(usuario).then(res => {
                    cy.validacaoContrato(res, 'post-produtos', 401).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarAdicaoDeProdutoSemToken(res)
                })
            })
        })
    })

    context('Usuário sem Adm', () => {
        before('', () => {
            UsuarioService.adicionarUsuarioSemAdminComSucesso().then(res => {
                LoginService.loginUserSemAdmin().then(res => {
                    cy.validacaoContrato(res, 'post-login', 200).then(res => expect(res).to.be.eq('Contrato válido'))
                    ValidaServerest.validarLoginComSucesso(res)
                    LoginService.salvarToken(res)
                    UsuarioService.deletarUsuarioComSucesso()
                })
            })
        })

        it('Não deve adicionar um produto pois a rota é exclusiva para administradores', () => {
            ProdutoService.adicionarProdutoSemAdmin().then(res => {
                cy.validacaoContrato(res, 'post-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarAdicaoDeProdutoSemAdmin(res)
            })
        })

        it('Não deve deletar um produto pois a rota é exclusiva para administradores', () => {
            ProdutoService.deletarProdutoSemAdmin().then(res => {
                cy.validacaoContrato(res, 'delete-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarRemocaoDeProdutoSemAdmin(res)
            })
        })

        it('Não deve editar um produto pois a rota é exclusiva para administradores', () => {
            ProdutoService.editarProdutoSemAdmin().then(res => {
                cy.validacaoContrato(res, 'put-produtos', 403).then(res => expect(res).to.be.eq('Contrato válido'))
                ValidaServerest.validarEdicaoDeProdutoSemAdmin(res)
            })
        })
    })
})

