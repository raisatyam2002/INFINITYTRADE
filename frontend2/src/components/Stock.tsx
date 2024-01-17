import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
function Stock() {
  const { ticker } = useParams();
  const [Xaxis, setXaxis] = useState([]);
  const [Yaxis, setYaxis] = useState([]);
  // const [trade, setTrade] = useState("BUY");
  useEffect(() => {
    const getData = async () => {
      try {
        const getCoordinates = await axios.get(
          "https://infinitytrade.onrender.com/stocks/stockDetail"
        );
        const data = getCoordinates.data;
        console.log(data.Xaxis);
        setXaxis(data.Xaxis);
        setYaxis(data.Yaxis);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  // useEffect(() => {
  //   const BuySell = async () => {
  //     try {
  //       const order = await axios.get("http://localhost:5000/stocks/trade");
  //       const data = order.data;
  //       console.log(data.signal);
  //       setTrade(data.signal);
  //     } catch (error) {
  //       console.log("error:", error);
  //     }
  //   };

  //   BuySell();
  // }, []);
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex justify-center">
        {/* {trade} */}
        <Plot
          className="border-4  border-blue-800 mt-30"
          data={[
            {
              x: Xaxis,
              y: Yaxis,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 720, height: 600, title: ticker }}
        />
      </div>
    </div>
  );
}
export default Stock;
