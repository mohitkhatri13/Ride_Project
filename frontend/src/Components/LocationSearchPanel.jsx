import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
const LocationSearchPanel = ( props) => {

    const locations = [
        "Kartavya Path, India Gate, New Delhi, Delhi 110001",
        " jama masjid, New Delhi, Delhi 110001",
        "Dhaula Kuan  New Delhi, Delhi 110001",
        "New Delhi Airport New Delhi, Delhi 110001",
        "Sarojini market New Delhi, Delhi 110001",
        "BVCOE New Delhi,Paschim Vihar East Delhi 110063"
    ]
  return (
    <div >
        {/* this is just a sample data */}

        {locations.map(function(element , id ){
             return <div key = {id} onClick={()=>{
                props.setVehiclePanel(true);
                props.setPanelopen(false)
             }} className='flex p-3 border-2  rounded-xl border-gray-100 active:border-black  items-center gap-x-4 justify-start my-2'>
             <h4 className='text-xl bg-[#eee] p-4 rounded-full'><IoLocationSharp /></h4>
             <h4 className='text-xl'>{element}</h4>
            </div>
        })}

      
    </div>
  )
}

export default LocationSearchPanel
