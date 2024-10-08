import Ingridient from "../components/Ingridients/Ingredient"

export enum WebsocketStatus {
    CONNECTING='CONNECTING...',
    ONLINE='ONLINE',
    OFFLINE='OFFLINE'
}

// export type TIngridientSocket = {
//     status: string
//     success: boolean
//     orders: {
//         ingridients: string[] | null
//         _id: string
//         status: string
//         number: number
//         createdAt: string
//         updatedAt: string
//     }
//     total: number
//     totalToday: number
//     connectionError: string | null
// }

export type TFeed = {
    success: boolean;
    orders: TFeedOrder[];
    total: number;
    totalToday: number;
};

export type TFeedOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string | number | Date;
    updatedAt: string;
    number: number;
};

export type ListOrdersActions = Array<TFeedOrder>;