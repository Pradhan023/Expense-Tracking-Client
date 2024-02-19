import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get data from localstorage
const user = localStorage.getItem("info");
const userData = JSON.parse(user);
// console.log(user);

export const HistoryApi = createAsyncThunk("Api", async () => {
  try {
    const data = await axios.get("https://expense-tracking-api-ux7o.onrender.com/getdata", {
      headers: {
        Authorization: "Bearer " + userData.accessToken, //the token is a variable which holds the token
      },
    });
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
  reducers: {
    addData: (state, action) => {
      console.log(action.payload);
      if (state.Balance == 0 && action.payload.category == "Expense") {
        return alert("You dont have valid Balance");
      }
    },
  },
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
            return (acc += Number(ab.amount));
          }, 0);

        // console.log(value);
        // expense operation
        state.Expense = action.payload
          ?.filter((i) => i.category == "Expense")
          .reduce((acc, ab) => {
            return (acc += Number(ab.amount));
          }, 0);

        state.Income = value;
        // console.log(state.Income);
        // console.log(state.Income - state.Expense);
        state.Balance = state.Income - state.Expense;

        // console.log(action.payload);
        // console.log(state.transactionData.data);
      }),
      builder.addCase(HistoryApi.rejected, (state) => {
        state.transactionData.isError = true;
      });
  },
});

export const { addData } = reducerSlice.actions;
export default reducerSlice.reducer;
