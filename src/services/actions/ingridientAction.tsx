import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngridientsRequest } from '../../utils/api';

export const loadAllIngredients = createAsyncThunk(
    "loadAllIngredients",
    async () => {
        return  fetchIngridientsRequest()
            .then( res => {
                return res
            }) ;
    }
);