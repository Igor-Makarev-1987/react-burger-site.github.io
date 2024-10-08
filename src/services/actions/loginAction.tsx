import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from '../../utils/api';
import { TFormInput } from "../../types/types"
// логирование пользователя
export const loginUser = createAsyncThunk(
    "loginUser",
    async ({email, password}: TFormInput) => {
        const res = await login({email, password})
        // console.log(res)
        return { ...res }
    }
);