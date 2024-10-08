import currentOrderSlice, {initialState} from "./currentOrderSlice";
import { getOrders } from "../actions/orderListAction";

const mockOrders = {
    orders: {
        orders: {
                createdAt: "2024-10-03T07:42:09.122Z",
                ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e', '643d69a5c3f7b9001cfa093d'],
                name: "Флюоресцентный люминесцентный бургер",
                number: 54892,
                owner: "66f507cd119d45001b509791",
                status: "done",
                updatedAt: "2024-10-03T07:42:09.944Z",
                _id: "66fe4ad107cc0b001c1d576c"
            }
        }
    }


describe("getOrders reducer", () => {
    it("should return initial state", () => {
        expect(currentOrderSlice(undefined, {})).toEqual(initialState);
    });

    it("should populate getOrders and data if submission successful", async () => {
        const action = getOrders.fulfilled(mockOrders)
        const actual = currentOrderSlice(initialState, action)
        expect(actual).toEqual({...initialState, isLoadingCurrentOrder: false, currentOrder:mockOrders.orders.orders})
    })

    it("should fail getOrders if submission failed", async () => {
        const action = getOrders.pending();
        const actual = currentOrderSlice(initialState, action)
        expect(actual).toEqual({...initialState, isLoadingCurrentOrder: true});

    })

    it("should getOrders rejected", async () => {
        const action = getOrders.rejected();
        const actual = currentOrderSlice(initialState, action)
        expect(actual).toEqual({...initialState, errorCurrentOrder: "Error, something went wrong. Contact support  current orders auth user"});
    })
});