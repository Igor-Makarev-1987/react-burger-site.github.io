import ingridientsSlice, {initialState} from "./ingridientsSlice";
import { loadAllIngredients } from "../actions/ingridientAction";

const mockIngredients = {
    ingridients:[
    {
      image: "https://code.s3.yandex.net/react/code/bun-02.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
      name: "Краторная булка N-200i",
      price: 1255,
      proteins: 80,
      type: "bun",
      _id: "643d69a5c3f7b9001cfa093c",
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      qty: 0,
    },
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      name: "Биокотлета из марсианской Магнолии",
      price: 424,
      proteins: 420,
      type: "main",
      _id: "643d69a5c3f7b9001cfa0941",
      qty: 0,
    },
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
      name: "Биокотлета из марсианской Магнолии",
      price: 424,
      proteins: 420,
      type: "main",
      _id: "643d69a5c3f7b9001cfa0941",
      qty: 0,
    }]
};


describe("loadAllIngredients reducer", () => {
    it("should return initial state", () => {
        expect(ingridientsSlice(undefined, {})).toEqual(initialState);
    });

    it("should populate loadAllIngredients and data if submission successful", async () => {
        const action = loadAllIngredients.fulfilled(mockIngredients)
        const actual = ingridientsSlice(initialState, action)
        expect(actual).toEqual({...initialState, isLoading: false, ingridients:mockIngredients.data})
    })

    it("should fail loadAllIngredients if submission failed", async () => {
        const action = loadAllIngredients.pending();
        const actual = ingridientsSlice(initialState, action)
        expect(actual).toEqual({...initialState, isLoading: true});

    })

    it("should loadAllIngredients rejected", async () => {
        const action = loadAllIngredients.rejected();
        const actual = ingridientsSlice(initialState, action)
        expect(actual).toEqual({...initialState, error: "Error, something went wrong. Contact support if problem persis"});
    })
});