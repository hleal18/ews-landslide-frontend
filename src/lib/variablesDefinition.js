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


export const variablesDefinitionAsArrays = {
    names: ['Humedad de Suelo', 'Inclinación', 'Nivel de Agua', 'Temperatura', 'Voltaje'],
    values: ['soilMoisture', 'inclination', 'waterLevel', 'temperature', 'voltage']
}

export const variablesDefinitionAsObject = {
    soilMoisture: 'Humedad de Suelo',
    inclination: 'Inclinación',
    waterLevel: 'Nivel de Agua',
    temperature: 'Temperatura',
    voltage: 'Voltaje'
}