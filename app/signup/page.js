"use client";
import PageTemplate from "../components/PageTemplate";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../lib/authContext";

const SignUp = () => {
  const { emailSignUp } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    const password = formdata.get("password");

    try {
      const user = await emailSignUp(email, password);
      if (user) {
        alert(`Account created: ${user.email}`);
        e.target.reset();
      } else {
        setError("Sign up failed. Please check input.");
      }
    } catch (err) {
      setError(err.message || "Unexpected error occurred.");
    }
  };

  return (
    <PageTemplate>
      <form className="login-wrapper" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <p>Sign up for a ClimApp account</p>
        {error && <div className="error-message">{error}</div>}
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            autoFocus
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>
        <button className="button-large">Sign up</button>
        <div>
          Already have an account? <Link href="/login">Sign in</Link>
        </div>
      </form>
    </PageTemplate>
  );
};

export default SignUp;
