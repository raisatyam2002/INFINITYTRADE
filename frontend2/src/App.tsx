import { useEffect } from "react";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import MarketPerformer from "./components/market-view";
import Stock from "./components/Stock";
import About from "./components/About";
import Contact from "./components/Contact";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { Userstate } from "./store/atoms/userState";
import axios from "axios";
function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <InitUser />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/market-view" element={<MarketPerformer />} />
          <Route path="/stock/:ticker" element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
function InitUser() {
  const setUser = useSetRecoilState(Userstate);
  const checkUser = async () => {
    try {
      const response = await axios.post(
        "https://infinitytrade.onrender.com/auth/me",
        {},
        {
          headers: {
            Authorization: `Bearer` + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.email) {
        setUser({
          email: response.data.email,
          isLogin: true,
        });
      } else {
        setUser({
          email: "",
          isLogin: false,
        });
      }
    } catch (error) {
      setUser({
        email: "",
        isLogin: false,
      });
    }
  };
  useEffect(() => {
    checkUser();
  }, []);
  return <></>;
}
