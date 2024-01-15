import { Link, useNavigate } from "react-router-dom";
import { logo } from "../assets/index";
import { useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registrRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidate()) {
      console.log("valid registration", registrRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registrRoute, {
        username,
        password,
        email,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  };

  const handleValidate = () => {
    const { username, email, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error(
        "🦄 password and confirm password do not match!",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "🦄 username should be greater than 3 characters!",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "🦄 password should be equal or greater than 8 characters!",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("🦄 email should not be empty!", toastOptions);
      return false;
    }
    return true;
  };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="rounded-lg bg-slate-950 flex mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="logo mx-auto" src={logo} alt="chatbot" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6  text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => handleChange(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* email */}
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
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full rounded-md border-0 py-1.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* password */}
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
                  ></a>
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
                  className="block w-full rounded-md border-0 py-1.5  text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* confirm password */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium leading-6  text-white"
                >
                  Confirm Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  ></a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create Account
              </button>
            </div>
          </form>
          {/* switch page */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account? Login
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Here
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
