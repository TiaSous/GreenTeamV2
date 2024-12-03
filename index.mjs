import express from "express";
import mqtt from "mqtt";

const client = mqtt.connect("mqtt://blue.section-inf.ch:1883", {
  username: "",
  password: ""
});

const app = express();

app.get("/", (req, res) => {
  res.send("<a href='http://localhost:3000/arroseur/on'>Turn on the light</a> <a href='http://localhost:3000/arroseur/off'>Turn off the light</a>");
});

app.get("/arroseur/on", (req, res) => {
  client.publish("arroseur", JSON.stringify({ status: "start" }));
  res.send("The arroseur is on </br> <a href='http://localhost:3000/arroseur/off'>Turn off the light</a>");

});

app.get("/arroseur/off", (req, res) => {
  client.publish("arroseur", JSON.stringify({ status: "end" }));
  res.send("The arroseur is off </br> <a href='http://localhost:3000/arroseur/on'>Turn on the light</a>");

})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
})
