import React from "react";
import NavBar from "./NavBar";
function About() {
  return (
    <div className="mx-5 mt-5 mb-0" style={{ maxHeight: "100vh" }}>
      <NavBar isLogin={false} />
      <div className="pt-40 flex justify-between pb-0 mx-4 mb-2 flex-wrap">
        <div className="px-6">
          <h1 className="text-5xl text-gray-700">About Infinity Trade</h1>
          <h1 className="text-2xl py-2 text-blue-900 mt-2">Our Story</h1>
          <p className="py-6 font-serif" style={{ width: "500px" }}>
            At Infinity Trade, we aim to revolutionize the trading experience.
            Our mission is to provide a user-friendly platform that enables
            seamless trading across diverse markets. We believe in empowering
            our users with real-time data, advanced tools, and a robust trading
            ecosystem.
          </p>
          <p className="py-6 font-serif" style={{ width: "500px" }}>
            With years of expertise and innovation, we continue to evolve,
            adapting to market dynamics and catering to the needs of our valued
            traders. Join us on this journey and explore endless possibilities
            in the world of trading.
          </p>
        </div>
        <div className="mr-10 w-[650px] h-[600px]">
          {/* Insert any visual elements or images related to your About page */}
          {/* You might add an animation or image here */}
        </div>
      </div>
    </div>
  );
}
export default About;
