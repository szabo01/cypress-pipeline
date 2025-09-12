// Define que a pipeline será declarativa (mais legível e organizada)
pipeline {

  // Define o agente que vai executar os passos — neste caso, qualquer máquina disponível
  agent any

  // Define os estágios da pipeline
  stages {

    // Primeiro estágio: instalar dependências
    stage('Instalar dependências') {
      steps {
        // Usa o npm para instalar tudo conforme o package-lock.json
        sh 'npm ci'
      }
    }

    // Segundo estágio: executar os testes do Cypress
    stage('Executar testes') {
      steps {
        // Roda os testes em modo headless
        sh 'npx cypress run'
      }
    }

    // Terceiro estágio: publicar os relatórios JUnit no Jenkins
    stage('Publicar relatório JUnit') {
      steps {
        // Publica os arquivos XML gerados pelo mocha-junit-reporter
        junit 'cypress/reports/junit/*.xml'
      }
    }

    // Quarto estágio: publicar o relatório HTML do Mochawesome
    stage('Publicar relatório HTML') {
      steps {
        // Usa o plugin HTML Publisher para exibir o relatório visual no Jenkins
        publishHTML([
          reportDir: 'cypress/reports/html',
          reportFiles: 'mochawesome.html',
          reportName: 'Relatório Cypress',
          keepAll: true,
          alwaysLinkToLastBuild: true,
          allowMissing: false
        ])
      }
    }
  }
}
