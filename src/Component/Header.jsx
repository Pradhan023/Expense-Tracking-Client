import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const Nav = useNavigate();
  const info = useSelector(i=>i.Trackerdata.userinfo)
  function handlecheck(){
    if(!info){
      Nav("/login")
    }
    else{
      localStorage.clear()
      Nav("/")
      window.location.reload(false)
    }
  }
  return (
    <div className="flex justify-between items-center px-8 py-3 h-12 bg-slate-900 text-white cursor-pointer">
      <p className="text-2xl lg:ml-8" onClick={() => Nav("/")}>
        Expense Tracker
      </p>
      <div className="flex gap-5"><p onClick={()=>Nav("expensetracker")}>{info ? "Expense Tracker" : "" }</p><p className="text-lg">{info?.username}</p><p onClick={handlecheck}>{info ? "Log Out" : "Sign In"}</p></div>
    </div>
  );
};

export default Header;
