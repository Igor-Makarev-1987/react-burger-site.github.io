import { createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from '../../utils/api';

export const logoutUser = createAsyncThunk(
    "logoutUser",
    async () => {
        // const token = localStorage.getItem("refreshToken");
        return  await logout()
            .then( res => {
                console.log(res)
                return res
            });
    }
);