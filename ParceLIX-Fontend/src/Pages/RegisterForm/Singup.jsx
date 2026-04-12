import React, { useContext, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCamera,
} from "react-icons/fa";
import Container from "../../Utility/Container";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../useContext/FormContext/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router";

export default function Signup() {
  const [showPass, setShowPass] = useState(false);
  const [preview, setPreview] = useState(null);
  const { createUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const location=useLocation()
  const navigate=useNavigate()
   const from = location.state?.from?.pathname || "/";
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { name, email, password, image } = data;
      let img = image[0];
      const formData = new FormData();
      if (!img) {
        toast.error("Please upload a profile image");
        return;
      }

      formData.append("file", img);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const imgLink = await axios.post(
        "https://api.cloudinary.com/v1_1/dmwlysue6/image/upload",
        formData,
      );
      const imageUrl = imgLink.data.secure_url;

      const userCredential = await createUser(email, password);
      const optimizedImage = imageUrl.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill,q_auto,f_auto/",
      );
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: optimizedImage,
      });

      toast("🦄 Account create Successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
      setLoading(false);
       navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already exists");
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center">
      <div className="w-full grid md:grid-cols-2">
        {/* Left */}
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-tl from-[#08aafb] to-[#ae0cff] text-white">
          <h1 className="text-5xl font-bold mb-6">Start Your Journey 🚀</h1>
              <ul className="space-y-3 text-sm opacity-90">
            <li>✔ Fast Delivery</li>
            <li>✔ Live Tracking</li>
            <li>✔ Secure System</li>
          </ul>
        </div>

        {/* Form */}
        <div className="bg-base-100 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Create Account</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Upload */}
            <div className="flex justify-center">
              <label className="relative cursor-pointer">
                <div className="w-16 h-16 rounded-full overflow-hidden border">
                  <img
                    src={preview || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white">
                  <FaCamera size={12} />
                </div>

                <input
                  type="file"
                  className="hidden"
                  {...register("image", {
                    onChange: (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setPreview(URL.createObjectURL(file));
                      }
                    },
                  })}
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 py-2 border rounded-lg"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("email", { required: "Email is required" })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 py-2 border rounded-lg"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-2 border rounded-lg"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms */}
            <div>
              <label className="text-sm">
                <input
                  type="checkbox"
                  {...register("terms", { required: "Accept terms" })}
                  className="mr-2"
                />
                I agree to Terms
              </label>
              {errors.terms && (
                <p className="text-red-500 text-sm">{errors.terms.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              disabled={loading}
              className="w-full bg-indigo-500 text-white py-2 rounded-lg"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>
          </form>
           <p className="text-center text-sm text-gray-500 mt-6">
            I have an account?{" "}
            <Link to="/login" className="text-color font-semibold hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
}
