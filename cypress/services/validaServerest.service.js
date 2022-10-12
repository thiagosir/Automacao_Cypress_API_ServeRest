export default class ValidaServerest {

    //-- LOGIN --//

    static validarLoginComSucesso(res) {
        expect(res.body.message).to.be.eq('Login realizado com sucesso')
    }

    static validarLoginSemSucesso(res) {
        expect(res.body.message).to.be.eq('Email e/ou senha inválidos')
    }

    static validarloginDadosNulos(res) {
        // expect(res.body.message).to.be.eq()
    }

    //-- PRODUTOS --//

    //-- /GET --//

    static validarBuscarProdutos(res) {
        expect(res.body.quantidade).to.be.greaterThan(0)
    }
    static validarBuscarProdutosById(res) {
    }

    static validarBuscarProdutosByIdSemSucesso(res) {
        expect(res.body.message).to.be.eq("Produto não encontrado")

    }

    //-- /POST --//

    static validarAdicaoDeProdutoComSucesso(res) {
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
    }

    static validarAdicaoDeProdutoJaExistente(res) {
        expect(res.body.message).to.be.eq('Já existe produto com esse nome')
    }

    static validarAdicaoDeProdutoSemAdmin(res) {
        expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
    }

    static validarAdicaoDeProdutoSemToken(res) {
        expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    //-- /DELETE --//

    static validarRemocaoDeProdutoComSucesso(res) {
        expect(res.body.message).to.be.eq('Registro excluído com sucesso')
    }
    static validarRemocaoDeProdutoSemSucesso(res) {
        expect(res.body.message).to.be.eq('Nenhum registro excluído')
    }
    static validarRemocaoDeProdutoSemAdmin(res) {
        expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
    }
    static validarRemocaoDeProdutoSemToken(res) {
        expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }

    //-- /PUT --//

    static validarEdicaoDeProdutoNomeDiferenteComSucesso(res) {
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
    }
    static validarEdicaoDeProdutoComSucesso(res) {
        expect(res.body.message).to.be.eq('Registro alterado com sucesso')
    }
    static validarEdicaoDeProdutoSemToken(res) {
        expect(res.body.message).to.be.eq('Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    }
    static validarEdicaoDeProdutoSemAdmin(res) {
        expect(res.body.message).to.be.eq('Rota exclusiva para administradores')
    }
    static validarEdicaoDeProdutoJaExistente(res) {
        expect(res.body.message).to.be.eq('Já existe produto com esse nome')
    }


    //-- USUARIOS --//

    //-- /GET --//

    static validarBuscaDeUsuarios(res) {
        expect(res.body.quantidade).to.be.greaterThan(0)
    }

    static validarBuscaDeUsuariosForId(res) {
    }

    static validarBuscaDeUsuariosForIdSemSucesso(res) {
        expect(res.body.message).to.be.eq("Usuário não encontrado")
    }

    //-- /POST --//

    static validaAdicaoDeUsuarioComSucesso(res) {
        expect(res.body.message).to.be.eq('Cadastro realizado com sucesso')
    }
    static validaAdicaoDeUsuarioSemSucesso(res) {
        expect(res.body.message).to.be.eq('Este email já está sendo usado')
    }

    //-- /DELETE --//

    static validaRemocaoDeUsuarioComSucesso(res) {
        expect(res.body.message).to.be.eq('Registro excluído com sucesso')
    }

    //-- Carrinhos --//

    //-- /POST --//
    
    static validarAdicaoDeCarrinhos(res) {
        expect(res.body.message).to.be.eq("Cadastro realizado com sucesso")
    }
    
    static validarNaoPermitirAdicaoDeProdutoDuplicado(res) {
        expect(res.body.message).to.be.eq("Não é permitido possuir produto duplicado")
    }
    
    static validarNaoPermitirAdicaoMaisDeUmCarrinho(res) {
        expect(res.body.message).to.be.eq("Não é permitido ter mais de 1 carrinho")
    }
    
    static validarNaoPermitirAdicaoProdutoNaoEncontrado(res) {
        expect(res.body.message).to.be.eq("Produto não encontrado")
    }
    
    static validarNaoPermitirAdicaoProdutoInsuficiente(res) {
        expect(res.body.message).to.be.eq("Produto não possui quantidade suficiente")
    }
    
    static validarAdicaoDeCarrinhoSemToken(res) {
        expect(res.body.message).to.be.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
        
    }


    //-- /DELETE/concluir-compra --//
    
    static validarRemocaoDeCarrinhoConcluirSemToken(res) {
        expect(res.body.message).to.be.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
    }
    
    static validarRemocaoDeCarrinhoConcluirComSucesso(res) {
        expect(res.body.message).to.be.eq("Registro excluído com sucesso")
    }
    
    static validarRemocaoDeCarrinhoConcluirSemSucesso(res) {
        expect(res.body.message).to.be.eq("Não foi encontrado carrinho para esse usuário")
    }

    //-- /DELETE/cancelar-compra --//
    
    static validarRemocaoDeCarrinhoCancelarSemToken(res) {
        expect(res.body.message).to.be.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais")
    }

    static validarRemocaoDeCarrinhoCancelarComSucesso(res) {
        expect(res.body.message).to.be.eq("Registro excluído com sucesso")
    }

    static validarRemocaoDeCarrinhoCancelarSemSucesso(res) {
        expect(res.body.message).to.be.eq("Não foi encontrado carrinho para esse usuário")
    }




}