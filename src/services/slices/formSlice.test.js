import formSlice, { initialState } from "./formSlice";
import { userLogin, getUserParam, setUserData, logoutUser, resetPassword, forgotPassword } from "../actions/formAction";
import { setUser, setIsAuthChecked } from "./formSlice";

const mockUserInfo = {
    user: {
        email: "test@gmail.com",
        name: "test mockaev"
    }
};
  
const mockAuth = true;

describe("formSlice reducer", () => {
    it("should return initial state", () => {
        expect(formSlice(undefined, {})).toEqual(initialState);
    });

    it("should populate userLogin and data if submission successful", async () => {
        const action = userLogin.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, isAuthChecked: true, userInfoSuccess: true, userInfoFailed: false, userInfo:mockUserInfo.user})
    })

    it("should fail userLogin if submission failed", async () => {
        const action = userLogin.pending();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: false});
    })

    it("should userLogin rejected", async () => {
        const action = userLogin.rejected();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: false, userInfoFailed: true});
    })

    it("should populate getUserParam and data if submission successful", async () => {
        const action = getUserParam.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: true, userInfoFailed: false, userInfo:mockUserInfo.user})
    })

    it("should fail getUserParam if submission failed", async () => {
        const action = getUserParam.pending();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: true});
    })

    it("should getUserParam rejected", async () => {
        const action = getUserParam.rejected();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: false, userInfoFailed: true});
    })

    it("should populate setUserData and data if submission successful", async () => {
        const action = setUserData.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: true, isAuthChecked: true, userInfo:mockUserInfo.user})
    })

    it("should fail setUserData if submission failed", async () => {
        const action = setUserData.pending();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: true});
    })

    it("should setUserData rejected", async () => {
        const action = setUserData.rejected();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, userInfoSuccess: false});
    })

    it("should populate logoutUser and data if submission successful", async () => {
        const action = logoutUser.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, isAuthChecked: true, isForgotPassword: false, userInfo:null})
    })

    it("should populate resetPassword and data if submission successful", async () => {
        const action = resetPassword.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, updateFormFailed: true})
    })

    it("should resetPassword rejected", async () => {
        const action = resetPassword.rejected();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, updateFormFailed: false});
    })

    it("should populate forgotPassword and data if submission successful", async () => {
        const action = forgotPassword.fulfilled(mockUserInfo)
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, updateFormFailed: false, updateFormSuccess: true, isForgotPassword:true})
    })

    it("should fail forgotPassword if submission failed", async () => {
        const action = forgotPassword.pending();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, updateFormFailed: false, updateFormSuccess: false, isForgotPassword:true})
    })

    it("should forgotPassword rejected", async () => {
        const action = forgotPassword.rejected();
        const actual = formSlice(initialState, action)
        expect(actual).toEqual({...initialState, updateFormFailed: false, updateFormSuccess: false, isForgotPassword:false, error: "User password reset has failed, please contact support."})
    })

    it("should return setUser", () => {
        const expectedState = { ...initialState, userInfo: mockUserInfo};
        expect(formSlice(initialState, setUser(mockUserInfo))).toEqual(expectedState)
    } )

    it("should return setIsAuthChecked", () => {
        const expectedState = { ...initialState, isAuthChecked: true};
        expect(formSlice(initialState, setIsAuthChecked(true))).toEqual(expectedState)
    } )

});