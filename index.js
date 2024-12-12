const express = require('express');
const mqtt = require('mqtt');
const dotenv = require('dotenv');
const ConvertToJson = require('./Help/convertToJSON');

dotenv.config();

const client = mqtt.connect("mqtt://blue.section-inf.ch:1883", {
  username: `${process.env.MQTT_USERNAME}`,
  password: `${process.env.MQTT_PASSWORD}`	
});

const app = express();

app.get("/", (req, res) => {
  res.send("<a href='http://localhost:3000/arroseur/on'>Turn on the light</a>  ||  <a href='http://localhost:3000/arroseur/off'>Turn off the light</a>");
});

app.get("/arroseur/on", (req, res) => {
  client.publish("arroseur", ConvertToJson({ status: "start" }));
  res.send("The light is on </br> <a href='http://localhost:3000/arroseur/off'>Turn off the light</a>");

});

app.get("/arroseur/off", (req, res) => {
  client.publish("arroseur", ConvertToJson({ status: "end" }));
  res.send("The light is off </br> <a href='http://localhost:3000/arroseur/on'>Turn on the light</a>");

})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})