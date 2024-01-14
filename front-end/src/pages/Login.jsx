import { Link } from "react-router-dom";
import { logo } from "../assets/index";
import { useState } from "react";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("form submission");
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="rounded-lg bg-slate-950 flex mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="logo mx-auto" src={logo} alt="chatbot" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight  text-white">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6  text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Don&apos;t have an account yet? Register
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
