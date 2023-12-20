const express = require("express");
const router = express.Router();
const axios = require("axios");
const api = "QQH6ZJ68O6SY7OSE";
router.get("/market-performance", async (req, res) => {
  try {
    // const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${api}`;
    // const response = await axios.get(url);
    // const data = response.data;
    // const firstFiveTopGainers = data.top_gainers.slice(0, 5);
    // const firstFiveTopLosers = data.top_losers.slice(0, 5);
    // console.log("First five top gainers:", firstFiveTopGainers);
    // console.log("First five top losers:", firstFiveTopLosers);
    res.json({
      topGainers: firstFiveTopGainers,
      topLosers: firstFiveTopLosers,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
router.post("/stockDetail", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});
const firstFiveTopGainers = [
  {
    ticker: "NXLIW",
    price: "0.0343",
    change_amount: "0.0254",
    change_percentage: "285.3933%",
    volume: "1",
  },
  {
    ticker: "LU",
    price: "3.53",
    change_amount: "2.5773",
    change_percentage: "270.5259%",
    volume: "5502917",
  },
  {
    ticker: "EGGF+",
    price: "0.1599",
    change_amount: "0.0982",
    change_percentage: "159.1572%",
    volume: "4083",
  },
  {
    ticker: "SNAXW",
    price: "0.0125",
    change_amount: "0.0072",
    change_percentage: "135.8491%",
    volume: "49",
  },
  {
    ticker: "STRCW",
    price: "0.0124",
    change_amount: "0.007",
    change_percentage: "129.6296%",
    volume: "12",
  },
];
const firstFiveTopLosers = [
  {
    ticker: "CHSN",
    price: "1.82",
    change_amount: "-13.16",
    change_percentage: "-87.8505%",
    volume: "13245104",
  },
  {
    ticker: "INHD",
    price: "2.13",
    change_amount: "-11.74",
    change_percentage: "-84.6431%",
    volume: "6605140",
  },
  {
    ticker: "MSS",
    price: "2.5",
    change_amount: "-12.71",
    change_percentage: "-83.5634%",
    volume: "5015062",
  },
  {
    ticker: "BWAQW",
    price: "0.0307",
    change_amount: "-0.1493",
    change_percentage: "-82.9444%",
    volume: "10776",
  },
  {
    ticker: "LIBYW",
    price: "0.0027",
    change_amount: "-0.0129",
    change_percentage: "-82.6923%",
    volume: "4300",
  },
];
module.exports = router;
