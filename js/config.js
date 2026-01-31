/**
 * config.js
 * 
 * Define constantes globais com os fatores de emissão de CO₂
 * por tipo de transporte (em kg de CO₂ por passageiro por km).
 * 
 * Valores baseados em médias internacionais e podem variar
 * conforme condições específicas (tipo de veículo, ocupação, etc).
 */

// Fatores de emissão de CO₂ (kg CO₂ / passageiro / km)
const EMISSION_FACTORS = {
    // Transporte terrestre
    car: 0.192,           // Carro a gasolina (média de ocupação 1.5 passageiros)
    car_electric: 0.05,   // Carro elétrico (considerando mix energético brasileiro)
    motorcycle: 0.113,    // Motocicleta
    bus: 0.089,           // Ônibus urbano/interurbano
    train: 0.014,         // Trem elétrico
    walking: 0,           // Pessoa a pé (sem emissão do transporte, apenas respiração)
    
    // Transporte aéreo
    plane_domestic: 0.255,    // Avião - voo doméstico (curta distância)
    plane_international: 0.195, // Avião - voo internacional (longa distância)
    
    // Transporte aquático
    ship: 0.019,          // Navio/Cruzeiro
    ferry: 0.018          // Balsa/Ferry
};

// Fator de emissão de CO₂ pela respiração humana (kg CO₂ / pessoa / km)
// Baseado em: pessoa emite ~1 kg CO₂/dia, caminha ~5 km/h = 120 km/dia
// Então: 1 kg / 120 km = ~0.0083 kg CO₂/km por pessoa
const HUMAN_RESPIRATION_FACTOR = 0.0083; // kg CO₂ / pessoa / km

/**
 * Retorna o fator de emissão para um tipo de transporte
 * @param {string} transportType - Tipo de transporte
 * @returns {number} - Fator de emissão (kg CO₂ / passageiro / km)
 */
function getEmissionFactor(transportType) {
    return EMISSION_FACTORS[transportType] || 0;
}

/**
 * Retorna o fator de emissão pela respiração humana
 * @returns {number} - Fator de emissão (kg CO₂ / pessoa / km)
 */
function getHumanRespirationFactor() {
    return HUMAN_RESPIRATION_FACTOR;
}

/**
 * Retorna todos os fatores de emissão disponíveis
 * @returns {Object} - Objeto com todos os fatores
 */
function getAllEmissionFactors() {
    return EMISSION_FACTORS;
}

/**
 * Retorna os tipos de transporte disponíveis com seus nomes formatados e ícones
 * @returns {Array} - Array de objetos com id, nome e ícone do transporte
 */
function getTransportTypes() {
    return [
        { id: 'car', name: 'Carro (Gasolina)', icon: '🚗' },
        { id: 'car_electric', name: 'Carro Elétrico', icon: '🚙' },
        { id: 'motorcycle', name: 'Motocicleta', icon: '🏍️' },
        { id: 'bus', name: 'Ônibus', icon: '🚌' },
        { id: 'train', name: 'Trem', icon: '🚂' },
        { id: 'walking', name: 'Pessoa A Pé', icon: '🚶' },
        { id: 'plane_domestic', name: 'Avião (Voo Doméstico)', icon: '✈️' },
        { id: 'plane_international', name: 'Avião (Voo Internacional)', icon: '🛫' },
        { id: 'ship', name: 'Navio/Cruzeiro', icon: '🚢' },
        { id: 'ferry', name: 'Balsa/Ferry', icon: '⛴️' }
    ];
}

/**
 * Retorna o nome formatado de um tipo de transporte
 * @param {string} transportId - ID do tipo de transporte
 * @returns {string} - Nome formatado do transporte
 */
function getTransportName(transportId) {
    const transports = getTransportTypes();
    const transport = transports.find(t => t.id === transportId);
    return transport ? transport.name : transportId;
}

/**
 * Retorna o ícone de um tipo de transporte
 * @param {string} transportId - ID do tipo de transporte
 * @returns {string} - Ícone do transporte
 */
function getTransportIcon(transportId) {
    const transports = getTransportTypes();
    const transport = transports.find(t => t.id === transportId);
    return transport ? transport.icon : '';
}

/**
 * Retorna o nome formatado com ícone de um tipo de transporte
 * @param {string} transportId - ID do tipo de transporte
 * @returns {string} - Nome formatado com ícone (ex: "🚗 Carro (Gasolina)")
 */
function getTransportNameWithIcon(transportId) {
    const transports = getTransportTypes();
    const transport = transports.find(t => t.id === transportId);
    return transport ? `${transport.icon} ${transport.name}` : transportId;
}
