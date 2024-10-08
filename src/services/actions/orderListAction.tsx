import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrderRequest } from "../../utils/api"; 

export const getOrders = createAsyncThunk(
    "getOrders",
    async(id : string) => {
        const orders = await getOrderRequest(id);
        // console.log(orders)
        return { orders };
    }
)