import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkResponse } from "../../utils/checkResponse";
import { fetchWithRefresh, refreshToken } from "../auth";
import  { getUser, login, patchUserData, logout, resetPass, forgotPass } from "../../utils/api"
import { setUser, setIsAuthChecked } from "../slices/formSlice";
import React, { SyntheticEvent } from 'react';

type TRegister = {
  email: string
  name: string
  password: string
}

interface YandexCustomErrorResp {
  message: string;
  success: boolean;
}

function isJwtExpiredError(smth: unknown): smth is YandexCustomErrorResp {
    return (
      typeof smth === "object" &&
      smth !== null &&
      smth.hasOwnProperty("message") &&
      smth.hasOwnProperty("success")
    );
}

export const userLogin = createAsyncThunk(
    "userLogin",
    async({email, password}: Pick<TRegister, "email" | "password">) => {
        return await login({email, password}) 
    }
);

export const getUserParam = createAsyncThunk(
    "getUserParam",
    async () => {
        return getUser()
    }
)

export const checkUserAuth = createAsyncThunk(
      "checkUserAuth",
      async (_, {dispatch}) => {
        if(localStorage.getItem("accessToken")) {
            getUser().then( res => {
                dispatch(setUser(res.user))
            })
            .catch( err => {
              //localStorage.removeItem("accessToken")
              //localStorage.removeItem("refreshToken")
            })
            .finally( () => dispatch(setIsAuthChecked(true)))
        } else {
          dispatch(setIsAuthChecked(true))
        }
      }
);

export const setUserData = createAsyncThunk(
    "setUserData",
    async ({userInput}:any, { rejectWithValue }) => {
        const commonPart = async () => {
          const res = (await patchUserData( userInput ));
          return { ...res };
        };
        try {
          return await commonPart();
        } catch (e: unknown) {
          if (isJwtExpiredError(e) && e.message.includes("expired")) {
            // было { accessToken } 
            const accessToken = await refreshToken();
            return await commonPart();
          } else {
            return rejectWithValue(e);
          }
        }
      }
)

export const logoutUser = createAsyncThunk(
    "logoutUser",
    async () => {
        const token = localStorage.getItem("refreshToken");
        return  await logout() // token

    }
);

type TResetPass = {
  password: string
  token: string
}
export const resetPassword = createAsyncThunk(
    "resetPassword",
    (form: TResetPass) => {
        // console.log(form)
        return  resetPass(form)
    }
)

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
