import { createAsyncThunk } from "@reduxjs/toolkit";
import { resetPass } from '../../utils/api';
import { TResetPass } from "../../types/types";

export const resetPassword = createAsyncThunk(
    "resetPassword",
    async (form: TResetPass) => {
        return await resetPass(form)
            .then( res => {
                // console.log(res)
                return res
            });
    }
);