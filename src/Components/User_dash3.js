import React,{useState} from 'react'
import banner from '../assets/images/banner1.png'
import Card_line from './Card_line';

const User_dash3 = () => {
  const [task,setTask]=useState(0)

  return (
    <div className="h-screen w-full px-8 py-6">
      <div className="h-[100%] w-[100%] border border-[#277868] rounded-lg pl-5">
        <div className="flex gap-8 text-xl text-[#277868] font-semibold py-4">
          <button
            className={
              task === 0
                ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                : "font-semibold px-7 py-1 rounded-lg"
            }
            // "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
            onClick={() => {
              setTask(0);
            }}
          >
            ONGOING CAMPAIGNS
          </button>
          <button
            className={
              task === 1
                ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                : "font-semibold px-7 py-1 rounded-lg"
            }
            onClick={() => {
              setTask(1);
            }}
          >
            UPCOMING CAMPAIGNS
          </button>
          <button
            className={
              task === 2
                ? "font-semibold px-7 py-1 rounded-lg bg-[#E1E1E0]"
                : "font-semibold px-7 py-1 rounded-lg"
            }
            onClick={() => {
              setTask(2);
            }}
          >
            PAST CAMPAIGNS
          </button>
        </div>
        <div className="h-[90%] overflow-scroll overflow-x-hidden">
          {task === 0 ? (
            <>
              <Card_line />
              <Card_line />
              <Card_line />
              <Card_line />
              <Card_line />
              <Card_line />
              <Card_line />
              <Card_line />
            </>
          ) : (
            <div></div>
          )}
          {task === 1 ? (
            <>
              <Card_line />
              <Card_line />
            </>
          ) : (
            <div></div>
          )}
          {task === 2 ? (
            <>
              <Card_line />
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User_dash3
