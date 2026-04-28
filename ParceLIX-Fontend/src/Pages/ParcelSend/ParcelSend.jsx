import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import Container from "../../Utility/Container";
import axios from "axios";
import Swal from "sweetalert2";
import useAxious from "../../Hooks/useAxious";
import { useNavigate } from "react-router";
import { AuthContext } from "../../useContext/FormContext/AuthContext";

const ParcelSend = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const senderRegion = watch("senderDivition");
  const reciverRegion = watch("reciverDiviton");
  const axiosInstance = useAxious();
  const navigate=useNavigate()
  const{user}=useContext(AuthContext)

  const [parcelType, setParcelType] = useState("document");
  const [diviton, segtDiviton] = useState([]);
  const [district, setDistrict] = useState([]);
  const [districtSender, setDistrictSender] = useState([]);
  const [reciverDistrict, setDistrictReciver] = useState([]);

  
  const onSubmit = (data) => {
    const formData = {
      ...data,
      parcelType: parcelType,
    };
    const sameDistrict = formData.senderDistrict === formData.receiverDistrict;
    const parcelTypes = formData.parcelType;
    const parcelWeight = parseFloat(formData.weight);

    let cost = 0;

    if (parcelTypes === "document") {
      cost = sameDistrict ? 60 : 80;
    } else {
      if (parcelWeight <= 3) {
        cost = sameDistrict ? 110 : 150;
      } else {
        const extraWeight = (parcelWeight - 3) * 40;
        cost = sameDistrict ? 110 + extraWeight : 150 + extraWeight + 40;
      }
    }
    Swal.fire({
      title: "Are you sure?",
      text: `You Will Be charge Att ${cost} !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm!",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcelData = {
          ...formData,
          parcelCost: cost,
        };
        axiosInstance.post("/parcel", parcelData);

        Swal.fire({
          title: "Confirm!",
          text: "Parcel Was Send. thank you!",
          icon: "success",
        });
        navigate("/deashbord/parcelDetails")
      }
    });
  };

  useEffect(() => {
    let diviton = async () => {
      try {
        const AllDiviton = await axios.get("/division.json");
        const allDistrict = await axios.get("/warehouses.json");
        segtDiviton(Array.isArray(AllDiviton.data) ? AllDiviton.data : []);
        setDistrict(allDistrict?.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    diviton();
  }, []);


  useEffect(() => {
    const districts = () => {
      try {
        const districtFind = district?.filter(
          (res) => res?.region === senderRegion,
        );
        setDistrictSender(districtFind);
      } catch (error) {
        console.log(error.message);
      }
    };
    districts();
  }, [district, senderRegion]);

  useEffect(() => {
    const reciverDistricts = () => {
      try {
        const reciverDistrict = district?.filter(
          (res) => res?.region === reciverRegion,
        );
        setDistrictReciver(reciverDistrict);
      } catch (error) {
        console.log(error.message);
      }
    };
    reciverDistricts();
  }, [district, reciverRegion]);

  const inputClass =
    "input input-bordered w-full border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition duration-200";

  const textareaClass =
    "textarea textarea-bordered w-full border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition duration-200";

  const selectClass =
    "select select-bordered w-full border border-gray-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition duration-200";

  return (
    <div className="p-10  min-h-screen">
      <Container className="bg-base-100 shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-color mb-6">
          Send A Parcel
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Parcel Type */}
          <div>
            <p className="font-medium mb-2">Parcel Type</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="document"
                  checked={parcelType === "document"}
                  onChange={() => setParcelType("document")}
                />
                Document
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="non-document"
                  checked={parcelType === "non-document"}
                  onChange={() => setParcelType("non-document")}
                />
                Non-Document
              </label>
            </div>
          </div>

          {/* Parcel Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", { required: true })}
              className={inputClass}
            />

            <input
              type="number"
              placeholder="Parcel Weight (KG)"
              {...register("weight", { required: true })}
              className={inputClass}
            />
          </div>

          {/* Sender & Receiver */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sender */}
            <div className="p-4 border border-blue-300 rounded-xl bg-base-200">
              <h2 className="font-semibold mb-3 flex items-center gap-2">
                <FaUser /> Sender Details
              </h2>

              <input
                placeholder="Sender Name"
                defaultValue={user?.displayName}
                readOnly
                {...register("senderName", { required: true })}
                className={inputClass + " mb-2"}
              />
              <input
                placeholder="Sender Email"
                defaultValue={user?.email}
                readOnly
                {...register("senderEmail", { required: true })}
                className={inputClass + " mb-2"}
              />

              <input
                placeholder="Sender Phone"
                {...register("senderPhone", { required: true })}
                className={inputClass + " mb-2"}
              />

              <select
                {...register("senderDivition", { required: true })}
                defaultValue=""
                className={selectClass + " mb-2"}
              >
                <option value="" disabled>
                  Select Division
                </option>
                {diviton?.map((res, index) => (
                  <option key={index}>{res}</option>
                ))}
              </select>

              <select
                {...register("senderDistrict", { required: true })}
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select District
                </option>
                {districtSender?.map((res, index) => (
                  <option key={index}>{res?.district}</option>
                ))}
              </select>
            </div>

            {/* Receiver */}
            <div className="p-4 border border-blue-300 rounded-xl bg-base-200">
              <h2 className="font-semibold mb-3 flex items-center  gap-2">
                <FaUser /> Receiver Details
              </h2>

              <input
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className={inputClass + " mb-2"}
              />
              <input
                placeholder="Receiver Email"
                {...register("reciverEmail", { required: true })}
                className={inputClass + " mb-2"}
              />

              <input
                placeholder="Receiver Phone"
                {...register("receiverPhone", { required: true })}
                className={inputClass + " mb-2"}
              />

              <select
                {...register("reciverDiviton", { required: true })}
                defaultValue=""
                className={selectClass + " mb-2"}
              >
                <option value="" disabled>
                  Select Division
                </option>
                {diviton?.map((res, index) => (
                  <option key={index}>{res}</option>
                ))}
              </select>

              <select
                {...register("receiverDistrict", { required: true })}
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select District
                </option>
                {reciverDistrict?.map((res, index) => (
                  <option key={index}>{res?.district}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Instructions */}
          <div className="grid md:grid-cols-2 gap-4">
            <textarea
              placeholder="Tell Me Your Location"
              {...register("pickupInstruction", { required: true })}
              className={textareaClass}
            />

            <textarea
              placeholder="Tell Me Your Location"
              {...register("deliveryInstruction", { required: true })}
              className={textareaClass}
            />
          </div>

          {/* Error Messages */}
          <div className="text-red-500 text-sm">
            {errors.parcelName && <p>Parcel name is required</p>}
            {errors.weight && <p>Weight is required</p>}
          </div>
          <p>* PickUp Time 4pm-7pm Approx.</p>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn background-color w-full"
          >
            <span className="text-white">
              {" "}
              {isSubmitting ? "Submitting..." : "Proceed to Confirm Booking"}
            </span>
          </button>
        </form>
      </Container>
    </div>
  );
};

export default ParcelSend;
