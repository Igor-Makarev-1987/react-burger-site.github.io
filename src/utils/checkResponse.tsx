// export function checkResponse<T>(response:Response): Promise<T> {
//     if (!response.ok) {
//       return Promise.reject(response.statusText);
//     }
    
//     return response.json();
// }

export type IResponse<T = {}> = {
  success: boolean;
  accessToken: string;
  refresToken: string
} & T;

// правка
export function checkResponse<T>(response:Response): Promise<IResponse<T>> {
  return response.ok ? response.json() : response.json().then(err => Promise.reject(err.message));
}
