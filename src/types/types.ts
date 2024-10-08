import Ingridient from "../components/Ingridients/Ingredient";
import constructorIngridientsSlice from "../services/slices/constructorIngridientsSlice";
// import TConstructorIngridients from "../services/slices/constructorIngridientsSlice";

export enum INGREDIENT_TYPES {
    bun = "bun",
    sauce = "sauce",
    main = "main",
}

export enum NAV_TYPES {
    BUNS = "buns",
    SAUCES = "sauces",
    FILLINGS = "fillings",
  }

export interface UserUpdateInput {
    email?: string;
    password?: string;
    name?: string;
}

export interface IIngredient {
    // _id: string;
    // name: string;
    // type: string;
    // proteins: number;
    // fat: number;
    // carbohydrates: number;
    // calories: number;
    // price: number;
    // image: string;
    // image_mobile: string;
    // image_large: string;
    // __v: number;

    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    qty: number;
    type: string;
    _id: string;
}

export interface IDragObject extends IIngredient {
    index: number
}

export interface IIngredientDetail extends IIngredient {
    id?: number
}

export interface  IIngredientResponse {
    success: boolean;
    data:  never[];
}

export interface IIngredientDetailResponse extends IIngredient {
    id?: number;
    order: {
        number: never[]
    }
}

export interface IProps {
    current: string
}

// export interface IIngredients {
//     data: IIngredient
//     onClick: () => void
// }

export interface IConstructorIngridient {
    constructorIngridient: {
        bun: never[],
        ingridients: never[]
    },
    error: null;
    isIngredientDragged: boolean,
    isLoading: boolean
}

type TBun = {
    name: string;
    price: number;
    image: string
}

// constructorIngridients: {
//     constructorIngridient: {
//         bun: never[];
//         ingridients: never[];
//     };
//     isLoading: boolean;
//     error: null;
//     isIngredientDragged: boolean;
// };

export type TFormValues = {
    name: string;
    email: string;
    password?: string;
};

export type TFormInput = {
    name: string;
    email: string;
    password: string;
}

export type TLogin = {
    success: boolean,
    accessToken: string,
    refreshToken: string,
    user: {
        email: string,
        name: string
    }
} 

export type TRegisterRes = TLogin & {authToken?: string} 

export type TForgotPassRes = {
    success: boolean
    message: string
}

export type TGetUserRes = Pick<TLogin, "success" | "user">

export type TRefreshTokenRes = Pick<TLogin, "success" | "accessToken" | "refreshToken">

export type TProfilePageProps= {
    activeTab: string
}

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

export type TFeedOrderIngridients = {
    ingredients: string[];
    number: number;
    name: string;
    status: string;
    
}

export type TFeedOrderResponse = Pick<TFeed, "success" | "orders">;

export type TSubmitOrder = {
    ingredientIds: string
}

export type TRegister = {
    email: string
    name: string
    password: string
}

export type TResetPass = {
    password: string
    token: string
}

export type TUser = {
    success: boolean
    user: TRegister
}

export type TFeedOrderCurrentOpened = {
    currentOpened : TFeedOrder | undefined | null
}

export type TIngridients = {
    ingridients: IIngredient[],
    isLoading: boolean,
    error: string,
}

// ingridients: TIngridients;
// constructorIngridients: TConstructorIngridients;
// ... 5 more ...;
// userOrders: listOrders;

export type TFeedStoreActions = {
    onInit: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
    onDisconnect: string;
};

export type TFeedOrderStoreActions = {
    onInit: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
    onDisconnect: string;
};

export type TConstructorIngredient = IIngredient & { key: string; id?: string };
export type TConstructorIngredientValues = IIngredient & { id: number };

export type TConstructorIngridients = {
    constructorIngridient: {
        bun: TConstructorIngredientValues[]
        ingridients: TConstructorIngredientValues[]
    }

    isLoading: boolean;
    isIngredientDragged: boolean
    error: null | string
};

export type listOrders = {
    status: string
    success: boolean
    orders: TFeedOrder[] | []
    total: number
    totalToday: number
    connectionError: string | null
}

export type TOrder = {
    ingridients: IIngredient[],
    orderId: string[],
    isLoading: boolean,
    error: string
}

export type TCurrentIngridient = {
    currentIngridient: IIngredient | null
}

export type ICurrentIrder = {
    isLoadingCurrentOrder: boolean,
    errorCurrentOrder: null | string,
    currentOrder: TFeedOrder[]
}

export type TFormState = {
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

export type paramsAction = TConstructorIngridients | TIngridients | listOrders | TOrder | TCurrentIngridient | TFormState | ICurrentIrder;

export type paramsActions = Array<paramsAction>;
