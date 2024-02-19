import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { HistoryApi } from "../modal/Slice";
import axios from "axios";

const Container2 = () => {
  const date = new Date();
  const Data = useSelector((state) => state.Trackerdata);
  const dispatch = useDispatch();
  // console.log(Data.userinfo.accessToken);
  useEffect(() => {
    dispatch(HistoryApi());
  }, []);
  // console.log(Data.data);

  const Delete = async (state) => {
    // console.log(state);
    try {
      await axios.post(
        "https://expense-tracking-api-ux7o.onrender.com/delete",
        state,
        {
          headers: {
            Authorization: "Bearer " + Data.userinfo.accessToken, //the token is a variable which holds the token
          },
        }
      );
      dispatch(HistoryApi());
      // console.log(data.data);
    } catch (err) {
      console.log("Delete api ", err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="capitalize text-3xl">Transaction history</h1>
      {/* data display */}
      <div className="flex flex-col gap-2">
        {Data.transactionData.data?.length > 0 ? (
          <>
            {Data.transactionData.data?.map((i, index) => {
              return (
                <div
                  className={
                    i.category == "Expense"
                      ? "bg-red-500 text-white flex lg:px-6 py-4 items-center capitalize lg:text-lg rounded-lg justify-around"
                      : "bg-green-500 text-white flex lg:px-6 py-4 items-center capitalize lg:text-lg rounded-lg justify-around"
                  }
                  key={index}
                >
                  <p
                    className="text-black lg:w-1/2 cursor-pointer"
                    onClick={() => Delete(i)}
                  >
                    <MdDelete />
                  </p>
                  <p className="lg:w-1/2">{i.itemName}</p>
                  <p className="lg:w-1/2">{i.category}</p>
                  <p className="lg:w-1/2">{i.amount}</p>
                  <span className="lg:text-sm text-xs">{`${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}</span>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center py-10 lg:mt-24 text-xl text-gray-500">
            No Transaction Data ...
          </p>
        )}
      </div>
    </div>
  );
};

export default Container2;
