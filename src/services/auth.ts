import { checkResponse } from "../utils/checkResponse";
import { API_BASE } from "../utils/const";

type TError = {
    message: string
}

export const refreshToken = () => {
    return fetch(`${API_BASE}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    });
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit | undefined): Promise<T> => {
    try {
        const res = await fetch(url, options);
        return await checkResponse<T>(res);
    } catch (err: unknown) {
        if ((err as Error).message === "jwt expired") {
            const refreshData = await refreshToken(); //обновляем токен
            const json = await refreshData.json()
            if (!refreshData.ok) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", json.refreshToken);
            localStorage.setItem("accessToken", json.accessToken);

            const optionsUnified = options || { method: "GET", headers: {} };
                optionsUnified.headers = {
                ...optionsUnified.headers,
                Authorization: json.accessToken,
                };

            const res = await fetch(url, options); //повторяем запрос
            return checkResponse<T>(res);
        } else {
            return Promise.reject(err);
        }
    }
};