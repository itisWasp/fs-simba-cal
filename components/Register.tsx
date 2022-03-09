import React, { useState } from "react";
import Link from "next/link";
import Router from "next/router";

type Props = {};

const Register = (props: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = {
        UserName: username,
        Email: email,
        Password: password,
      };
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setUsername("");
      setPassword("");
      setEmail("");

      await Router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold"> Create Account</h2>
            <hr className="my-6" />
            <label className="text-sm font-bold uppercase opacity-70">
              UserName
            </label>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none"
            ></input>

            <label className="text-sm font-bold uppercase opacity-70">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 mb-4 rounded bg-slate-200"
            ></input>
            <label className="text-sm font-bold uppercase opacity-70">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 mb-4 rounded bg-slate-200"
            ></input>
            <div className="w-full px-3 mb-6 md:w-full">
              <button className="block w-full px-3 py-3 font-bold leading-tight text-gray-100 bg-blue-600 border border-gray-200 rounded-lg appearance-none hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                Sign in
              </button>
            </div>
            <div className="ext-left md:text-center">
              <p>
                Have an Account Click,{" "}
                <Link href="/login">
                  <p className="no-underline hover:underline">Here</p>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    // </Formik>
  );
};

export default Register;
