import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Router from "next/router";
import axios from "axios";

type Props = {};

function Login({}: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const errRef: any = useRef();

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  const onSubmit = async (data: string) => {
    console.log(data);

    try {
      const body = {
        Email: email,
        Password: password,
      };

      const response = await axios.post(`/api/login`, body);

      const accessToken = response.headers["auth-token"];

      localStorage.setItem("token", accessToken);

      setEmail("");
      setPassword("");

      await Router.push("/");
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Email or Password is incorrect");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold"> Login</h2>
            <p
              ref={errRef}
              className={`${
                errMsg ? "errmsg" : "offscreen"
              } font-bold text-red-500 text-lg pt-4`}
              role="alert"
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <hr className="my-6" />

            <label className="text-sm font-bold uppercase opacity-70">
              Email
            </label>
            <input
              {...register("Email", {
                required: true,
                pattern: EMAIL_REGEX,
              })}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 mb-4 rounded bg-slate-200"
            ></input>
            {errors.Email && (
              <p className="text-red-700">
                <FontAwesomeIcon icon={faInfoCircle} />
                Email must be a valid email address.
              </p>
            )}

            <label className="text-sm font-bold uppercase opacity-70">
              Password
            </label>
            <input
              {...register("Password", {
                required: true,
                pattern: PWD_REGEX,
              })}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 mb-4 rounded bg-slate-200"
            ></input>
            {errors.Password && (
              <p className="pb-3 text-red-700">
                <FontAwesomeIcon icon={faInfoCircle} />
                Password Must include uppercase and lowercase letters, a number
                and a special character. Allowed special characters: Allowed
                special characters: <span aria-label="exclamation mark">
                  !
                </span>{" "}
                <span aria-label="at symbol">@</span>{" "}
                <span aria-label="hashtag">#</span>{" "}
                <span aria-label="dollar sign">$</span>{" "}
                <span aria-label="percent">%</span>
              </p>
            )}

            <div className="w-full px-3 mb-6 md:w-full">
              <button className="block w-full px-3 py-3 font-bold leading-tight text-gray-100 bg-blue-600 border border-gray-200 rounded-lg appearance-none hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">
                Sign in
              </button>
            </div>
            <div className="ext-left md:text-center">
              <p>
                Don't Have an Account Click,{" "}
                <Link href="/register">
                  <p className="no-underline hover:underline">Here</p>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
