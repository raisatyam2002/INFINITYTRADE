import { useEffect, useState } from "react";
import axios from "axios";
import Search from "./Search";
import BasicCard from "./Card";
import NavBar from "./NavBar";
// import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import bull from "./bull.json";
import bear from "./bear.json";
import Lottie from "lottie-react";
// import { io } from "socket.io-client";
// import { isLoginSelector } from "../store/selectors/isLogin";
// import { useRecoilValue } from "recoil";
interface Stock {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}
type StockArray = Stock[];
function MarketPerformer() {
  // const [count, setCount] = useState(0);
  // const socket = io("https://infinitytrade.onrender.com");
  const navigate = useNavigate();
  const [topGainers, setTopGainers] = useState<StockArray>([]);
  const [topLosers, setTopLosers] = useState<StockArray>([]);
  // const isLogin = useRecoilValue(isLoginSelector);

  function handleSearch(ticker: string) {
    navigate(`/stock/${ticker}`);
  }
  // useEffect(() => {
  //   const checkUser = async () => {
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:5000/auth/me",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setEmail(response.data.email);
  //       console.log(email);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   checkUser();
  // }, []);

  // useEffect(() => {
  //   if (email) {
  //     const getPerformer = async () => {
  //       // socket.on("marketData", (data) => {
  //       //   setCount(data.count);
  //       //   setTopGainers(data.topGainers);
  //       //   setTopLosers(data.topLosers);
  //       //   console.log(data.topGainers);
  //       // });
  //       try {
  //         const response = await axios.get(
  //           "http://localhost:5000/stocks/market-performance"
  //         );
  //         console.log(response.data.topGainers);
  //         console.log(response.data.topLosers);

  //         setTopGainers(response.data.topGainers);
  //         setTopLosers(response.data.topLosers);
  //         // console.log(topGainers);

  //         // socket.on("marketData", (data: any) => {
  //         //   // setCount(data.count);
  //         //   setTopGainers(data.topGainers);
  //         //   setTopLosers(data.topLosers);
  //         //   console.log("hello", data.topGainers);
  //         //   console.log("hello world");

  //           // console.log({ top: topGainers });
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getPerformer();
  //   }
  // }, [email]);
  useEffect(() => {
    {
      const getPerformer = async () => {
        try {
          const response = await axios.get(
            "https://infinitytrade.onrender.com/stocks/market-performance"
          );
          console.log(response.data.topGainers);
          console.log(response.data.topLosers);
          setTopGainers(response.data.topGainers);
          setTopLosers(response.data.topLosers);
          // socket.on("marketData", (data: any) => {
          //   // setCount(data.count);
          //   setTopGainers(data.topGainers);
          //   setTopLosers(data.topLosers);
          //   console.log("hello", data.topGainers);
          //   console.log("hello world");
          // console.log({ top: topGainers });
        } catch (error) {
          console.log(error);
        }
      };
      getPerformer();
    }
  }, []);
  // setTimeout(() => {
  //   console.log({ topGainers: topGainers });
  // }, 7000);
  // if (!email) {
  //   return (
  //     <div className="flex justify-center items-center m-52">
  //       <CircularProgress></CircularProgress>
  //     </div>
  //   );
  // } else {
  return (
    <div>
      <div className="mt-2 mb-80 h-10">
        <NavBar></NavBar>
        <div>
          <Search handleSearch={handleSearch}></Search>
          <div className="flex justify-center space-x-60 mt-[20px]">
            <Lottie
              animationData={bull}
              className="h-[100px] w-[200px] mt-[20px]"
            ></Lottie>
            <Lottie
              animationData={bear}
              className="h-[100px] w-[200px]  mt-[20px]"
            ></Lottie>
          </div>
        </div>
      </div>

      <div className="mt-[400px]">
        <div className="flex justify-center p-4 ">
          <div className="container">
            <div className="flex flex-wrap justify-around space-x-12">
              <h1 className="text-3xl font-medium">Top Gainers</h1>

              {topGainers.map((stock: Stock, index: number) => (
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
          <div className="container m-10">
            <div className="flex  flex-wrap space-x-12 justify-around">
              <h1 className="text-3xl font-medium">Top Losers</h1>
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

export default MarketPerformer;
