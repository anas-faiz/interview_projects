import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!name || !email || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `http://localhost:4000/register`,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        console.log("Signup successful");
        // navigate("/dashboard")
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleClick} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  );
};

export default SignUp;
