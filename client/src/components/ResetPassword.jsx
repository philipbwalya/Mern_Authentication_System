import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5000/auth/resetPassword/${token}`, {
      password,
    })

      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
        console.log(response);
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
          <h2 className="text-4xl items">Reset Password</h2>

          <input
            type="password"
            className="input"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
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

export default ResetPassword;
