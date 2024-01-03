// import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { isLoginSelector } from "../store/selectors/isLogin";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Userstate } from "../store/atoms/userState";
function NavBar() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginSelector);
  const setUser = useSetRecoilState(Userstate);
  return (
    <nav className="flex justify-between py-4 mx-4 my-2 flex-wrap">
      <img
        src="https://i.postimg.cc/4x6zptMF/vecteezy-bull-with-chart-bar-logo-design-finance-vector-logo-design-16227189.jpg"
        className=" w-28
   mx-2 h-20"
        style={{ height: "70px" }}
      ></img>
      <ul className="flex justify-between space-x-12 px-6  text-2xl text-gray-900">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isLogin ? (
          <button
            className="text-2xl h-9 px-5 font-serif bg-indigo-900 rounded-2xl text-white"
            onClick={() => {
              localStorage.removeItem("token");
              setUser({
                email: "",
                isLogin: false,
              });
              navigate("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-2xl h-9 px-5 font-serif bg-indigo-900 rounded-2xl text-white"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        )}
      </ul>
    </nav>
  );
}
export default NavBar;
