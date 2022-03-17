import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Router from "next/router";

type Props = {};

const Register = (props: Props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const errRef: any = useRef();

  const USER_REGEX = /^[A-z][A-z0-9-_]{6,23}$/;
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

    const body = {
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      Password: password,
    };

    try {
      const response = await axios.post(`/api/register`, body);

      console.log(response?.data);

      setFirstname("");
      setLastname("");
      setEmail("");
      setPassword("");

      await Router.push("/login");
    } catch (error: any) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Email Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen from-teal-100 via-teal-300 to-teal-500 bg-gradient-to-br">
      <div className="w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl">
        <div className="max-w-md mx-auto space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-2xl font-bold"> Create Account</h2>
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
              FirstName
            </label>
            <input
              type="text"
              name="firstname"
              {...register("FirstName", {
                required: true,
                pattern: USER_REGEX,
              })}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none"
            ></input>
            {errors.FirstName && (
              <p className="pb-3 text-red-700">
                <FontAwesomeIcon icon={faInfoCircle} />
                FirstName Must be at Least 6 characters short.
              </p>
            )}

            <label className="text-sm font-bold uppercase opacity-70">
              LastName
            </label>
            <input
              type="text"
              name="lastname"
              {...register("LastName", {
                required: true,
                pattern: USER_REGEX,
              })}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full p-3 mt-2 mb-4 border-2 rounded bg-slate-200 border-slate-200 focus:border-slate-600 focus:outline-none"
            ></input>
            {errors.LastName && (
              <p className="pb-3 text-red-700">
                <FontAwesomeIcon icon={faInfoCircle} />
                LastName Must be at Least 6 characters short.
              </p>
            )}

            <label className="text-sm font-bold uppercase opacity-70">
              Email
            </label>
            <input
              type="email"
              name="email"
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
              type="password"
              name="password"
              {...register("Password", {
                required: true,
                pattern: PWD_REGEX,
              })}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 mb-4 rounded bg-slate-200"
            ></input>
            {errors.Password && (
              <p className="pb-3 text-red-700">
                <FontAwesomeIcon icon={faInfoCircle} />
                Password Must include uppercase and lowercase letters, a number
                and a special character. Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>{" "}
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
