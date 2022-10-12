/// <reference types="cypress" />
// ***********************************************************

const fs = require('fs-extra');
const path = require('path');

function buscarArqConfig(arquivo) {
  const caminhoArquivo = path.resolve('.', 'cypress', 'config', `${arquivo}.json`)
  return fs.readJson (caminhoArquivo)
}

module.exports = (on, config) => {
  const arquivo = config.env.configFile || 'dev'
  return buscarArqConfig(arquivo)
}
