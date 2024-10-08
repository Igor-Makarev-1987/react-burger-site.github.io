import { createAction } from "@reduxjs/toolkit";

export const wsConnectUser = createAction<string, "USER_ORDERS_CONNECT">("USER_ORDERS_CONNECT")
export const wsDisconnectUser = createAction("USER_ORDERS_DISCONNECT")