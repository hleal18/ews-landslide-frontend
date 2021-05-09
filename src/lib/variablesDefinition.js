/**
 * It contains definition of variables measured by the application.
 * The definitions or values, are categorized as values used at
 * system, application or back-end level and those used to be shown
 * to the user, in this case, translated to spanish.
 * This file is intended to be used as a centralized location
 * where all the supported variables and its respective translations
 * are stored. From here, different components can imported and execute
 * appropriate functionality and show appropriate menus.
 */

 export const variablesDefinitionsAsObjectWithUnits = {
    soilMoisture: 'Humedad de Suelo (%)',
    inclination: 'Inclinación (°)',
    waterLevel: 'Nivel de Agua (mm)',
    temperature: 'Temperatura (°C)',
    voltage: 'Voltaje (V)'
}

export const variablesDefinitionAsArrays = {
  names: [
    variablesDefinitionsAsObjectWithUnits.soilMoisture,
    variablesDefinitionsAsObjectWithUnits.inclination,
    variablesDefinitionsAsObjectWithUnits.waterLevel,
    variablesDefinitionsAsObjectWithUnits.temperature,
    variablesDefinitionsAsObjectWithUnits.voltage,
  ],
  values: [
    "soilMoisture",
    "inclination",
    "waterLevel",
    "temperature",
    "voltage",
  ],
};

export const variablesDefinitionAsObject = {
    soilMoisture: 'Humedad de Suelo',
    inclination: 'Inclinación',
    waterLevel: 'Nivel de Agua',
    temperature: 'Temperatura',
    voltage: 'Voltaje'
}

export const getUnitFromVariableType = (variableType) => {
    switch(variableType) {
        case 'soilMoisture': return '%';
        case 'inclination': return '°';
        case 'waterLevel': return 'mm';
        case 'temperature': return '°C';
        case 'voltage': return 'V';
        default: return '';
    }
}
