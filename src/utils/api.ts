import { checkResponse } from "./checkResponse";
// import { getCookie } from "../utils/cookieHandler";
import { fetchWithRefresh } from "../services/auth"
import { API_BASE } from "./const";
import { IIngredientDetail, 
  IIngredientDetailResponse, 
  TForgotPassRes, 
  TGetUserRes, 
  TLogin, 
  TRegisterRes, 
  IIngredient, 
  IIngredientResponse,
  TFeedOrderResponse,
  TUser
} from "../types/types";

export const fetchIngridientsRequest = async (): Promise<IIngredientResponse> => {
    return await fetch(`${API_BASE}/ingredients`, {
      headers: {
        "Content-Type": "application/json",
      }
    })
        .then(checkResponse<IIngredientResponse>)
        // .then(res => res)
};

type TSubmitOrder = {
  ingredientIds: string
}

export const submitOrder = async (ingredientIds: string[]): Promise<IIngredientDetailResponse> => {
    return await fetch(`${API_BASE}/orders`, {
        method: "POST",
        body: JSON.stringify({
        ingredients: ingredientIds,
      }),
      headers: {
        "Content-Type": "application/json",
         Authorization: localStorage.getItem("accessToken")!
      }
    }).then(checkResponse<IIngredientDetailResponse>)
    // .then(res => res)
}

type TForgotPass = {
  email: string
}
export const forgotPass = (email: TForgotPass): Promise<TForgotPassRes> => {
  return fetch(`${API_BASE}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email: email
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(checkResponse<TForgotPassRes>)
    // .then(res => { 
    //   console.log(res)
    //   return res
    // })
}

type TRegister = {
  email: string
  name: string
  password: string
}
export const register = async ({email, name, password}: TRegister): Promise<TRegisterRes>=> {
  return fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      name: name,
      password: password
    }),
    headers: {
      "Content-Type": "application/json",
    }
  }).then(checkResponse<TRegisterRes>).then(res => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      return res;
  });
}

// получение данных пользователя
// export const getUserData = async () => {
//   return fetchWithRefresh(`${API_BASE}/auth/user`, {
//     method: "GET",
//     mode: "cors",
//     cache: "no-cache",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: getCookie("accessToken") ?? "",
//     },
//     redirect: "follow",
//     referrerPolicy: "no-referrer",
//   })
//   .then(checkResponse)
// }

// логирование пользователя
export const login = async({ email, password }: Pick<TRegister, "email" | "password">): Promise<TLogin> => {
  return await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password : password
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(checkResponse<TLogin>)
  .then(res => {
      localStorage.setItem("refreshToken", res.refreshToken);
      localStorage.setItem("accessToken", res.accessToken);
    return res
  })
}

// получение данных пользователя не работает fetchWithRefresh
export const getUser = (): Promise<TGetUserRes> => {
  return fetchWithRefresh<TGetUserRes>(`${API_BASE}/auth/user`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
           Authorization: localStorage.getItem("accessToken")!,
      },
  });
};

// обновление пользовательских данных
export const patchUserData = async (userUpdateInput: TRegister): Promise<TUser> => {
  console.log(userUpdateInput)
  return fetchWithRefresh<TUser>(`${API_BASE}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
       Authorization: localStorage.getItem("accessToken")!
    },
    body: JSON.stringify(userUpdateInput),
  });
}

// выход пользователя
export const logout = (): Promise<TForgotPassRes> => {
  return fetch(`${API_BASE}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkResponse<TForgotPassRes>).then(res => {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      return res;
  })
}

type TResetPass = {
    password: string
    token: string
}
export const resetPass = ({password, token}: TResetPass): Promise<TResetPass> => {
  return fetch(`${API_BASE}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password: password,
      token: token
    }),
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(checkResponse<TResetPass>).then(res => {
      console.log(res)
      return res
    })
}

export const getOrderRequest = async ( id: string): Promise<TFeedOrderResponse> => {
  return await fetch(`${API_BASE}/orders/${id}`)
      .then(checkResponse<TFeedOrderResponse>).then( res => {
        return res
      });
};