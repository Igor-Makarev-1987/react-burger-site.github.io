import { createSlice } from "@reduxjs/toolkit";
import { userLogin, getUserParam, setUserData, logoutUser, resetPassword, forgotPassword } from "../actions/formAction";
import { TFormValues } from "../../types/types";

type TFormState = {
    resetFormFailed: boolean;
    resetFormSuccess: boolean;
    updateFormFailed: boolean;
    updateFormSuccess: boolean;
    registerFormSuccess: boolean;
    registerFormFailed: boolean;
    loginFormSuccess: boolean;
    loginFormFailed: boolean;
    userInfo: null |TFormValues;
    userInfoFailed: boolean;
    userInfoSuccess: boolean;
    isAuthChecked: boolean;
    logoutFormSuccess: boolean;
    logoutFormFailed: boolean;
    isForgotPassword: boolean
    error: string
  };

export const initialState: TFormState = {
    resetFormFailed: false,
    resetFormSuccess: false,
    updateFormFailed: false,
    updateFormSuccess: false,
    registerFormSuccess: false,
    registerFormFailed: false,
    loginFormSuccess: false,
    loginFormFailed: false,
    userInfo: null,
    userInfoFailed: false,
    userInfoSuccess: false,
    isAuthChecked: false,
    logoutFormSuccess: false,
    logoutFormFailed: false,
    isForgotPassword: false,
    error: ''
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        setUser: (state,action) => {
            state.userInfo = action.payload
        },
        setIsAuthChecked: (state, action) => {
            state.isAuthChecked = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                // console.log(action.payload.user)
                state.userInfo = action.payload.user
                state.isAuthChecked = true
                state.userInfoSuccess = true
                state.userInfoFailed = false
            })
            .addCase(userLogin.pending, (state) => {
                state.userInfoSuccess = false
            })
            .addCase(userLogin.rejected, (state) => {
                state.userInfoSuccess = false
                state.userInfoFailed = true
            })
            // получение параметров пользователя
            .addCase(getUserParam.fulfilled, (state, action) => {
                // console.log(action.payload.user)
                state.userInfo = action.payload.user
                // console.log(state.userInfo)
                state.userInfoSuccess = true
                state.userInfoFailed = false
            })
            .addCase(getUserParam.pending, (state) => {
                state.userInfoSuccess = true
            })
            .addCase(getUserParam.rejected, (state, action) => {
                state.userInfoSuccess = false
                state.userInfoFailed = true
            })
            // редактирование параметров пользователя
            .addCase(setUserData.fulfilled, (state, action) => {
                // console.log(action.payload)
                state.userInfo = action.payload.user
                state.isAuthChecked = true
                state.userInfoSuccess = true
            })
            .addCase(setUserData.pending, (state) => {
                state.userInfoSuccess = true
            })
            .addCase(setUserData.rejected, (state) => {
                state.userInfoSuccess = false
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.userInfo = null
                state.isAuthChecked = true
                state.isForgotPassword = false;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.updateFormFailed = true
            })
            .addCase(resetPassword.rejected, (state) => {
                state.updateFormFailed = false
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.updateFormFailed = false;
                state.updateFormSuccess = true;
                state.isForgotPassword = true;
                // console.log(state.isForgotPassword)
            })
            .addCase(forgotPassword.pending, (state) => {
                state.updateFormFailed = false;
                state.updateFormSuccess = false;
                state.isForgotPassword = true;
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.updateFormFailed = false;
                state.updateFormSuccess = false;
                state.isForgotPassword = false;
                state.error = "User password reset has failed, please contact support.";
            })
    }

})

export const {
    setUser,
    setIsAuthChecked
} = formSlice.actions;
  
export default formSlice.reducer;