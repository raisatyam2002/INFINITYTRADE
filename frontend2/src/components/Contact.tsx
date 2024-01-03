// import React from "react";
import NavBar from "./NavBar";
import Lottie from "lottie-react";
import landing from "./landing.json";
function Contact() {
  return (
    <div className="mx-5 mt-5 mb-0" style={{ maxHeight: "100vh" }}>
      <NavBar />
      <div className="pt-40 flex justify-between pb-0 mx-4 mb-2 flex-wrap">
        <div className="px-6">
          <h1 className="text-5xl text-gray-700">Contact Us</h1>
          <h1 className="text-2xl py-2 mt-2 text-blue-900">Get in Touch</h1>
          <p className="py-6 font-serif" style={{ width: "500px" }}>
            Have questions or suggestions? Feel free to reach out to our support
            team. We're here to assist you with any inquiries you may have
            regarding our platform, trading tools, or account assistance.
          </p>
          <p className="py-6 font-serif" style={{ width: "500px" }}>
            Email us at support@infinitytrade.com or call us at +1-123-456-7890
            for immediate assistance. Our team is available 24/7 to address your
            concerns.
          </p>
        </div>
        <Lottie
          className="mr-10 w-[650px] h-[600px]"
          animationData={landing}
        ></Lottie>
      </div>
    </div>
  );
}
export default Contact;
