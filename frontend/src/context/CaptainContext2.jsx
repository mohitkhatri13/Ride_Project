import React, { createContext, useState } from 'react';

export const CaptainDataContext = createContext();

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading , setisLoading] = useState(false);
    const [error , setError] = useState(null);

    const updateCaptain = (captainData)=>{
        setCaptain(captainData);
    }

    
    const value = {
        captain,
        setCaptain,
        updateCaptain,
        isLoading,
        setisLoading,
        error,
        setError
    }

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};
export default CaptainContext;