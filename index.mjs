import express from "express";
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://blue.section-inf.ch:1883", {
    username: "",
    password: ""
});

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

client.on("connect", () => {
    client.subscribe("arduinoTest", (err) => {
      if (!err) {
        client.publish("arduinoTest", "Hello mqtt");
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(message.toString());
    client.end();
  })

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})