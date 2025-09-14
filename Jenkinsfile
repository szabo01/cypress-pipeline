// Define que a pipeline será declarativa — mais legível, estruturada e fácil de manter
pipeline {

  // Define o agente que executará os estágios — neste caso, qualquer máquina disponível
  agent any

  // Bloco que contém todos os estágios da pipeline
  stages {

    // 🧩 Estágio 1: Instalação das dependências do projeto
    stage('Instalar dependências') {
      steps {
        // Executa 'npm ci' para instalar as dependências com base no package-lock.json
        // Mais rápido e confiável para ambientes de CI
        sh 'npm ci'
      }
    }

    // 🧪 Estágio 2: Execução dos testes automatizados com Cypress
    stage('Executar testes') {
      steps {
        // Roda os testes em modo headless usando o Chrome
        // O script 'cy:run:chrome' deve estar definido no package.json
        sh 'npm run cy:run:chrome'
      }
    }

    // 📄 Estágio 3: Publicação dos relatórios JUnit (XML) no Jenkins
    stage('Publicar relatório JUnit') {
      steps {
        // Publica os arquivos XML gerados pelo mocha-junit-reporter
        // Permite visualização dos testes no painel do Jenkins
        junit 'cypress/reports/junit/*.xml'
      }
    }

    // 🔍 Estágio 4: Verificação manual do conteúdo do relatório HTML
    stage('Verificar relatório Cypress') {
      steps {
        // Lista os arquivos gerados no diretório de relatórios HTML
        echo 'Listando arquivos do relatório Cypress...'
        sh 'ls -lh cypress/reports/html'

        // Exibe as primeiras linhas do index.html para validar se foi gerado corretamente
        echo 'Exibindo início do conteúdo do mochawesome.html...'
        sh 'head -n 20 cypress/reports/html/index.html'
      }
    }

    // 📊 Estágio 5: Publicação do relatório HTML interativo no Jenkins
    stage('Publicar relatório HTML') {
      steps {
        // Usa o plugin HTML Publisher para exibir o relatório visual no painel do Jenkins
        publishHTML([
          reportDir: 'cypress/reports/html',       // Diretório onde está o index.html
          reportFiles: 'index.html',               // Arquivo principal do relatório
          reportName: 'Relatório Cypress',         // Nome que aparecerá no Jenkins
          keepAll: true,                           // Mantém relatórios de builds anteriores
          alwaysLinkToLastBuild: true,             // Cria link direto para o último build
          allowMissing: false                      // Fails se o arquivo estiver ausente
        ])
      }
    }

    // 📁 Estágio 6: Publicação do index.html como artefato
    stage('Publicar artefato do relatório') {
      steps {
        // Salva o index.html como artefato acessível por build
        archiveArtifacts artifacts: 'cypress/reports/html/index.html', fingerprint: true
      }
    }

    // 🖼️ Estágio 7: Publicação dos screenshots como artefatos (opcional)
    stage('Publicar screenshots (opcional)') {
      steps {
        // Salva todas as imagens geradas durante os testes como artefatos
        archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true
      }
    }
  }
}
