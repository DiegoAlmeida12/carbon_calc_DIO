/**
 * ui.js
 * 
 * Responsável por manipulação do DOM, captura de dados do formulário
 * e exibição de resultados e mensagens ao usuário.
 */

/**
 * Popula os selects de origem e destino com as capitais disponíveis
 */
function populateCapitalSelects() {
    const originSelect = document.getElementById('originSelect');
    const destinationSelect = document.getElementById('destinationSelect');
    
    if (!originSelect || !destinationSelect) return;
    
    const capitals = getAllCapitals();
    
    // Limpa e popula o select de origem
    originSelect.innerHTML = '<option value="">-- Selecione a origem --</option>';
    capitals.forEach(capital => {
        const option = document.createElement('option');
        option.value = capital;
        option.textContent = capital;
        originSelect.appendChild(option);
    });
    
    // Limpa e popula o select de destino
    destinationSelect.innerHTML = '<option value="">-- Selecione o destino --</option>';
    capitals.forEach(capital => {
        const option = document.createElement('option');
        option.value = capital;
        option.textContent = capital;
        destinationSelect.appendChild(option);
    });
}

/**
 * Popula o select de tipos de transporte com as opções disponíveis e ícones
 */
function populateTransportSelect() {
    const transportSelect = document.getElementById('transportSelect');
    if (!transportSelect) return;
    
    const transports = getTransportTypes();
    
    // Limpa opções existentes (exceto a primeira opção padrão)
    transportSelect.innerHTML = '<option value="">-- Selecione o transporte --</option>';
    
    // Adiciona cada tipo de transporte como opção com ícone
    transports.forEach(transport => {
        const option = document.createElement('option');
        option.value = transport.id;
        option.textContent = `${transport.icon} ${transport.name}`;
        transportSelect.appendChild(option);
    });
}

/**
 * Calcula e exibe a distância automaticamente quando origem e destino são selecionados
 */
function calculateAndDisplayDistance() {
    const originSelect = document.getElementById('originSelect');
    const destinationSelect = document.getElementById('destinationSelect');
    const distanceDisplay = document.getElementById('distanceDisplay');
    const calculatedDistance = document.getElementById('calculatedDistance');
    
    if (!originSelect || !destinationSelect || !distanceDisplay || !calculatedDistance) {
        return;
    }
    
    const origin = originSelect.value;
    const destination = destinationSelect.value;
    
    // Se ambos estão selecionados, calcula a distância
    if (origin && destination) {
        if (origin === destination) {
            hideDistanceDisplay();
            showMessage('A origem e o destino não podem ser a mesma cidade.', 'warning');
            return;
        }
        
        const distance = getDistanceBetweenCapitals(origin, destination);
        
        if (distance !== null && distance !== undefined) {
            calculatedDistance.textContent = formatDistance(distance);
            distanceDisplay.classList.remove('hidden');
            hideMessage();
        } else {
            hideDistanceDisplay();
            showMessage('Não foi possível calcular a distância entre as cidades selecionadas.', 'error');
        }
    } else {
        hideDistanceDisplay();
    }
}

/**
 * Oculta o display de distância
 */
function hideDistanceDisplay() {
    const distanceDisplay = document.getElementById('distanceDisplay');
    if (distanceDisplay) {
        distanceDisplay.classList.add('hidden');
    }
}

/**
 * Captura os dados do formulário
 * @returns {Object|null} - Objeto com origin, destination, distance, transportId e people, ou null se inválido
 */
function getFormData() {
    const originSelect = document.getElementById('originSelect');
    const destinationSelect = document.getElementById('destinationSelect');
    const transportSelect = document.getElementById('transportSelect');
    const peopleInput = document.getElementById('peopleInput');
    
    if (!originSelect || !destinationSelect || !transportSelect || !peopleInput) {
        return null;
    }
    
    const origin = originSelect.value;
    const destination = destinationSelect.value;
    const transportId = transportSelect.value;
    const people = parseInt(peopleInput.value, 10);
    
    if (!origin || !destination || !transportId || !people || people < 1) {
        return null;
    }
    
    // Calcula a distância
    const distance = getDistanceBetweenCapitals(origin, destination);
    
    return {
        origin: origin,
        destination: destination,
        distance: distance,
        transportId: transportId,
        people: people
    };
}

/**
 * Exibe o resultado do cálculo na interface
 * @param {Object} result - Objeto com origin, destination, distance, transport, people, transportPerPerson, humanPerPerson, emissionPerPerson, emission e showDetailed
 */
