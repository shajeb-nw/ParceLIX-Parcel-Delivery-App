import axios from 'axios';
import React from 'react';

const useAxious = () => {
    const axiosInstance=axios.create({
        baseURL:import.meta.env.VITE_BACKEND_URL,
         timeout: 60000
    })
    
    return (
     axiosInstance
    );
};

export default useAxious;