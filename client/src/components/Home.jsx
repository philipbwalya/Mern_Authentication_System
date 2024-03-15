import React from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Home = () => {
  return (
    <div className="">
      <Nav />
      <div>
        <button className="py-2 px-4 bg-cyan-800 rounded-md mt-2 absolute top-[50%] left-[40%] text-white">
          <Link to={"/dashboard"}>Try it for free</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
