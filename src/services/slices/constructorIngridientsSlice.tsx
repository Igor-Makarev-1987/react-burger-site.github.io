import {createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';
import { IIngredient, IIngredientDetail } from "../../types/types";

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

export const initialState: TConstructorIngridients = {
    constructorIngridient: {
        bun: [],
        ingridients: []
    },
    isLoading: false,
    error: null,
    isIngredientDragged: false,
}

const constructorIngridients = createSlice({
    name: 'constructorIngridients',
    initialState,
    reducers: {
        addIngridient: (state, action) => {
            let newConstructorIngridients;
            if(action.payload.type === 'bun') {
                // let size = Object.keys(state.constructorIngridient).length;
                // if(size > 0) {
                //     newConstructorIngridients = [...state.constructorIngridient.bun, action.payload]
                // } else {
                    newConstructorIngridients = [ action.payload ]
                // }

                state.constructorIngridient.bun = newConstructorIngridients         
            } else {
                // console.log(action.payload)
                state.constructorIngridient.ingridients = [
                    ...state.constructorIngridient.ingridients, action.payload
                    // {...action.payload, id:uuid()}
                ]
            }

            // сортируем добавленные ингридиенты
            // state.constructorIngridient.ingridients.sort( (a, b) => a._id.localeCompare(b._id))
        },

        // перетаскивание элемента
        moveIngredients: (state, action) => {
            // console.log(action.payload)
            const dragItem = state.constructorIngridient.ingridients[action.payload.dragIndex];
            // console.log(111)
            if (dragItem) {
              const copiedState = [...state.constructorIngridient.ingridients];

              // remove item by hover index and replace it with the dragItem
              const prevItem = copiedState.splice(
                action.payload.hoverIndex,
                1,
                dragItem
              );
              copiedState.splice(action.payload.dragIndex, 1, prevItem[0]);
      
              state.constructorIngridient.ingridients = [...copiedState];
            }
        },

        changeDraggingIngredientState: (state, action) => {
            state.isIngredientDragged = action.payload;
          },

        deleteIngridients: (state, action) => {
            state.constructorIngridient.ingridients.forEach( (value, index) => {
                if(value.id === action.payload) {
                    state.constructorIngridient.ingridients =  [
                        ...state.constructorIngridient.ingridients.slice(0, index),
                        ...state.constructorIngridient.ingridients.splice(index + 1)]
                }
            })
        }
    }
})

export const {
    addIngridient,
    moveIngredients,
    deleteIngridients,
    changeDraggingIngredientState
} = constructorIngridients.actions;
  
export default constructorIngridients.reducer;