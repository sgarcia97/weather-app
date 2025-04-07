"use client";

import PageTemplate from "../components/PageTemplate";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../lib/firebase";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const email = formdata.get("email");
    const password = formdata.get("password");
    try {
      const creds = await signInWithEmailAndPassword(auth, email, password);
      console.log(creds.user);
      handleLogin();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogin = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      }
    });
  };

  return (
    <PageTemplate>
      <form className="login-wrapper" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <p>Sign in to ClimApp</p>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email address"
            name="email"
            autoFocus
            required
          />
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button className="button-large">Login</button>
        {/*<button className="button-large">Login with Google</button>*/}
        <div>
          Don&apos;t have an account?{" "}
          <Link href="/signup" alt="">
            Sign up
          </Link>
        </div>
      </form>
    </PageTemplate>
  );
};

export default Login;
