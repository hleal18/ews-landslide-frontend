const url = 'http://localhost:3002/api/';
export default class EwsApi {


    static async getDevice(deviceId) {
        const result = await fetch(url + 'devices/' + deviceId, { method: 'GET', mode: 'cors' });

        const resultJson = await result.json();

        return resultJson;
    }

    static async getDevices() {
        const devicesResponse = await fetch(url + 'devices', { method: 'GET', mode: 'cors' });
        console.log('Response: ', devicesResponse);
        const devicesResponseJson = await devicesResponse.json();
        console.log('Transformation: ', devicesResponseJson);

        const deviceRecords = devicesResponseJson.devices;
        return deviceRecords;
    }

    // static async getVariables(deviceId, { type = undefined, limit = 20, offset = 0, start = new Date(0), end = new Date() }) {
    static async getVariables(deviceId, { idSensor = undefined, type = undefined, limit = 20, offset = 0, start = new Date(0), end = new Date() } = {}) {
        const newUrl = new URL(url + 'variables/' + deviceId);
        if (idSensor) newUrl.searchParams.append('idSensor', idSensor);
        if (type) newUrl.searchParams.append('type', type);
        if (limit) newUrl.searchParams.append('limit', limit);
        newUrl.searchParams.append('offset', offset);
        if (start) newUrl.searchParams.append('start', start);
        if (end) newUrl.searchParams.append('end', end);

        const result = await fetch(newUrl, {
            method: 'GET',
            headers: {
                'Contenty-Type': 'application/json'
            }
        });

        const resultJson = await result.json();
        return resultJson;
    }
}