import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get data from localstorage
const user = localStorage?.getItem("info");
const userData = JSON.parse(user);
// console.log(userData);

export const HistoryApi = createAsyncThunk("Api", async () => {
  const user = localStorage?.getItem("info");
  const userdata = JSON.parse(user);
  // console.log(userdata);
  try {
    const data = await axios.get(
      "https://expense-tracking-api-ux7o.onrender.com/getdata",
      {
        headers: {
          Authorization: "Bearer " + userdata?.accessToken, //the token is a variable which holds the token
        },
      }
    );
    return data.data;
  } catch (err) {
    console.log("GEt Error slice", err);
  }
});


const initialState = {
  historyData: [],
  Balance: 0,
  Income: 0,
  Expense: 0,
  transactionData: {
    isLoading: false,
    data: null,
    isError: false,
  },
  userinfo: userData,
};

const reducerSlice = createSlice({
  name: "Tracker",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(HistoryApi.pending, (state) => {
      state.transactionData.isLoading = true;
    }),
      builder.addCase(HistoryApi.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.transactionData.isLoading = false;
        state.transactionData.data = action.payload;

        // sum operation
        const value = action.payload
          ?.filter((i) => i.category !== "Expense")
          .reduce((acc, ab) => {
            return (acc += Math.abs(Number(ab?.amount)));
          }, 0);

        // console.log(value);
        // expense operation
        state.Expense = action?.payload
          ?.filter((i) => i.category == "Expense")
          .reduce((acc, ab) => {
            return (acc += Math.abs(Number(ab?.amount)));
          }, 0);
        state.Income = value ?? 0;
        // console.log(state.Income);
        // console.log(state.Income - state.Expense);

        //if you get null,undefined ,nan the  this nullist coalescing will consvert into 0
        state.Expense ??= 0;

        // balance
        state.Balance = state.Income - state.Expense;
        // console.log(action.payload);
        // console.log(state.transactionData.data);
      }),
      builder.addCase(HistoryApi.rejected, (state) => {
        state.transactionData.isError = true;
      });
  },
});

export default reducerSlice.reducer;
