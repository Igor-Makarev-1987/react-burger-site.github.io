import { createAction } from "@reduxjs/toolkit";

export const wsConnect = createAction<string, "LIST_ORDERS_CONNECT">("LIST_ORDERS_CONNECT")
export const wsDisconnect = createAction("LIST_ORDERS_DISCONNECT")