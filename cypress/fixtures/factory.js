const faker = require('faker');


export default class Factory {

    static gerarProduto() {
        return {
            'nome': faker.commerce.productName(),
            'preco': faker.datatype.number(),
            'descricao': faker.commerce.productDescription(),
            'quantidade': faker.datatype.number()
        }
    }

    static gerarPreco(){
        return {'preco': faker.datatype.number()}
    }

    static gerarUsuario() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
             "administrador": "true" //faker.datatype.boolean().toString()
        }
    }

    static gerarUsuarioSemAdmin() {
        return {
            "nome": faker.name.findName(),
            "email": faker.internet.email(),
            "password": faker.internet.password(),
             "administrador": "false" //faker.datatype.boolean().toString()
        }
    }

    static gerarNome() {
        return {"nome": faker.name.findName().toString()}
    }

    static gerarEmail() {
        var email = faker.internet.email().toString()
        return email
    }
} 