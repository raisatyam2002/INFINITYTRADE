import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import axios from "axios";
import { useParams } from "react-router-dom";
function Stock() {
  const { ticker } = useParams();
  const [Xaxis, setXaxis] = useState([]);
  const [Yaxis, setYaxis] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const getCoordinates = await axios.get(
          "http://localhost:5000/stocks/stockDetail"
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
  return (
    <div className="flex justify-center">
      <Plot
        className="border-4  border-blue-800 mt-48"
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
  );
}
export default Stock;
