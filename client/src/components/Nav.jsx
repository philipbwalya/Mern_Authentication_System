import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="flex px-24 items-center justify-between m-auto sticky top-0 py-2 shadow-lg">
      Home..
      <div className="">
        <Link to="/login">
          <button className="mr-5 border rounded-full px-3 py-1">
            Sign In
          </button>
        </Link>
        <Link to="/register">
          <button className="border rounded-full px-3 py-1">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
