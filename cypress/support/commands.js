import Ajv from 'ajv'
const ajv = new Ajv({allerrors: true, verbose: true, strict: false})


Cypress.Commands.add('validacaoContrato', (res, schema, status) => {
    cy.log('Teste de contrato para ' + schema + ' com status code ' + status)
    cy.fixture(`schemas/${schema}/${status}.json`).then( schema => {
        const validar = ajv.compile(schema)
        const valido = validar(res.body)

        if (!valido){
            var errors = ''
            for (let each in validar.errors){
                let err = validar.errors[each]
                errors += `\n ${err.instancePath} ${err.message}, but received ${typeof err.data}`
            }
            throw new Error('Erros encontrados na validação de contrato em: ' + errors)
        }
        return 'Contrato válido'
    })
})



Cypress.Commands.add('search', (method = 'GET', url = '/', body = null, failOnStatusCode = false) => {
    return cy.request({
        method: method,
        url: url,
        failOnStatusCode: failOnStatusCode,
        body: body
    })
})