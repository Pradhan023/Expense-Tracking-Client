import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { HistoryApi } from "../modal/Slice";
import axios from "axios";

const Container = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(HistoryApi())
  },[dispatch])
  const Data = useSelector((i) => i.Trackerdata);
  // console.log(Data.userinfo);
  const [state, setState] = useState({
    itemName: "",
    category: "",
    amount: "",
  });

  const [error, setError] = useState({
    itemName: "",
    category: "",
    amount: "",
  });

  const categoryType = ["Salary", "Expense", "Bonus"];

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleValidate = () => {
    let newErrors = { ...error };
    let valid = true;

    // item name
    if (!state.itemName) {
      newErrors.itemName = "Item Name Required";
      valid = false;
    } else {
      newErrors.itemName = "";
    }

    // category
    if (!state.category) {
      newErrors.category = "Category Required";
      valid = false;
    } else {
      newErrors.category = "";
    }

    // amount
    if (!state.amount) {
      newErrors.amount = "Amount Required";
      valid = false;
    } else {
      newErrors.amount = "";
    }

    setError(newErrors);
    // return valid value
    return valid;
  };

  // Api call function
  async function newCall() {
    try {
      const data = await axios.post(
        "https://expense-tracking-api-ux7o.onrender.com/createdata",
        state,
        {
          headers: {
            Authorization: "Bearer " + Data.userinfo.accessToken, //the token is a variable which holds the token
          },
        }
      );
      dispatch(HistoryApi());
      console.log(data.data);
    } catch (err) {
      console.log("Post api ", err);
    }
  }

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidate()) {
      // alert("perfect")
      // then api call will work here
      if (
        Data.Balance == 0 &&
        Data.Income >= 0 &&
        state.category != "Expense"
      ) {
        await newCall();
      } else if (Data.Balance == state.amount) {
        await newCall();
      } else if (Data.Balance > state.amount) {
        await newCall();
      } else if (state.category == "Bonus") {
        await newCall();
      } else {
        alert("You dont have enough Balance");
      }
      // console.log(state);
      setState({
        itemName: "",
        category: "",
        amount: "",
      });
    } else {
      alert("Invalid Entry or You dont have enough Balance ");
    }

    // if (handleValidate()) {
    //   // then api call will work here
    //   try{
    //     const data= await axios.post("https://expense-tracking-api-ux7o.onrender.com/createdata",state,{headers:{
    //       Authorization: 'Bearer ' + Data.userinfo.accessToken//the token is a variable which holds the token
    //     }});
    //     dispatch(HistoryApi())
    //     console.log(data.data);
    //   }
    //   catch(err){
    //     console.log("Post api " , err);
    //   }

    //   dispatch(addData(state))
    //   // console.log(state);
    //   setState({
    //     itemName: "",
    //     category: "",
    //     amount: "",
    //   });
    // }
  };

  return (
    <>
      <div className=" flex flex-col gap-5 ">
        <h1 className="text-3xl font-mono">Balance : ₹{Data.Balance}</h1>

        {/* income expense view */}
        <div className="flex gap-1 ">
          {/* income */}
          <div className=" w-1/2 border-2 border-slate-200 rounded-md py-5 pl-6 boxshadow">
            <p className="font-mono text-xl">Income</p>
            <p className="text-green-600 text-lg">+₹{Data.Income}</p>
          </div>
          {/* expense */}
          <div className=" w-1/2 border-2 border-slate-200 rounded-md py-5 pl-6 boxshadow">
            <p className="font-mono text-xl">Expense</p>
            <p className="text-red-600 text-lg">-₹{Data.Expense}</p>
          </div>
        </div>

        {/* New transaction field  */}
        <div className="mt-6">
          <h1 className="text-2xl">New Transaction</h1>
          {/* input field */}

          {/* first enter item  */}
          <form onSubmit={handleSubmit}>
            {/* input fields */}

            <div className="flex flex-col mb-4">
              <TextField
                error={Boolean(error.itemName)}
                type="text"
                name="itemName"
                margin="normal"
                value={state.itemName}
                id="outlined-basic"
                label="Item Name"
                variant="outlined"
                onChange={handleChange}
                helperText={error.itemName}
              />

              {/* category */}

              <FormControl
                // sx={{ width: 120 }}
                variant="outlined"
                margin="normal"
              >
                <InputLabel id="category-type">Category</InputLabel>
                <Select
                  labelId="category-type"
                  label="Category"
                  name="category"
                  value={state.category}
                  onChange={handleChange}
                  error={Boolean(error.category)}
                >
                  {categoryType.map((i) => {
                    return (
                      <MenuItem key={i} value={i}>
                        {i}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {/* amount field */}

              <TextField
                error={Boolean(error.amount)}
                type="number"
                name="amount"
                margin="normal"
                value={state.amount}
                id="outlined-basic"
                label="Enter Amount"
                variant="outlined"
                onChange={handleChange}
                helperText={error.amount}
              />
            </div>

            {/* sumbmit transaction */}
            <Button
              className="h-14 w-full"
              type="submit"
              variant="contained"
              color="primary"
            >
              <p className="text-lg">Add Transaction</p>
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Container;
