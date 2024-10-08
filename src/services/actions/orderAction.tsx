import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitOrder } from '../../utils/api';

export const postOrder = createAsyncThunk(
    "postOrder",
     async (ingridientIds: string[]) => {
        const orderId = await submitOrder(ingridientIds);
        return { orderId };
    }
);