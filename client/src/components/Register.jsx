import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!firstName || !lastName || !email || !password) {
  //     setError("All fields are required");
  //     return;
  //   }
  //   Axios.post("http://localhost:5000/auth/register", {
  //     firstName,
  //     lastName,
  //     email,
  //     password,
  //   })
  //     .then((response) => {
  //       if (response.data.status) {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => {
  //       setError("Registration failed. Please try again.");
  //       console.error(err);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5000/auth/register", {
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          alert("Please check your email for verification.");
          navigate("/login");
          const { message } = response.data;
          // Extract verification token from message
          const token = message.split(" ").pop();
          // Construct the verification link
          const verificationLink = `http://localhost:5000/auth/verify-email/${token}`;
          // window.location.href = verificationLink;
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
          <h2 className="text-4xl items">Register</h2>
          <input
            type="text"
            className="input"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <input
            type="email"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="py-2 px-5 rounded-lg bg-blue-600 text-white text-lg w-52"
          >
            Register
          </button>
          <p>
            Have an account?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import Axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     Axios.post("http://localhost:5000/auth/register", {
//       firstName,
//       lastName,
//       email,
//       password,
//     })
//       .then((response) => {
//         if (response.data.status) {
//           navigate("/login");
//         }
//       })
//       .catch((err) => {
//         console.error(err); // Log any errors that occur during the request
//       });
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-center h-screen">
//         <form
//           className="flex items-center justify-center flex-col w-[300px] gap-5 bg-zinc-200 rounded-lg "
//           onSubmit={handleSubmit}
//         >
//           <h2 className="text-4xl items">Register</h2>
//           <input
//             type="text"
//             className="input"
//             placeholder="FirstName"
//             value={firstName}
//             onChange={(e) => {
//               setFirstName(e.target.value);
//             }}
//           />
//           <input
//             type="text"
//             className="input"
//             placeholder="LastName"
//             value={lastName}
//             onChange={(e) => {
//               setLastName(e.target.value);
//             }}
//           />
//           <input
//             type="email"
//             className="input"
//             placeholder="Enter email"
//             value={email}
//             onChange={(e) => {
//               setEmail(e.target.value);
//             }}
//           />
//           <input
//             type="password"
//             className="input"
//             placeholder="password"
//             value={password}
//             onChange={(e) => {
//               setPassword(e.target.value);
//             }}
//           />
//           <button
//             type="submit"
//             className="py-2 px-5 rounded-lg bg-blue-600 text-white text-lg w-52"
//           >
//             Register
//           </button>
//           <p>
//             Have an account?<Link to="/login">Login</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
