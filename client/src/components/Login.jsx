import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/login", {
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
        if (err.response && err.response.data) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center flex-col w-[300px] gap-5 bg-zinc-200 rounded-lg"
        >
          <h2 className="text-4xl items">SignIn</h2>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter email"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
          />
          {/* if there was an error/wrong password or unregistered user */}

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            type="submit"
            className="py-2 px-5 rounded-lg bg-blue-600 text-white text-lg mb- w-52"
          >
            Sign In
          </button>
          <Link to="/forgotpassword" className="text-blue-500 underline">
            Forgot password?
          </Link>
          <p>
            Don't have account?{" "}
            <Link className="text-blue-500" to={"/register"}>
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
