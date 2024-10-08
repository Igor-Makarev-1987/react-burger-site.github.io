import constructorIngridients, {initialState, addIngridient, moveIngredients, changeDraggingIngredientState, deleteIngridients} from "./constructorIngridientsSlice";

const mockOrders = {
    constructorIngridient: {
        bun: [{
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
            id: "0c20a268-f5e7-4cf5-9613-ef10b38b6a33" 
            }
        ],
        ingridients: [
            {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            id: "0c20a268-f5e7-4cf5-9613-ef10b38b6a72"
        },
        {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            id: "cc5e1bf6-6186-4fc8-91cd-6fec533cce03",
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            proteins: 30,
            type: "sauce",
            __v: 0,
            _id: "643d69a5c3f7b9001cfa0942",
            id: "cc5e1bf6-6186-4fc8-91cd-6fec533cce03"
        }]
    }
};

const mockDeleteIngridient = {
    constructorIngridient:{
        ingridients: [
            {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:"https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            id: "0c20a268-f5e7-4cf5-9613-ef10b38b6a72"
            
        },
        {
            calories: 30,
            carbohydrates: 40,
            fat: 20,
            id: "cc5e1bf6-6186-4fc8-91cd-6fec533cce03",
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            name: "Соус Spicy-X",
            price: 90,
            proteins: 30,
            type: "sauce",
            __v: 0,
            _id: "643d69a5c3f7b9001cfa0942",
            
        }],
    },
    // isLoading: false,
    // error: null,
    // isIngredientDragged: false,
}

const ingridient = {
        _id: "60d3b41abdacab0026a733c8",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile:
          "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
}

const mockAddIngridient = {
    constructorIngridient: {
        bun: [],
        ingridients: [
            {...ingridient, id:"0c20a268-f5e7-4cf5-9613-ef10b38b6a72"}
        ]
    },
}
    

describe("currentIngridient reducer", () => {
    
    it("should return initial state", () => {
        expect(constructorIngridients(undefined, {})).toEqual(initialState);
    });

    it("should return constructorIngridients", () => {
        const expectedState = { ...initialState, constructorIngridient: mockAddIngridient.constructorIngridient};
        expect(constructorIngridients(initialState, addIngridient({...ingridient, id:"0c20a268-f5e7-4cf5-9613-ef10b38b6a72"}))).toEqual(expectedState)
    } )

    it("should return changeDraggingIngredientState", () => { 
        const expectedState = { ...initialState, isIngredientDragged: true};
        expect(constructorIngridients(initialState, changeDraggingIngredientState(true))).toEqual(expectedState)
    } )

    it("should handle removeIngredient", () => {
        const mockedIngredients = [
          {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
            id: "cc5e1bf6-6186-4fc8-91cd-6fec533cce03",
          },
          {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
            id: "0c20a268-f5e7-4cf5-9613-ef10b38b6a72"
          },
        ];
        const action = {
          type: "constructorIngridients/deleteIngridients",
          payload: "cc5e1bf6-6186-4fc8-91cd-6fec533cce03",
        };
        const newState = constructorIngridients(
          {
            ...initialState,
            constructorIngridient: { ingridients: mockedIngredients },
          },
          action
        );
        expect(newState.constructorIngridient.ingridients).toEqual([mockedIngredients[1]]);
      });

    it("should moveIngredients", () => {
        const mockedMoveIngredients = [
          {
            _id: "60d3b41abdacab0026a733c7",
            name: "Флюоресцентная булка R2-D3",
            type: "bun",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
            __v: 0,
          },
          {
            _id: "60d3b41abdacab0026a733c8",
            name: "Филе Люминесцентного тетраодонтимформа",
            type: "main",
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: "https://code.s3.yandex.net/react/code/meat-03.png",
            image_mobile:
              "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
            __v: 0,
          },
        ];
    
        const action = {
          type: "constructorIngridients/moveIngredients",
          payload: { dragIndex: 0, hoverIndex: 1 },
        };
        const newState = constructorIngridients(
          {
            ...initialState,
            constructorIngridient: { ingridients: mockedMoveIngredients },
          },
          action
        );
        expect(newState.constructorIngridient.ingridients).toEqual([
            mockedMoveIngredients[1],
            mockedMoveIngredients[0],
        ]);
      });
});