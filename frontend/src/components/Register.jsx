import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "username") {
      setUsername(value); // ✅ handle username input
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }), 
      });

      const res = await response.json();
      console.log("......res", res);
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (error) {
      console.error("Sign Up Error:", error.message);
    }
  };

    return (
      <div className="flex flex-col">
        <h1 className="text-blue-500 font-bold text-center mt-8 text-3xl">Register</h1>
        <div className="flex flex-col w-[20%] gap-6 border rounded-xl border-gray-200 m-auto shadow-lg mt-[5%] p-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={inputChangeHandler}
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={inputChangeHandler}
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={inputChangeHandler}
            className="border rounded-md border-gray-300 p-2 text-sm text-gray-700 w-[90%]"
          />
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    );
};

export default Register;
