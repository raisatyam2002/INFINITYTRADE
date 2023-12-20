import React from "react";

function NavBar() {
  return (
    <nav className="flex justify-between py-4 mx-4 my-2 flex-wrap">
      <img
        src="https://i.postimg.cc/4x6zptMF/vecteezy-bull-with-chart-bar-logo-design-finance-vector-logo-design-16227189.jpg"
        className=" w-28
   mx-2 h-20"
        style={{ height: "70px" }}
      ></img>
      <ul className="flex justify-between space-x-12 px-6  text-2xl text-gray-900">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
        <button
          className="text-2xl h-9 px-5 font-serif bg-indigo-900 rounded-2xl text-white"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </ul>
    </nav>
  );
}
export default NavBar;
