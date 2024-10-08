import fetchMock from "fetch-mock";
import { API_BASE } from "../../utils/const";
import checkoutReducer, { checkout, initialState} from "./orderSlice"
import { postOrder } from "../actions/orderAction";
import { store } from "../store";
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store'

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

const mockOrder = {
    orderId : {
        name: "Краторный люминесцентный антарианский бургер",
        order: {
            createdAt: "2023-05-30T14:26:34.128Z",
            ingredients: [
                {
                    calories: 643,
                    carbohydrates: 85,
                    fat: 26,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    proteins: 44,
                    type: "bun",
                    _id: "643d69a5c3f7b9001cfa093d",
                    qty: 1,
                    key: "1",
                },
                {
                    calories: 30,
                    carbohydrates: 40,
                    fat: 20,
                    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
                    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                    name: "Соус Spicy-X",
                    price: 90,
                    proteins: 30,
                    type: "sauce",
                    _id: "643d69a5c3f7b9001cfa0942",
                    qty: 1,
                    key: "2",
                },
                {
                    calories: 643,
                    carbohydrates: 85,
                    fat: 26,
                    image: "https://code.s3.yandex.net/react/code/bun-01.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
                    name: "Флюоресцентная булка R2-D3",
                    price: 988,
                    proteins: 44,
                    type: "bun",
                    _id: "643d69a5c3f7b9001cfa093d",
                    qty: 1,
                    key: "3",
                },
            ],
            name: "Флюоресцентный spicy бургер",
            number: 6131,
            owner: {
                name: "test",
                email: "coi44977@omeie.com",
                createdAt: "2023-04-26T12:02:46.281Z",
                updatedAt: "2023-04-26T12:02:46.281Z",
            },
            price: 2066,
            status: "done",
            updatedAt: "2023-05-30T14:26:34.278Z",
            _id: "6476079a8a4b62001c850944",
        },
        success: true
    }
};

const mockOrders = {
    createdAt: "2023-05-30T14:26:34.128Z",
    ingredients: [
        {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            _id: "643d69a5c3f7b9001cfa093d",
            qty: 1,
            key: "1",
        },
        {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            proteins: 30,
            type: "sauce",
            _id: "643d69a5c3f7b9001cfa0942",
            qty: 1,
            key: "2",
        },
        {
            calories: 643,
            carbohydrates: 85,
            fat: 26,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            name: "Флюоресцентная булка R2-D3",
            price: 988,
            proteins: 44,
            type: "bun",
            _id: "643d69a5c3f7b9001cfa093d",
            qty: 1,
            key: "3",
        },
    ],
    name: "Флюоресцентный spicy бургер",
    number: 6131,
    owner: {
        name: "test",
        email: "coi44977@omeie.com",
        createdAt: "2023-04-26T12:02:46.281Z",
        updatedAt: "2023-04-26T12:02:46.281Z",
    },
    price: 2066,
    status: "done",
    updatedAt: "2023-05-30T14:26:34.278Z",
    _id: "6476079a8a4b62001c850944",
};

const mockResp = {
    success: true,
    orderId: {
        order: {     
            number: 1,
        }
    },
};

describe("order reducer", () => {
    it("should return initial state", () => {
        expect(checkoutReducer(undefined, {})).toEqual(initialState);
    });

    it("should populate order and data if submission successful", async () => {
        const action = postOrder.fulfilled(mockResp)
        const actual = checkout.reducer(initialState, action)
        expect(actual).toEqual({...initialState, isLoading: false, orderId:mockResp.orderId.order.number})
    })

    it("should fail order if submission failed", async () => {
        const action = postOrder.pending();
        const actual = checkout.reducer(initialState, action)
        expect(actual).toEqual({...initialState, isLoading: true});

    })

    it("should postOrder rejected", async () => {
        const action = postOrder.rejected();
        const actual = checkout.reducer(initialState, action)
        expect(actual).toEqual({...initialState, error: "Error, something went wrong. Contact support if problem persis"});
    })
});