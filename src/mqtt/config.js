import mqtt from "mqtt";

const clientId = "prueba-ews-landslide";
const mqttConfig = {
    host: "ws://test.mosquitto.org"
}

const mqttClient = mqtt.connect(mqttConfig.host, { keepalive: 10, port: 8081 });

mqttClient.on('error', function (err) {
    console.log('There was an MQTT error: ', err);
    mqttClient.end();
});

mqttClient.on('connect', function () {
    console.log('cliente connected: ' + clientId);
});

mqttClient.subscribe('measures', (err, topics) => {
    if (err) return console.log('Error connecting to: ', err.message);
    console.log('Subscribed to: \t');
    for (const topic of topics) {
        console.log('topic: ', topic.topic);
    }
})

export default mqttClient;

