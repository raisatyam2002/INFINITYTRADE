"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const axios_1 = __importDefault(require("axios"));
const api = "G62S7DA25DPQK7ZY";
const server_1 = require("../server");
router.get("/market-performance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${api}`;
        // const response = await axios.get(url);
        // const data = response.data;
        // const firstFiveTopGainers = data.top_gainers.slice(0, 5);
        // const firstFiveTopLosers = data.top_losers.slice(0, 5);
        // console.log("First five top gainers:", firstFiveTopGainers);
        // console.log("First five top losers:", firstFiveTopLosers);
        // req.io.emit("marketData", {
        //   message: "satyam",
        // });
        let updateCount = 0;
        updateCount++;
        server_1.io.on("connection", (socket) => {
            console.log(`User connected: ${socket.id}`);
            // Event listener for 'marketData'
            console.log("hello");
            //
            socket.emit("marketData", {
                count: updateCount,
                topGainers: firstFiveTopGainers,
                topLosers: firstFiveTopLosers,
            });
            console.log("world");
        });
        // console.log(req.io);
        res.json({
            topGainers: firstFiveTopGainers,
            topLosers: firstFiveTopLosers,
        });
        // console.log(firstFiveTopGainers);
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
}));
router.post("/stockDetail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        res.status(500).json({ error: "An error occurred while fetching data" });
    }
}));
router.get("/stockDetail", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const response = await axios.get(
        //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${api}`
        // );
        // const data = response.data;
        // // console.log(data);
        // const Xaxis = [];
        // const Y = [];
        // for (var key in data["Time Series (Daily)"]) {
        //   Xvalues.push(key);
        //   Yvalues.push(data["Time Series (Daily)"][key]["1. open"]);
        // }
        // console.log({
        //   Xaxis: Xaxis,
        //   Yaxis: Yaxis,
        // });
        res.json({
            Xaxis: Xaxis,
            Yaxis: Yaxis,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "an error occured while fetching data" });
    }
}));
router.get("/trade", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response1 = yield axios_1.default.get(`https://www.alphavantage.co/query?function=EMA&symbol=IBM&interval=daily&time_period=5&series_type=open&apikey=${api}`);
        console.log(response1.data);
        const emaData1 = response1.data["Technical Analysis: EMA"];
        const firstKey1 = Object.keys(emaData1)[0];
        // const
        // res.json(emaData1[firstKey1]["EMA"]);
        const response2 = yield axios_1.default.get(`https://www.alphavantage.co/query?function=EMA&symbol=IBM&interval=daily&time_period=20&series_type=open&apikey=${api}`);
        // console.log(response2.data);
        const emaData2 = response2.data["Technical Analysis: EMA"];
        const firstKey2 = Object.keys(emaData2)[0];
        // res.json(emaData1[firstKey1]["EMA"]);
        console.log(emaData1[firstKey1]["EMA"], emaData2[firstKey2]["EMA"]);
        const fiveEma = Number(emaData1[firstKey1]["EMA"]);
        const twentyEma = Number(emaData2[firstKey2]["EMA"]);
        if (fiveEma > twentyEma) {
            res.json({ signal: "BUY" });
        }
        else if (fiveEma == twentyEma) {
            res.json({ signal: "HOLD" });
        }
        else {
            res.json({ signal: "SELL" });
        }
    }
    catch (error) {
        console.log(error);
        res.json({ error: error });
    }
}));
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
const Xaxis = [
    "2023-12-19",
    "2023-12-18",
    "2023-12-15",
    "2023-12-14",
    "2023-12-13",
    "2023-12-12",
    "2023-12-11",
    "2023-12-08",
    "2023-12-07",
    "2023-12-06",
    "2023-12-05",
    "2023-12-04",
    "2023-12-01",
    "2023-11-30",
    "2023-11-29",
    "2023-11-28",
    "2023-11-27",
    "2023-11-24",
    "2023-11-22",
    "2023-11-21",
    "2023-11-20",
    "2023-11-17",
    "2023-11-16",
    "2023-11-15",
    "2023-11-14",
    "2023-11-13",
    "2023-11-10",
    "2023-11-09",
    "2023-11-08",
    "2023-11-07",
    "2023-11-06",
    "2023-11-03",
    "2023-11-02",
    "2023-11-01",
    "2023-10-31",
    "2023-10-30",
    "2023-10-27",
    "2023-10-26",
    "2023-10-25",
    "2023-10-24",
    "2023-10-23",
    "2023-10-20",
    "2023-10-19",
    "2023-10-18",
    "2023-10-17",
    "2023-10-16",
    "2023-10-13",
    "2023-10-12",
    "2023-10-11",
    "2023-10-10",
    "2023-10-09",
    "2023-10-06",
    "2023-10-05",
    "2023-10-04",
    "2023-10-03",
    "2023-10-02",
    "2023-09-29",
    "2023-09-28",
    "2023-09-27",
    "2023-09-26",
    "2023-09-25",
    "2023-09-22",
    "2023-09-21",
    "2023-09-20",
    "2023-09-19",
    "2023-09-18",
    "2023-09-15",
    "2023-09-14",
    "2023-09-13",
    "2023-09-12",
    "2023-09-11",
    "2023-09-08",
    "2023-09-07",
    "2023-09-06",
    "2023-09-05",
    "2023-09-01",
    "2023-08-31",
    "2023-08-30",
    "2023-08-29",
    "2023-08-28",
    "2023-08-25",
    "2023-08-24",
    "2023-08-23",
    "2023-08-22",
    "2023-08-21",
    "2023-08-18",
    "2023-08-17",
    "2023-08-16",
    "2023-08-15",
    "2023-08-14",
    "2023-08-11",
    "2023-08-10",
    "2023-08-09",
    "2023-08-08",
    "2023-08-07",
    "2023-08-04",
    "2023-08-03",
    "2023-08-02",
    "2023-08-01",
    "2023-07-31",
];
const Yaxis = [
    "161.8000",
    "162.2300",
    "162.3000",
    "162.9300",
    "164.3700",
    "163.2700",
    "162.6800",
    "160.0000",
    "161.0000",
    "161.5900",
    "160.7600",
    "160.2900",
    "158.4100",
    "156.9500",
    "156.1500",
    "155.4400",
    "154.9900",
    "155.1300",
    "154.5000",
    "154.6000",
    "152.5100",
    "153.2900",
    "153.0000",
    "150.4000",
    "149.4500",
    "148.4600",
    "147.4400",
    "146.5500",
    "149.2500",
    "149.0300",
    "147.8900",
    "147.4500",
    "145.7700",
    "145.0000",
    "143.0000",
    "143.1900",
    "143.6200",
    "142.2000",
    "137.5000",
    "136.7400",
    "136.6300",
    "138.1500",
    "138.6400",
    "140.0000",
    "137.1200",
    "139.2800",
    "139.7700",
    "142.5100",
    "142.5100",
    "142.6000",
    "142.3000",
    "141.4000",
    "140.9000",
    "140.3700",
    "140.8700",
    "140.0400",
    "142.0000",
    "142.1400",
    "143.6700",
    "145.5100",
    "146.5700",
    "147.4100",
    "149.0000",
    "148.3600",
    "145.0000",
    "145.7700",
    "147.1100",
    "147.3800",
    "145.9500",
    "147.9200",
    "148.5700",
    "147.3500",
    "148.1300",
    "147.6600",
    "147.9100",
    "147.2600",
    "146.9400",
    "146.4200",
    "146.3000",
    "145.4100",
    "144.1800",
    "143.5050",
    "141.7200",
    "142.6600",
    "141.4200",
    "140.0000",
    "141.0100",
    "141.7000",
    "141.5000",
    "143.0500",
    "143.1200",
    "143.0400",
    "144.9400",
    "145.7000",
    "145.0000",
    "145.0900",
    "143.7800",
    "142.7800",
    "144.2500",
    "143.8100",
];
exports.default = router;
