import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../actions/orderListAction";
import { IIngredient, TFeedOrder } from "../../types/types";

type ICurrentIrder = {
  isLoadingCurrentOrder: boolean,
  errorCurrentOrder: null | string,
  currentOrder: TFeedOrder[]
}

export const initialState: ICurrentIrder  = {
    isLoadingCurrentOrder: false,
    errorCurrentOrder: '',
    currentOrder: []
}

const orders = createSlice({
    name: 'orders',
    initialState,
    reducers: {
       
    },

    extraReducers: (builder) => {
        builder
        .addCase(getOrders.fulfilled, (state, action) => {
          state.isLoadingCurrentOrder = false;
          // console.log(action.payload)
          state.currentOrder = action.payload.orders.orders;
        })
        .addCase(getOrders.pending, (state) => {
          state.isLoadingCurrentOrder = true;
          state.errorCurrentOrder = '';
        })
        .addCase(getOrders.rejected, (state) => {
          state.isLoadingCurrentOrder = false;
          state.errorCurrentOrder =
            "Error, something went wrong. Contact support  current orders auth user";
        });
    },
})

export const {

} = orders.actions;
  
export default orders.reducer;

