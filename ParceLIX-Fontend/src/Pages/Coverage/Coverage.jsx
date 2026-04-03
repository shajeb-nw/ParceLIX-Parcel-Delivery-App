import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FadeLoader } from "react-spinners";
import "leaflet/dist/leaflet.css";
import Container from "../../Utility/Container";

const Coverage = () => {
  const position = [23.8103, 90.4125];
  const [district, setDistrict] = useState([]);
  const [allDistrict, setAllDistrict] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef=useRef()
  useEffect(() => {
    const fetchDistrict = async () => {
      try {
        let res = await axios.get("/division.json");
        setDistrict(res?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDistrict();
  }, []);


  useEffect(() => {
    const allDistrict = async () => {
      try {
        const district = await axios.get("/warehouses.json");
        setAllDistrict(district?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    allDistrict();
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <FadeLoader width={3} color="#ae0cff" height={15} margin={0} />
      </div>
    );
  }
  const handleClick=(e)=>{
    e.preventDefault()

    let filterDistrict=allDistrict?.find(data=>
      data.district.toLowerCase().includes(e.target.text.value.toLowerCase()) 
    )
    if(filterDistrict){
      let card=[filterDistrict.latitude,filterDistrict.longitude]
       mapRef.current.flyTo(card,10)
    }else{
      mapRef.current.flyTo(position,7)
    }
    
  }
  const clickBtn=(clickDis)=>{
    const clickDistrict=allDistrict?.find(res=>
      res.district.toLowerCase().includes(clickDis?.toLowerCase())
      
    );
    if(clickDistrict){
      const card=[clickDistrict.latitude,clickDistrict.longitude];
      mapRef.current.flyTo(card,10);
    }
   
    
  }
  if (error) return <p>{error}</p>;
  return (
    <section className="bg-base-100 py-16">
      <Container className="">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            We are available in <span className="text-color">64 districts</span>
          </h2>
          <p className="mt-2">
            We deliver almost all over Bangladesh
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-12">
          <form onSubmit={handleClick} className="flex w-full max-w-xl  rounded-full shadow-md overflow-hidden">
            <input
              type="text"
              name="text"
              placeholder="Search your district..."
              className="flex-1 px-5 py-3 outline-none bg-base-300"
            />
            <button className="background-color text-white px-6">
              <span className="flex items-center gap-2">
                <FaSearch /> Search
              </span>
            </button>
          </form>
        </div>

        {/* District Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {district?.map((district, index) => (
            <div
              key={index}
              onClick={()=> clickBtn(district)}
              className="bg-base-300 p-4 rounded-xl shadow-sm hover:shadow-lg transition flex items-center gap-3 cursor-pointer"
            >
              <FaMapMarkerAlt className="text-[#ae0cff]" />
              <span className="font-medium ">{district}</span>
            </div>
          ))}
        </div>

        {/* Map Section */}
        <div className="w-full h-120 rounded-2xl overflow-hidden">
            <MapContainer  ref={mapRef} center={position} zoom={7} scrollWheelZoom={false} className="w-full h-full relative z-0">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {allDistrict?.map((res,index)=>(
              <Marker key={index} position={[res.latitude,res.longitude]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
              ))}
            </MapContainer>
        </div>
      </Container>
    </section>
  );
};

export default Coverage;
