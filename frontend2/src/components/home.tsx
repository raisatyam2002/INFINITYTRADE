import React from "react";
import Lottie from "lottie-react";
// import animation4 from "./animation4.json";
import { useNavigate } from "react-router-dom";
// import animation1 from "./animation1.json";
import landing from "./landing.json";
import NavBar from "./NavBar";
function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="mx-5 mt-5 mb-0 "
      style={{
        maxHeight: "100vh",
      }}
    >
      <NavBar></NavBar>
      <div className=" pt-40 flex justify-between pb-0 mx-4 mb-2 flex-wrap">
        <div className="px-6 ">
          <h1 className="text-5xl text-gray-700">Infinity Trade </h1>
          <h1 className="text-2xl py-2 text-blue-900"></h1>

          <p className="py-6 font-serif " style={{ width: "500px" }}>
            Discover a world of opportunities with our intuitive trading
            platform. Dive into diverse markets, seize the moment with real-time
            data, and trade confidently with our advanced tools. Join us and
            explore a seamless trading experience today
          </p>
          <button
            className="text-2xl px-2 font-seri bg-indigo-900  rounded-2xl text-white"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Register
          </button>
        </div>

        {/* <img
              style={{ height: "550px" }}
              src="https://i.postimg.cc/QM0wHxm2/Screenshot-2023-12-15-at-8-12-50-PM.png"
            ></img> */}

        <Lottie
          className="mr-10 w-[650px] h-[600px]"
          animationData={landing}
        ></Lottie>
      </div>
    </div>
  );
}
export default Home;
