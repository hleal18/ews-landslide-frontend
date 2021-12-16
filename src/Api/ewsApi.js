// const url = 'http://localhost:3002/api/';
// const url = 'http://sat.api.semard.com.co/api/';
const url = `http://${process.env.REACT_APP_API}/api/`;

export default class EwsApi {
    static async signUp(firstName, lastName, email, password) {
        const result = await fetch(url + "users/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
            body: JSON.stringify({
                user: {
                    firstName,
                    lastName,
                    email,
                    password,
                },
            }),
        });

        return await result.json();
    }

    static async login(email, pass) {
        const result = await fetch(url + "users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
            body: JSON.stringify({
                email: email,
                password: pass,
            }),
        });

        const resultJson = await result.json();

        return resultJson;
    }

    static async getUser(token) {
        const result = await fetch(url + "users", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            mode: "cors",
        });

        const resultJson = await result.json();

        return resultJson;
    }

    static async addRiskZone(name, description, token) {
        const result = await fetch(url + "riskzones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
            }),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const riskZone = resultJson.riskZone;
            return riskZone;
        } else
            throw new Error(
                `Error on request: ${result.status} with message: ${resultJson.message}`
            );
    }

    static async getRiskZones(token) {
        const result = await fetch(url + "riskzones", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: `BEARER ${token}`,
            },
            mode: "cors",
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { riskZones } = resultJson;
            return riskZones;
        } else
            throw new Error(
                `Error while getting risk zones: ${result.status} with message: ${resultJson.message}`
            );
    }

    static async addCriticalSpot(
        name,
        riskZoneId,
        token,
        description = "",
        latitude = 0,
        longitude = 0
    ) {
        const result = await fetch(url + "criticalspots", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                name,
                riskZoneId,
                description,
                latitude,
                longitude,
            }),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const criticalSpot = resultJson.criticalSpot;
            return criticalSpot;
        } else
            throw new Error(
                `Error on request: ${result.status} with message: ${resultJson.message}`
            );
    }

    static async getCriticalSpots(token) {
        const result = await fetch(url + "criticalspots", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { criticalSpots } = resultJson;
            return criticalSpots;
        } else
            throw new Error(
                `Error on request: ${result.status} with message: ${resultJson.message}`
            );
    }

    static async addSensorNode(name, description = "", criticalSpotId, token) {
        const result = await fetch(url + "devices", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
                criticalSpotId,
            }),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { device } = resultJson;
            return device;
        } else
            throw new Error(
                `Error occurred while addding a new sensor, status code ${result.status} with error message ${resultJson.message}`
            );
    }

    static async addVariable(
        name,
        description,
        idSensor,
        type,
        sensorNodeId,
        token
    ) {
        const result = await fetch(url + "devices/" + sensorNodeId, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({
                name,
                description,
                idSensor,
                type,
            }),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { device } = resultJson;
            return device;
        } else
            throw new Error(
                `Error while adding a new variable, status code ${result.status} with error code ${resultJson.message}`
            );
    }

    static async getSensorNode(deviceId, token) {
        const result = await fetch(url + "devices/" + deviceId, {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });

        const resultJson = await result.json();

        return resultJson;
    }

    static async getSensorNodes(token) {
        const devicesResponse = await fetch(url + "devices", {
            method: "GET",
            mode: "cors",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });
        const devicesResponseJson = await devicesResponse.json();
        //console.log('Transformation: ', devicesResponseJson);

        const deviceRecords = devicesResponseJson.devices;

        if (devicesResponse.status === 200) {
            const { devices } = deviceRecords;
            return devices;
        } else
            throw new Error(
                `Error while fetching sensor nodes, error code ${devicesResponse.status} with message: ${devicesResponseJson.message}`
            );
    }

    // static async getVariables(deviceId, { type = undefined, limit = 20, offset = 0, start = new Date(0), end = new Date() }) {
    static async getVariables(
        deviceId,
        {
            idSensor = undefined,
            type = undefined,
            limit = 20,
            offset = 0,
            start = new Date(0),
            end = new Date(),
        } = {},
        token
    ) {
        const newUrl = new URL(url + "variables/" + deviceId);
        if (idSensor) newUrl.searchParams.append("idSensor", idSensor);
        if (type) newUrl.searchParams.append("type", type);
        if (limit) newUrl.searchParams.append("limit", limit);
        newUrl.searchParams.append("offset", offset);
        if (start) newUrl.searchParams.append("start", start);
        if (end) newUrl.searchParams.append("end", end);

        const result = await fetch(newUrl, {
            method: "GET",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });

        const resultJson = await result.json();
        return resultJson;
    }

    static async getThresholds(token) {
        const result = await fetch(url + "thresholds", {
            method: "GET",
            headers: {
                Authorization: `BEARER ${token}`,
            },
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { thresholds } = resultJson;
            return thresholds;
        } else
            throw new Error(
                `Error while getting thresholds ${resultJson.message}`
            );
    }

    static async addThreshold(
        token,
        variableId,
        { upperBound = undefined, lowerBound = undefined }
    ) {
        const requestBody = {
            variableId,
        };

        if (upperBound) requestBody.upperBound = upperBound;
        if (lowerBound) requestBody.lowerBound = lowerBound;

        const result = await fetch(url + "thresholds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { threshold } = resultJson;
            return threshold;
        } else
            throw new Error(
                `Error while getting thresholds ${resultJson.message}`
            );
    }

    static async putThreshold(
        token,
        thresholdId,
        { upperBound = undefined, lowerBound = undefined }
    ) {
        const requestBody = {};

        if (upperBound) requestBody.upperBound = upperBound;
        if (lowerBound) requestBody.lowerBound = lowerBound;

        const result = await fetch(url + `thresholds/${thresholdId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify(requestBody),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { threshold } = resultJson;
            return threshold;
        } else
            throw new Error(
                `Error while putting threshold of id ${thresholdId} with message ${resultJson.message}`
            );
    }

    static async getVariablesInExcelFormat(token, deviceId, idSensor) {
        const result = await fetch(
            `${url}variables/${deviceId}/${idSensor}/excel`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `BEARER ${token}`,
                },
            }
        );

        const resultJson = await result.json();

        if (result.status === 200) {
            const { variables_records } = resultJson;
            return variables_records.variables;
        } else
            throw new Error(
                `Error while getting variables in excel format ${resultJson.message}`
            );
    }

    static async getAlerts(token) {
        const result = await fetch(`${url}alerts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { alerts } = resultJson;
            return alerts;
        } else
            throw new Error(
                `Error while fetching alerts: ${resultJson.message}`
            );
    }

    static async patchUser(token, user) {
        const result = await fetch(`${url}users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify(user),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { user } = resultJson;
            console.log("Updated user: ", user);
            return user;
        } else
            throw new Error(`Error while updating user: ${resultJson.message}`);
    }

    static async putRiskZoneNotifications(
        token,
        riskZoneId,
        notificationsEnabled
    ) {
        const result = await fetch(`${url}riskzones/${riskZoneId}/notifications_settings`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `BEARER ${token}`,
            },
            body: JSON.stringify({ notificationsEnabled }),
        });

        const resultJson = await result.json();

        if (result.status === 200) {
            const { riskZone } = resultJson;
            console.log("Updated riskZone: ", riskZone);
            return riskZone;
        } else {
            throw new Error(
                `Error while updating notifications enabled for ${riskZoneId}`
            );
        }
    }
}
