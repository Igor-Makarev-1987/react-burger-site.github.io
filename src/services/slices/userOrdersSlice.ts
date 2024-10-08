import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WebsocketStatus, TFeedOrder } from "../../types/socket";

type listOrders = {
    status: string
    success: boolean
    orders: TFeedOrder[]
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
    connectionError: null
}

const userOrdersSlice = createSlice({
    name: 'userOrders',
    initialState,
    reducers: {
        wsConnectingUser: (state) => {
            state.status = WebsocketStatus.CONNECTING
        },
        wsOpenUser: (state) => {
            state.status = WebsocketStatus.ONLINE
        },
        wsCloseUser: (state) => {
            state.status = WebsocketStatus.OFFLINE
        },
        wsErrorUser: (state, action: PayloadAction<string>) => {
            state.connectionError = action.payload
        },
        wsMessageUser: (state, action ) => {
            // console.log(action.payload)
            state.orders = action.payload.orders
            state.success = action.payload.success
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        }
    },
})

export const {
    wsConnectingUser,
    wsCloseUser,
    wsErrorUser,
    wsMessageUser,
    wsOpenUser
} = userOrdersSlice.actions;
  
export default userOrdersSlice.reducer;