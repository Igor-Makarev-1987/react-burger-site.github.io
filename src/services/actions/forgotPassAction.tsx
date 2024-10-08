import { createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPass } from '../../utils/api';

export const forgotPassword = createAsyncThunk(
    "forgotPassword",
    async (email: string) => {
        return  await forgotPass({email})
            .then( res => {
                console.log(res)
                return res
            });
    }
);