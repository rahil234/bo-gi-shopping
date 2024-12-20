import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Wallpapper from "../../assets/Login-2.jpg";
import { AuthContext } from "../../context/AuthContext";

const Login = ({ isRegister, setIsRegister, setShowProfileModal }) => {
  const [authError, setAuthError] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const response = await login(data)
      console.log(response);
      if (!response.success) throw new Error(response.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      setAuthError(error.message);
    }
  };

  return (
    <div
      className="relative h-screen w-full object-cover"
      style={{ backgroundImage: `url(${Wallpapper})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative flex justify-center items-center h-full z-10">
        <div className="w-[90%] max-w-md p-6 rounded-xl backdrop-blur-md border border-white/20 shadow-lg">
          <h1 className="text-white text-3xl font-bold text-center mb-7">
            {isRegister ? "Register Now" : "Login"}
          </h1>
          <div className="text-red-500">
            {authError.length > 0 && authError}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isRegister && (
              <>
                {/* Name Field (only for registration) */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-1 font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isRegister && (
              <>
                {/* Confirm Password Field */}
                <div className="mb-4">
                  <label
                    htmlFor="cpassword"
                    className="block mb-1 font-medium text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...register("cpassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    className="w-full p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  {errors.cpassword && (
                    <p className="text-red-500 text-sm">
                      {errors.cpassword.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              className="bg-gradient-to-r from-set1 to-set2 p-2 rounded-md px-6 mb-4 mt-4 
              font-medium text-white w-full hover:bg-gradient-to-r hover:from-set2 hover:to-set1"
            >
              {isRegister ? "Register" : "Login"}
            </button>
          </form>

          {/* Toggle between Register and Login */}
          {!isRegister && (
            <Link to={"/signup"} className="text-center text-white">
              <p>Don't an account? Register</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
