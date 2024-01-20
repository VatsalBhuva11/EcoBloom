import React from 'react'

const Change_profile = ({visible,onClose}) => {

  const handleOnClose = (e) => {
    if(e.target.id === "container") onClose();
  };

  if(!visible) return null;

  return (
    <div id="container" onClick={handleOnClose} className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#CDE1C9] p-7 rounded w-96 flex flex-col justify-center mt-7 gap-3">
        <div>
            <label
                class="block mb-2 text-sm font-medium text-[#0f1035]"
                for="file_input"
            >
                Upload Photo<sup>*</sup>
            </label>
            <input
                class="block w-full text-sm  file:bg-[#0f1035]  file:text-white file:p-2 file:rounded-lg file:font-bold file:hover:scale-105 file:duration-300 rounded-lg cursor-pointer focus:outline-none bg-transparent text-[#0f1035]"
                aria-describedby="file_input_help"
                id="profile"
                name="profile"
                type="file"
                accept="image/*"
                required
            />
        </div>                           
        <div className='flex justify-around mt-7 mb-5'>
          <button className='text-lg bg-[#EEF0E5] text-[#0F1035] w-32 h-8 rounded-lg border-2 border-[#0F1035]'>Cancel</button>
          <button className='text-lg bg-[#0F1035] text-[#EEF0E5] w-32 h-8 rounded-lg'>Update</button>
        </div>
      </div>
    </div>
  )
}


export default Change_profile

