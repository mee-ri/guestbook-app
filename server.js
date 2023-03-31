var express = require("express");
var fs = require("fs");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8081;

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/index");
});

app.get("/guestbook", function (req, res) {
  var json = require("./guestbook-data.json");

  var results = '<table class="table-striped"> ';
  for (var i = 0; i < json.length; i++) {
    results +=
      "<tr>" +
      "<td>" +
      json[i].username +
      "</td>" +
      "<td>" +
      json[i].country +
      "</td>" +
      "<td>" +
      json[i].message +
      "</td>" +
      "</tr>";
  }
  res.send(results);
});

app.get("/newmessage", function (req, res) {
  res.sendFile(__dirname + "/newmessage.html");
});

app.post("/newmessage", function (req, res) {
  var data = require("./guestbook-data.json");

  data.push({
    username: req.body.username,
    country: req.body.country,
    date: new Date(),
    message: req.body.message,
  });

  var jsonStr = JSON.stringify(data);
  fs.writeFile("./guestbook-data.json", jsonStr, (err) => {
    if (err) throw err;
  });

  res.sendFile(__dirname + "/newmessage.html");
});

app.get("/ajaxmessage", function (req, res) {
  res.sendFile(__dirname + "/ajaxmessage.html");
});

app.get("*", function (req, res) {
  res.send("Page not found", 404);
});

app.listen(PORT);
