import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Container from "../../Utility/Container";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";

export default function Login() {
  const [showPass, setShowPass] = useState(false);
  const { loginUser, googleSignin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location=useLocation()
  const navigate=useNavigate()

  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const from = location.state?.from?.pathname || "/";
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { email, password } = data;

      await loginUser(email, password);

      toast.success("Login successful 🎉");
      navigate(from, { replace: true });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await googleSignin();
      toast.success("Login successful 🎉");
        navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="relative w-full grid md:grid-cols-2 overflow-hidden rounded-2xl shadow-xl">
        {/* Left Side (unchanged) */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-tl from-[#08aafb] to-[#ae0cff] text-white">
          <h1 className="text-5xl font-bold mb-6">Welcome Back 👋</h1>
          <p className="text-lg opacity-90 mb-6">
            লগইন করুন এবং আপনার পার্সেল সহজে ট্র্যাক করুন।
          </p>
          <ul className="space-y-3 text-sm opacity-90">
            <li>✔ Fast Delivery</li>
            <li>✔ Live Tracking</li>
            <li>✔ Secure System</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-base-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Login</h2>
          <p className="text-sm mb-6">Welcome back! Please login</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email Address"
                className="w-full pl-10 pr-3 py-2 border rounded-lg"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                {...register("password", {
                  required: "Password is required",
                })}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-2 border rounded-lg"
              />
              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            {/* Button */}
            <button
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 py-2 rounded-lg text-white font-semibold"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="btn bg-white text-black w-full border-[#e5e5e5]"
          >
            Login with Google
          </button>
          <p className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" state={location?.state} className="text-color font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
