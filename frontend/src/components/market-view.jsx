import React, { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import BasicCard from "./Card";
import NavBar from "./NavBar";
import CircularProgress from "@mui/material/CircularProgress";
function MarketPerformer() {
  const [topGainers, setTopGainers] = useState([]);
  const [topLosers, setTopLosers] = useState([]);
  const [email, setEmail] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/auth/me",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmail(response.data.email);
        console.log(email);
      } catch (error) {
        console.log(error);
      }
    };

    checkUser();
  }, []);

  useEffect(() => {
    if (email) {
      const getPerformer = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/stocks/market-performance"
          );
          // console.log(response.data.topGainers);
          // console.log(response.data.topLosers);

          setTopGainers(response.data.topGainers);
          setTopLosers(response.data.topLosers);
          console.log(topGainers);
        } catch (error) {
          console.log(error);
        }
      };
      getPerformer();
    }
  }, [email]);
  if (!email) {
    return (
      <div className="flex justify-center items-center m-52">
        <CircularProgress></CircularProgress>
      </div>
    );
  } else {
    return (
      <div>
        <div className="mt-2 mb-80 h-10">
          <NavBar></NavBar>
          <div>
            <Search></Search>
          </div>
        </div>
        <div>
          <div className="flex justify-center p-4 m-10">
            <div className="container" class="m-10">
              <div className="flex flex-wrap justify-around space-x-1">
                <h4>Top Gainers</h4>
                {topGainers.map((stock, index) => (
                  <BasicCard
                    key={index}
                    StockName={stock.ticker}
                    price={stock.price}
                    changeAmount={stock.change_amount}
                    changePercent={stock.change_percentage}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center m-10">
            <div className="container" class="m-10">
              <div className="flex  flex-wrap space-x-2 justify-around">
                <h2>Top Losers</h2>
                {topLosers.map((stock, index) => (
                  <BasicCard
                    key={index}
                    StockName={stock.ticker}
                    price={stock.price}
                    changeAmount={stock.change_amount}
                    changePercent={stock.change_percentage}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default MarketPerformer;
