import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus, TFeedOrder, TFeed } from "../../types/socket";

type listOrders = {
    status: string
    success: boolean
    orders: TFeedOrder[] | []
    total: number
    totalToday: number
    connectionError: string | null
}

export const initialState: listOrders = {
    status: WebsocketStatus.OFFLINE,
    success: false,
    orders: [],
    total: 0,
    totalToday: 0,
    connectionError: null,
}

const listOrdersSlice = createSlice({
    name: 'listOrders',
    initialState,
    reducers: {
        wsConnecting: (state) => {
            state.status = WebsocketStatus.CONNECTING
        },
        wsOpen: (state) => {
            state.status = WebsocketStatus.ONLINE
        },
        wsClose: (state) => {
            state.status = WebsocketStatus.OFFLINE
        },
        wsError: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload
        },
        wsMessage: (state, action ) => {
            // console.log(action.payload)
            state.orders = action.payload.orders
            state.success = action.payload.success
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        }
    },
})

export const {
    wsConnecting,
    wsClose,
    wsError,
    wsMessage,
    wsOpen
} = listOrdersSlice.actions;
  
export default listOrdersSlice.reducer;