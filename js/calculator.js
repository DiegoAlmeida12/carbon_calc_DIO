/**
 * calculator.js
 * 
 * Contém apenas a lógica de cálculo de emissão de CO₂.
 * Funções puras, sem dependências de DOM ou outras bibliotecas.
 */

/**
 * Calcula a emissão de CO₂ para uma viagem
 * Inclui tanto a emissão do transporte quanto a respiração humana
 * 
 * @param {number} distance - Distância da viagem em quilômetros
 * @param {number} transportEmissionFactor - Fator de emissão do transporte (kg CO₂ / passageiro / km)
 * @param {number} people - Número de pessoas (padrão: 1)
 * @param {string} transportId - ID do tipo de transporte (para verificar se é walking)
 * @param {number} humanRespirationFactor - Fator de emissão pela respiração humana (kg CO₂ / pessoa / km)
 * @returns {number} - Emissão total de CO₂ em quilogramas
 */
function calculateCO2Emission(distance, transportEmissionFactor, people = 1, transportId = '', humanRespirationFactor = 0.0083) {
    if (distance <= 0 || people < 1) {
        return 0;
    }
    
    if (transportEmissionFactor < 0 || humanRespirationFactor < 0) {
        return 0;
    }
    
    // Se for "Pessoa A Pé", retorna 0 (sem emissão)
    if (transportId === 'walking') {
        return 0;
    }
    
    // Emissão do transporte: (distância × fator do transporte) / número de pessoas
    // Quando há mais de uma pessoa, a emissão do transporte é dividida entre elas
    const transportEmission = (distance * transportEmissionFactor) / people;
    
    // Emissão pela respiração humana: distância × fator de respiração × número de pessoas
    // Cada pessoa emite CO₂ pela respiração
    const humanEmission = distance * humanRespirationFactor * people;
    
    // Emissão total = emissão do transporte (dividida) + emissão humana (multiplicada)
    return transportEmission + humanEmission;
}

/**
 * Calcula a emissão detalhada de CO₂ por pessoa
 * Retorna um objeto com a divisão entre emissão do transporte e emissão humana
 * 
 * @param {number} distance - Distância da viagem em quilômetros
 * @param {number} transportEmissionFactor - Fator de emissão do transporte (kg CO₂ / passageiro / km)
 * @param {number} people - Número de pessoas
 * @param {string} transportId - ID do tipo de transporte (para verificar se é walking)
 * @param {number} humanRespirationFactor - Fator de emissão pela respiração humana (kg CO₂ / pessoa / km)
 * @returns {Object} - Objeto com transportPerPerson, humanPerPerson e totalPerPerson
 */
function calculateDetailedEmissionPerPerson(distance, transportEmissionFactor, people = 1, transportId = '', humanRespirationFactor = 0.0083) {
    if (distance <= 0 || people < 1) {
        return {
            transportPerPerson: 0,
            humanPerPerson: 0,
            totalPerPerson: 0
        };
    }
    
    if (transportEmissionFactor < 0 || humanRespirationFactor < 0) {
        return {
            transportPerPerson: 0,
            humanPerPerson: 0,
            totalPerPerson: 0
        };
    }
    
    // Se for "Pessoa A Pé", retorna tudo zero
    if (transportId === 'walking') {
        return {
            transportPerPerson: 0,
            humanPerPerson: 0,
            totalPerPerson: 0
        };
    }
    
    // Emissão do transporte por pessoa: (distância × fator do transporte) / número de pessoas
    const transportPerPerson = (distance * transportEmissionFactor) / people;
    
    // Emissão humana por pessoa: distância × fator de respiração (cada pessoa emite individualmente)
    const humanPerPerson = distance * humanRespirationFactor;
    
    // Total por pessoa = emissão do transporte (dividida) + emissão humana (individual)
    const totalPerPerson = transportPerPerson + humanPerPerson;
    
    return {
        transportPerPerson: transportPerPerson,
        humanPerPerson: humanPerPerson,
        totalPerPerson: totalPerPerson
    };
}

/**
 * Formata o valor de emissão de CO₂ para exibição
 * 
 * @param {number} emission - Emissão em quilogramas
 * @param {number} decimals - Número de casas decimais (padrão: 2)
 * @returns {string} - String formatada (ex: "82.35 kg CO₂")
 */
function formatEmission(emission, decimals = 2) {
    if (emission === 0) {
        return '0 kg CO₂';
    }
    
    const formatted = emission.toFixed(decimals);
    return `${formatted} kg CO₂`;
}

/**
 * Formata a distância para exibição
 * 
 * @param {number} distance - Distância em quilômetros
 * @returns {string} - String formatada (ex: "429 km")
 */
function formatDistance(distance) {
    if (distance <= 0) {
        return '0 km';
    }
    
    return `${distance} km`;
}

/**
 * Calcula a emissão de CO₂ equivalente em árvores necessárias para compensar
 * (aproximadamente: 1 árvore absorve 22 kg CO₂ por ano)
 * 
 * @param {number} emission - Emissão de CO₂ em quilogramas
 * @returns {number} - Número aproximado de árvores necessárias
 */
function calculateTreesNeeded(emission) {
    const CO2_PER_TREE_PER_YEAR = 22; // kg CO₂ por árvore por ano
    return Math.ceil(emission / CO2_PER_TREE_PER_YEAR);
}

/**
 * Valida se os parâmetros de cálculo são válidos
 * 
 * @param {number} distance - Distância em quilômetros
 * @param {number} emissionFactor - Fator de emissão
 * @returns {Object} - Objeto com isValid (boolean) e message (string)
 */
function validateCalculationParams(distance, emissionFactor) {
    if (distance === null || distance === undefined) {
        return {
            isValid: false,
            message: 'Não foi possível calcular a distância entre as cidades selecionadas.'
        };
    }
    
    if (distance < 0) {
        return {
            isValid: false,
            message: 'A distância não pode ser negativa.'
        };
    }
    
    if (distance === 0) {
        return {
            isValid: false,
            message: 'A origem e o destino não podem ser a mesma cidade.'
        };
    }
    
    if (emissionFactor < 0) {
        return {
            isValid: false,
            message: 'O fator de emissão não pode ser negativo.'
        };
    }
    
    // Não rejeita se emissionFactor for 0, pois ainda há emissão pela respiração humana
    // A validação de transporte inválido é feita em app.js
    
    return {
        isValid: true,
        message: ''
    };
}
