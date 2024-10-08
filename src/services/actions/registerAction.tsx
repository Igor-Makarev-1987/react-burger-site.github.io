import { createAsyncThunk } from "@reduxjs/toolkit";
import { register } from '../../utils/api';
import { TRegister } from "../../types/types"

export const registerUser = createAsyncThunk(
    "registerUser",
    async ({email, password, name}: TRegister) => {
        return  await register({email, password, name})
            .then( res => {
                console.log(res)
                return res
            });
    }
); 