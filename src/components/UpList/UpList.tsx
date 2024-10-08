import upListStyle from './upList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
// import { IConstructorIngridient } from "../../types/types";
// import type { RootState, AppDispatch } from '../../services/store';
import { useAppSelector } from '../../services/store';
import { IIngredient } from '../../types/types';
 
function UpList() {
let name = '';
let price = 0;
let image = '';
const constructorIngridient = useAppSelector( state => state.constructorIngridients.constructorIngridient)
// const constructorIngridient = useAppSelector( state => {
//   return state.constructorIngridients.constructorIngridient
// })

if(constructorIngridient.bun.length > 0) {
  constructorIngridient.bun.map( (ingridient: IIngredient) => {
    name = ingridient.name;
    price = ingridient.price;
    image = ingridient.image;
  }
)}

return (       
  <div className={`${upListStyle.header} ${upListStyle.column}`}>
            {constructorIngridient.bun.length > 0 ? 
                      <ConstructorElement
                          type="top"
                          isLocked={true}
                          text={name}
                          price={price}
                          thumbnail={image}
                          extraClass="constructor-ingredient-data-cy"
                      /> 
                            : 
                          null
}
</div>
  )
}


export default UpList