# 🌍 Calculadora de Emissão de CO₂

Aplicação web completa para cálculo de emissão de dióxido de carbono (CO₂) em viagens, desenvolvida com HTML, CSS e JavaScript puro (Vanilla JS), sem dependências externas.

## 📋 Sobre o Projeto

Esta aplicação permite calcular a quantidade de CO₂ emitida em uma viagem, com base na rota selecionada e no tipo de transporte utilizado. Os cálculos são baseados em fatores de emissão médios internacionalmente reconhecidos.

## 🗂️ Estrutura do Projeto

```
carbon-calculator/
├── index.html          # Estrutura HTML da aplicação
├── css/
│   └── style.css      # Estilização completa da interface
├── js/
│   ├── routes-data.js # Dados das rotas (cidades e distâncias)
│   ├── config.js      # Fatores de emissão de CO₂ por transporte
│   ├── calculator.js  # Lógica de cálculo (funções puras)
│   ├── ui.js          # Manipulação de DOM e interface
│   └── app.js         # Ponto de entrada e integração
└── README.md          # Documentação do projeto
```

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** em um navegador web moderno
2. **Selecione uma rota** no primeiro campo (origem → destino)
3. **Selecione o tipo de transporte** no segundo campo
4. **Clique em "Calcular Emissão"** para ver o resultado
5. **Visualize o resultado** com a rota, distância, transporte e emissão de CO₂

## 📁 Responsabilidades dos Arquivos

### `index.html`
Estrutura HTML da aplicação, contendo:
- Formulário para seleção de rota e transporte
- Área para exibição dos resultados
- Container para mensagens ao usuário

### `css/style.css`
Estilização completa da interface, incluindo:
- Design responsivo e moderno
- Animações suaves
- Cores e gradientes
- Layout adaptável para mobile

### `js/routes-data.js`
Contém os dados das rotas disponíveis:
- Array global `ROUTES` com todas as rotas
- Funções auxiliares para buscar e formatar rotas
- Cada rota possui: id, origem, destino e distância (km)

### `js/config.js`
Define os fatores de emissão de CO₂:
- Constantes globais com fatores por tipo de transporte
- Valores em kg CO₂ / passageiro / km
- Funções para acessar fatores e tipos de transporte

### `js/calculator.js`
Lógica pura de cálculo:
- Função `calculateCO2Emission()` - calcula a emissão
- Funções de formatação para exibição
- Funções de validação de parâmetros
- Sem dependências de DOM

### `js/ui.js`
Manipulação de interface:
- População dos selects com dados
- Captura de dados do formulário
- Exibição de resultados e mensagens
- Controle de visibilidade de elementos

### `js/app.js`
Ponto de entrada da aplicação:
- Inicialização do sistema
- Registro de event listeners
- Integração entre interface e lógica
- Orquestração do fluxo da aplicação

## 🧮 Fatores de Emissão

Os fatores de emissão utilizados (em kg CO₂ / passageiro / km):

- **Carro (Gasolina)**: 0.192
- **Carro Elétrico**: 0.05
- **Motocicleta**: 0.113
- **Ônibus**: 0.089
- **Trem**: 0.014
- **Avião (Doméstico)**: 0.255
- **Avião (Internacional)**: 0.195
- **Navio/Cruzeiro**: 0.019
- **Balsa/Ferry**: 0.018

*Nota: Os valores são médias e podem variar conforme condições específicas.*

## 🎨 Características

- ✅ Interface moderna e responsiva
- ✅ Código limpo e bem organizado
- ✅ Separação de responsabilidades
- ✅ Funções puras e testáveis
- ✅ Sem dependências externas
- ✅ Compatível com navegadores modernos
- ✅ Animações suaves
- ✅ Feedback visual ao usuário

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura
- **CSS3** - Estilização (com variáveis CSS e gradientes)
- **JavaScript (ES6+)** - Lógica e interatividade

## 📝 Notas

- Os dados de rotas e fatores de emissão podem ser facilmente atualizados nos arquivos `routes-data.js` e `config.js`
- A aplicação não requer servidor web - pode ser aberta diretamente no navegador
- Todos os cálculos são realizados no lado do cliente (client-side)

## 📄 Licença

Este projeto é de código aberto e está disponível para uso livre.

---

**Desenvolvido com foco em boas práticas de desenvolvimento web e código limpo.**
