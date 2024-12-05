#include <WiFiNINA.h>
#include <ArduinoMqttClient.h>
#include <ArduinoJson.h>

char ssid[] = "";  // your network SSID
char pass[] = "";    // your network password

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "";
const char mqttUser[] = "";
const char mqttPassword[] = "";
int port = 1883;

int led = 16;  // where led is connect (digital)

void setup() {
  pinMode(led, OUTPUT);

  // try to connect
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    delay(5000);
  }

  // config mqtt client
  mqttClient.setId("ArduinoClient");
  mqttClient.setUsernamePassword(mqttUser, mqttPassword);

  // try connect mqtt
  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());
    while (1)
      ;
  }

  // When recieve message
  mqttClient.onMessage(onMqttMessage);
  mqttClient.subscribe("arroseur");
}

void loop() {
  mqttClient.poll();
}

void onMqttMessage(int messageSize) {
  String message;

  // read message
  while (mqttClient.available()) {
    message += (char)mqttClient.read();
  }

  // deserialize message
  const char* msg = Deserialize(message);

  // led action
  InteractionWithLed(msg);
}

// deserialize json message
const char* Deserialize(String message) {
  StaticJsonDocument<200> doc;
  DeserializationError error = deserializeJson(doc, message);
  return doc["status"];
}

// Turn light on/off depend on value 
void InteractionWithLed(const char* value) {
  if (value) {
    if (strcmp(value, "start") == 0) {
      digitalWrite(led, HIGH);
    } else if (strcmp(value, "end") == 0) {
      digitalWrite(led, LOW);
    }
  }
}