function displayResult(result) {
    const resultContainer = document.getElementById('resultContainer');
    const resultOrigin = document.getElementById('resultOrigin');
    const resultDestination = document.getElementById('resultDestination');
    const resultDistance = document.getElementById('resultDistance');
    const resultTransport = document.getElementById('resultTransport');
    const resultPeople = document.getElementById('resultPeople');
    const detailedEmissionSection = document.getElementById('detailedEmissionSection');
    const resultTransportPerPerson = document.getElementById('resultTransportPerPerson');
    const resultHumanPerPerson = document.getElementById('resultHumanPerPerson');
    const resultEmissionPerPerson = document.getElementById('resultEmissionPerPerson');
    const resultEmission = document.getElementById('resultEmission');
    
    if (!resultContainer || !resultOrigin || !resultDestination || !resultDistance || 
        !resultTransport || !resultPeople || !resultEmission) {
        return;
    }
    
    // Preenche os campos básicos de resultado
    resultOrigin.textContent = result.origin || '-';
    resultDestination.textContent = result.destination || '-';
    resultDistance.textContent = result.distance || '-';
    resultTransport.textContent = result.transport || '-';
    resultPeople.textContent = result.people || '-';
    resultEmission.textContent = result.emission || '-';
    
    // Preenche os campos detalhados se disponíveis e se não for caminhada
    if (detailedEmissionSection && resultTransportPerPerson && resultHumanPerPerson && resultEmissionPerPerson) {
        if (result.showDetailed) {
            resultTransportPerPerson.textContent = result.transportPerPerson || '0 kg CO₂';
            resultHumanPerPerson.textContent = result.humanPerPerson || '0 kg CO₂';
            resultEmissionPerPerson.textContent = result.emissionPerPerson || '0 kg CO₂';
            detailedEmissionSection.classList.remove('hidden');
        } else {
            detailedEmissionSection.classList.add('hidden');
            // Se for caminhada, mostra 0 na emissão por pessoa
            resultEmissionPerPerson.textContent = '0 kg CO₂';
        }
    }
    
    // Exibe o container de resultados
    resultContainer.classList.remove('hidden');
    
    // Scroll suave até o resultado
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Oculta o container de resultados
 */
function hideResult() {
    const resultContainer = document.getElementById('resultContainer');
    if (resultContainer) {
        resultContainer.classList.add('hidden');
    }
}

/**
 * Exibe uma mensagem para o usuário
 * @param {string} message - Texto da mensagem
 * @param {string} type - Tipo da mensagem: 'success', 'error' ou 'warning'
 */
function showMessage(message, type = 'success') {
    const messageContainer = document.getElementById('messageContainer');
    if (!messageContainer) return;
    
    // Remove classes anteriores
    messageContainer.classList.remove('success', 'error', 'warning', 'hidden');
    
    // Adiciona a classe do tipo
    messageContainer.classList.add(type);
    
    // Define o texto
    messageContainer.textContent = message;
    
    // Exibe o container
    messageContainer.classList.remove('hidden');
    
    // Auto-oculta após 5 segundos (exceto para erros)
    if (type !== 'error') {
        setTimeout(() => {
            hideMessage();
        }, 5000);
    }
}

/**
 * Oculta a mensagem
 */
function hideMessage() {
    const messageContainer = document.getElementById('messageContainer');
    if (messageContainer) {
        messageContainer.classList.add('hidden');
    }
}

/**
 * Limpa o formulário e reseta a interface
 */
function resetForm() {
    const form = document.getElementById('carbonForm');
    if (form) {
        form.reset();
    }
    
    hideResult();
    hideDistanceDisplay();
    hideMessage();
}

/**
 * Valida se o formulário está preenchido corretamente
 * @returns {Object} - Objeto com isValid (boolean) e message (string)
 */
function validateForm() {
    const formData = getFormData();
    
    if (!formData) {
        return {
            isValid: false,
            message: 'Por favor, preencha todos os campos.'
        };
    }
    
    if (formData.origin === formData.destination) {
        return {
            isValid: false,
            message: 'A origem e o destino não podem ser a mesma cidade.'
        };
    }
    
    if (formData.distance === null || formData.distance === undefined) {
        return {
            isValid: false,
            message: 'Não foi possível calcular a distância entre as cidades selecionadas.'
        };
    }
    
    if (!formData.people || formData.people < 1) {
        return {
            isValid: false,
            message: 'O número de pessoas deve ser pelo menos 1.'
        };
    }
    
    if (formData.people > 1000) {
        return {
            isValid: false,
            message: 'O número de pessoas não pode ser maior que 1000.'
        };
    }
    
    return {
        isValid: true,
        message: ''
    };
}
