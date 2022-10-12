# Automação dos Testes da API Serverest

Este projeto tem foco no desenvolvimento de automação de testes para a API Serverest. Para o desenvolvimento dos testes foram utilizadas as tecnologias Cypress, Nodejs, Faker, mochawesome e Ajv.

## Cenários de Testes automatizados

#### Produtos

    ✓ Deve validar o esquema do contrato - SCHEMA

    ✓ Deve listar, cadastrar, atualizar e deletar produtos - GET _ POST _ PUT _ DELETE

####  Carrinhos

    ✓ Deve validar o esquema do contrato - SCHEMA

    ✓ Deve cadastrar e deletar carrinhos - POST _ DELETE

####  Usuários

    ✓ Deve validar o esquema do contrato - SCHEMA

    ✓ Deve cadastrar e deletar usuários - POST _ DELETE

####  Login

    ✓ Deve validar o esquema do contrato - SCHEMA

    ✓ Deve realizar login com um usuário cadastrado - POST



## Executando testes

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

#### Para clonar o repositório, execute o código abaixo:
```
git clone https://github.com/thiagosir/Automacao_Cypress_API_ServeRest.git
```

#### Instalando dependências
```
npm install
```

#### Para executar os testes em ambiente de produção, execute o código abaixo:

```
npm run cy:open:prod
```

#### OU 

#### Para executar os testes em ambiente de desenvolvimento, execute o código abaixo:

```
npx serverest@latest
```
```
npm run cy:open
```

#### Para gerar o report dos testes, execute o código abaixo:
```
npm run test
```

## Tecnologias

- [Node.js](https://nodejs.org/en/download/)
- [Faker](https://fakerjs.dev/)
- [Cypress](https://www.cypress.io/)
- [Mochawesome](https://www.npmjs.com/package/mochawesome)
- [VSCode](https://code.visualstudio.com/download)
- [Ajv](https://ajv.js.org/)

## Autor
Thiago Bento Arraes Couto