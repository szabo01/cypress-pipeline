
# 🧪 Cypress Pipeline - Testes Automatizados

Este projeto contém uma suíte de testes automatizados para uma aplicação *Todo App*, utilizando [Cypress](https://www.cypress.io/) como framework de testes end-to-end. A pipeline está integrada ao [Jenkins](https://www.jenkins.io/) para execução contínua e geração de relatórios interativos.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- [Jenkins](https://www.jenkins.io/)
- [Mochawesome Reporter](https://github.com/adamgruber/mochawesome)
- [Mocha JUnit Reporter](https://github.com/michaelleeallen/mocha-junit-reporter)
- Node.js

---

## 📁 Estrutura do Projeto

cypress-pipeline/ ├── cypress/ │ ├── e2e/ # Testes end-to-end │ ├── screenshots/ # Prints gerados automaticamente │ └── reports/ │ ├── html/ # Relatórios HTML (Mochawesome) │ └── junit/ # Relatórios XML (JUnit) ├── jenkins/ │ └── Jenkinsfile # Pipeline declarativa ├── cypress.config.js # Configuração do Cypress └── README.md

Código

---

## ⚙️ Executando os Testes Localmente

1. Instale as dependências:
   ```bash
   npm install
Execute os testes:

bash
npm run cy:run:chrome
Os relatórios serão gerados em cypress/reports/html/index.html.

🧩 Integração com Jenkins
A pipeline está configurada para:

Executar os testes automaticamente

Gerar relatórios HTML e XML

Publicar artefatos no painel do Jenkins

Exibir prints dos testes

Exemplo de comandos usados na pipeline:
groovy
publishHTML([
  reportDir: 'cypress/reports/html',
  reportFiles: 'index.html',
  reportName: 'Relatório Cypress',
  keepAll: true,
  alwaysLinkToLastBuild: true
])

archiveArtifacts artifacts: 'cypress/reports/html/index.html', fingerprint: true
archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', fingerprint: true
📊 Relatórios
Relatório HTML: Interativo, com gráficos, prints e tempo de execução por teste.

Relatório JUnit: XML compatível com ferramentas de CI/CD.

Artefatos: Disponíveis por build no Jenkins.

👨‍💻 Autor
Robson Desenvolvedor de testes e automações 📍 João Pessoa, PB – Brasil