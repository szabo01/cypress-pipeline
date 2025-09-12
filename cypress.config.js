// Importa o módulo 'path' do Node.js para construir caminhos de arquivos de forma segura
const path = require('path');

// Importa a função 'defineConfig' do Cypress para estruturar a configuração com validação
const { defineConfig } = require("cypress");

// Exporta a configuração principal do Cypress
module.exports = defineConfig({
  
  // Define o uso de múltiplos reporters para gerar diferentes tipos de relatórios
  reporter: 'cypress-multi-reporters',

  // Configurações específicas para os reporters utilizados
  reporterOptions: {
    
    // Lista os reporters que serão ativados: HTML visual e XML para integração com CI
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',

    // Configurações para o reporter JUnit (gera arquivos XML)
    mochaJunitReporterReporterOptions: {
      
      // Define o caminho absoluto para salvar os relatórios XML dentro de cypress/reports/junit
      mochaFile: path.join(__dirname, 'cypress/reports/junit/cypress-report-[hash].xml'),

      // Exibe o resumo dos testes no terminal além de salvar no arquivo
      toConsole: true
    },

    // Configurações para o reporter Mochawesome (gera relatórios HTML com gráficos e prints)
    cypressMochawesomeReporterReporterOptions: {
      
      // Define o diretório onde o relatório HTML será salvo
      reportDir: path.join(__dirname, 'cypress/reports/html'),

      // Ativa gráficos no relatório HTML
      charts: true,

      // Define o título da página HTML gerada
      reportPageTitle: 'Relatório de testes',

      // Embute os screenshots diretamente no relatório HTML
      embeddedScreenshots: true,

      // Inclui todos os arquivos (CSS, JS, imagens) dentro do HTML para funcionar offline
      inlineAssets: true,

      // Salva apenas o último resultado de cada teste, ignorando tentativas anteriores
      saveAllAttempts: false
    }
  },

  // Desativa restrições de segurança do Chrome, útil para testes com CORS ou domínios diferentes
  chromeWebSecurity: false,

  // Configurações para testes end-to-end (modo E2E do Cypress)
  e2e: {
    
    // Função que permite configurar eventos e plugins durante a execução dos testes
    setupNodeEvents(on, config) {
      
      // Ativa o plugin do cypress-mochawesome-reporter para capturar prints e gerar relatórios
      require('cypress-mochawesome-reporter/plugin')(on)
    },
  },
});
