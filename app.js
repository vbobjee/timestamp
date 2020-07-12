const express = require('express');

const app = express();

app.get("/", (req, res) =>{
  res.send("Hello World")
})

app.get("/api/timestamp/", (req, res) => {
  const date = new Date();
  res.json({ "unix": date.getTime(), "utc" : date.toUTCString() })
})

app.get("/api/timestamp/:date_string", (req, res) => {
  const date_str = req.params.date_string;
  let date = null;
  if (/\d{5}/.test(date_str)) {
    date = new Date(parseInt(date_str))
  } else {
    date = new Date(date_str);
  }
  const now = date.getTime();

  if (now) {
    res.json({ "unix": now, "utc" : date.toUTCString() })
  } else {
    res.json({ error : "invalid" })
  }
})

app.listen(3000)