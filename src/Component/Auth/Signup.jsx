import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, CircularProgress, FormHelperText } from "@mui/material";
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

const Signup = () => {
  const Nav = useNavigate();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidate = () => {
    let newErrors = { ...error };
    let valid = true;

    // user name
    if (!state.username) {
      newErrors.username = "User Name Required";
      valid = false;
    } else {
      newErrors.username = "";
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // loader stop incase of empty field
    const count = Object.values(state); //this property will give us the values of obj in array
    if (count[0] == "" || count[1] == "" || count[2] == "") {
      //here we will check if any of the value is empty then dont display the loader
      setLoader(false);
    }

    if (handleValidate()) {
      setLoader(true);
      // then api call will work here
      try {
        const data = await axios.post(
          "https://expense-tracking-api-ux7o.onrender.com/register",
          state
        );
        if (data.data.msg == "Registered Successfully") {
          toast.success(data.data.msg);
          setTimeout(() => {
            setLoader(false);
            Nav("/login");
          }, 2000);
        } else {
          setLoader(false);
          toast.warn(data.data.msg);
        }
      } catch (err) {
        console.log("Signup Api Error", err);
      }

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
        <h1 className="text-2xl">Sign up</h1>
        {/* form */}
        <form onSubmit={handleSubmit}>
          {/* input fields */}

          <div className="pb-5 flex flex-col">
            <TextField
              error={Boolean(error.username)}
              type="text"
              name="username"
              margin="normal"
              value={state.username}
              label="Enter User Name"
              variant="outlined"
              onChange={handleChange}
              helperText={error.username}
            />

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
                <span
                  className={error.password ? "text-red-600" : "text-black"}
                >
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
            {!loader ? (
              <span className="text-lg">Sign Up</span>
            ) : (
              <CircularProgress color="inherit" />
            )}
          </Button>
        </form>
        <div
          className="text-center mt-3 cursor-pointer"
          onClick={() => Nav("/login")}
        >
          or Sign In
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
