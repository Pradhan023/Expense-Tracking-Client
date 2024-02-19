import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const Nav = useNavigate();
  const user = localStorage.getItem("info");
  const info = JSON.parse(user);
  function handlecheck() {
    if (!info) {
      Nav("/login");
    } else {
      localStorage.clear();
      handleClose();
      Nav("/");
      window.location.reload(false);
    }
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex justify-between items-center lg:px-8 px-3 py-2 lg:py-3 h-12 bg-slate-900 text-white cursor-pointer">
      <p className="lg:text-3xl text-lg lg:ml-8" onClick={() => Nav("/")}>
        Expense Tracker
      </p>

      {!info ? (
        <p className="lg:text-xl" onClick={() => Nav("/login")}>
          Sign In
        </p>
      ) : (
        <>
          {/* drop down menu */}
          <Button
            id="basic-button"
            // aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            // aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <p className="text-white lg:text-lg">Profile</p>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>{info?.username}</MenuItem>
            <MenuItem
              onClick={() => {
                Nav("/expensetracker");
                handleClose();
              }}
            >
              {info ? "Tracker" : ""}
            </MenuItem>
            <MenuItem onClick={handlecheck}>
              {info ? "Log Out" : "Sign In"}
            </MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default Header;
