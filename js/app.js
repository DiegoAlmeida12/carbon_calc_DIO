/**
 * app.js
 * 
 * Ponto de entrada da aplicação.
 * Responsável por inicializar o sistema, registrar eventos
 * e integrar a interface com a lógica de cálculo.
 */

/**
 * Inicializa a aplicação
 */
function initApp() {
    // Popula os selects com as opções disponíveis
    populateCapitalSelects();
    populateTransportSelect();
    
    // Registra os event listeners
    registerEventListeners();
    
    console.log('Calculadora de CO₂ inicializada com sucesso!');
}

/**
 * Registra todos os event listeners da aplicação
 */
function registerEventListeners() {
    // Event listener do formulário
    const form = document.getElementById('carbonForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
    
    // Event listener do botão de reset
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', handleReset);
    }
    
    // Event listeners para calcular distância automaticamente
    const originSelect = document.getElementById('originSelect');
    const destinationSelect = document.getElementById('destinationSelect');
    
    if (originSelect) {
        originSelect.addEventListener('change', () => {
            calculateAndDisplayDistance();
            hideMessage();
        });
    }
    
    if (destinationSelect) {
        destinationSelect.addEventListener('change', () => {
            calculateAndDisplayDistance();
            hideMessage();
        });
    }
    
    // Event listener para limpar mensagens quando o usuário interage com o transporte
    const transportSelect = document.getElementById('transportSelect');
    if (transportSelect) {
        transportSelect.addEventListener('change', hideMessage);
    }
    
    // Event listener para limpar mensagens quando o usuário interage com o número de pessoas
    const peopleInput = document.getElementById('peopleInput');
    if (peopleInput) {
        peopleInput.addEventListener('change', hideMessage);
        peopleInput.addEventListener('input', hideMessage);
    }
}

/**
 * Manipula o submit do formulário
 * @param {Event} event - Evento de submit
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Valida o formulário
    const validation = validateForm();
    if (!validation.isValid) {
        showMessage(validation.message, 'error');
        return;
    }
    
    // Obtém os dados do formulário
    const formData = getFormData();
    if (!formData) {
        showMessage('Erro ao obter dados do formulário.', 'error');
        return;
    }
    
    // Valida a distância
    if (formData.distance === null || formData.distance === undefined) {
        showMessage('Não foi possível calcular a distância entre as cidades selecionadas.', 'error');
        return;
    }
    
    if (formData.distance <= 0) {
        showMessage('A origem e o destino não podem ser a mesma cidade.', 'error');
        return;
    }
    
    // Obtém o fator de emissão do transporte selecionado
    const transportEmissionFactor = getEmissionFactor(formData.transportId);
    if (transportEmissionFactor === null || transportEmissionFactor === undefined || transportEmissionFactor < 0) {
        showMessage('Tipo de transporte não encontrado ou inválido.', 'error');
        return;
    }
    
    // Obtém o fator de emissão pela respiração humana
    const humanRespirationFactor = getHumanRespirationFactor();
    
    // Valida os parâmetros de cálculo (permite fator 0 do transporte, pois há emissão humana)
    const calcValidation = validateCalculationParams(formData.distance, transportEmissionFactor);
    if (!calcValidation.isValid) {
        showMessage(calcValidation.message, 'error');
        return;
    }
    
    // Calcula a emissão de CO₂ (considerando transporte + respiração humana + número de pessoas)
    // Para "Pessoa A Pé" retorna 0,0
    // Quando há mais de uma pessoa, a emissão do transporte é dividida entre elas
    const emission = calculateCO2Emission(
        formData.distance, 
        transportEmissionFactor, 
        formData.people, 
        formData.transportId,
        humanRespirationFactor
    );
    
    // Calcula a emissão detalhada por pessoa (divisão entre transporte e respiração)
    const detailedEmission = calculateDetailedEmissionPerPerson(
        formData.distance,
        transportEmissionFactor,
        formData.people,
        formData.transportId,
        humanRespirationFactor
    );
    
    // Prepara o resultado para exibição
    const result = {
        origin: formData.origin,
        destination: formData.destination,
        distance: formatDistance(formData.distance),
        transport: getTransportNameWithIcon(formData.transportId),
        people: formData.people,
        transportPerPerson: formatEmission(detailedEmission.transportPerPerson),
        humanPerPerson: formatEmission(detailedEmission.humanPerPerson),
        emissionPerPerson: formatEmission(detailedEmission.totalPerPerson),
        emission: formatEmission(emission),
        showDetailed: formData.transportId !== 'walking' // Mostra detalhes apenas se não for caminhada
    };
    
    // Exibe o resultado
    displayResult(result);
    
    // Exibe mensagem de sucesso
    showMessage('Cálculo realizado com sucesso!', 'success');
}

/**
 * Manipula o clique no botão de reset
 */
function handleReset() {
    resetForm();
    showMessage('Formulário resetado. Você pode fazer um novo cálculo.', 'success');
}

// Inicializa a aplicação quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM já está pronto
    initApp();
}
