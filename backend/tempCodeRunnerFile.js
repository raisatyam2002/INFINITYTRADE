const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const key = "QQH6ZJ68O6SY7OSE";
const https = require("https");
app.use(bodyParser.urlencoded({ extended: true }));
var request = require("request");
const { log } = require("console");
const moment = require("moment-timezone");
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", async (req, res) => {
  const stockName = req.body.StockName;
  let ema15 = "";
  let ema5 = "";
  console.log("stock " + stockName);
  const url1 = `https://www.alphavantage.co/query?function=EMA&symbol=${stockName}&interval=5min&time_period=15&series_type=open&apikey=${key}`;
  try {
    const getData1 = () => {
      return new Promise((resolve, reject) => {
        request.get(
          {
            url: url1,
            json: true,
            headers: { "User-Agent": "request" },
          },
          (err, response, data) => {
            if (err) {
              reject(err);
            } else if (response.statusCode !== 200) {
              reject(`Status: ${response.statusCode}`);
            } else {
              resolve(data);
            }
          }
        );
      });
    };
    // console.log(getData());
    const stockData1 = await getData1();
    // console.log(stockData1["Technical Analysis: EMA"]["2023-11-24 16:45"]);
    ema15 = stockData1["Technical Analysis: EMA"]["2023-11-24 16:45"]["EMA"];
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  const url2 = `https://www.alphavantage.co/query?function=EMA&symbol=${stockName}&interval=5min&time_period=5&series_type=open&apikey=${key}`;
  try {
    const getData2 = () => {
      return new Promise((resolve, reject) => {
        request.get(
          {
            url: url2,
            json: true,
            headers: { "User-Agent": "request" },
          },
          (err, response, data) => {
            if (err) {
              reject(err);
            } else if (response.statusCode !== 200) {
              reject(`Status: ${response.statusCode}`);
            } else {
              resolve(data);
            }
          }
        );
      });
    };
    const stockData2 = await getData2();
    ema5 = stockData2["Technical Analysis: EMA"]["2023-11-24 16:45"]["EMA"];
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
  ema5 = Number(ema5);
  ema15 = Number(ema15);
  console.log(ema5);
  console.log(ema15);

  if (ema5 > ema15) {
    res.status(404).send("Buy");
  } else if (ema15 > ema5) {
    res.status(404).send("Sell");
  } else {
    res.status(404).send("wait");
  }
});
// Get the current date and time in the Indian timezone

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
