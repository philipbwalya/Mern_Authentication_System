import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/forgotpassword", {
      email,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Check your email for the reset password link");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <form
          className="flex items-center justify-center flex-col w-[300px] gap-5 bg-zinc-200 rounded-lg "
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl items">ForgotPassword</h2>

          <input
            type="email"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <button
            type="submit"
            className="py-2 px-5 rounded-lg bg-blue-600 text-white text-lg w-52"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
