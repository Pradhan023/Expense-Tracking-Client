import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, FormHelperText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HistoryApi } from "../../modal/Slice";

const Login = () => {
  const Nav = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidate = () => {
    let newErrors = { ...error };
    let valid = true;

    // email
    if (!state.email) {
      newErrors.email = "Email Required";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // password
    if (!state.password) {
      newErrors.password = "Password Required";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setError(newErrors);
    // return valid value
    return valid;
  };

  // api data

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidate()) {
      // then api call will work here
      try {
        const data = await axios.post(
          "https://expense-tracking-api-ux7o.onrender.com/login",
          state
        );
        // console.log(data.data);
        if (data.data.msg == "successfully loged in") {
          toast.success(data.data.msg);
          localStorage.setItem("info", JSON.stringify(data.data.user)); //json.stringfy converts into strings and we can get data by converting in object becasue setitem converts the object in string automatically
          setTimeout(() => {
            Nav("/expensetracker");
            window.location.reload(false)
          }, 2000);
        } else {
          toast.warn(data.data.msg);
        }
      } catch (err) {
        console.log("Signin Api Error", err);
      }
      dispatch(HistoryApi())
      // console.log(state);
      setState({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  // password operation
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="signupbg  flex flex-col justify-center items-center">
      {/* signup container */}
      <div className="lg:w-1/4 md:w-1/2 px-6 py-6 shadow-xl bg-white">
        <h1 className="text-2xl">Sign In</h1>
        {/* form */}
        <form onSubmit={handleSubmit}>
          {/* input fields */}

          <div className="pb-5 flex flex-col">
            {/* email */}

            <TextField
              error={Boolean(error.email)}
              type="email"
              name="email"
              margin="normal"
              value={state.email}
              label="Enter Email"
              variant="outlined"
              onChange={handleChange}
              helperText={error.email}
            />

            {/* password */}
            {/* sx={{ m: 2, width: "25ch" }} */}
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                error={Boolean(error.email)}
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                name="password"
                value={state.password}
                onChange={handleChange}
              />
              <FormHelperText>
                <span className={error.password ? "text-red-600" : "text-black"}>
                  {error.password}
                </span>
              </FormHelperText>
            </FormControl>
          </div>

          {/* submit */}
          <Button
            className="h-14 w-full"
            type="submit"
            variant="contained"
            color="primary"
          >
            <span className="text-lg">Sign In</span>
          </Button>
        </form>
        <div
          className="text-center mt-3 cursor-pointer"
          onClick={() => Nav("/signup")}
        >
          or Sign Up
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
