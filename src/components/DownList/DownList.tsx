import downListStyle from './downList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { IIngredient } from '../../types/types';

function DownList(): React.JSX.Element {
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
      <div className={`${downListStyle.header} ${downListStyle.column}`}>
        {constructorIngridient.bun.length > 0 ? <ConstructorElement
                type="bottom"
                isLocked={true}
                text={name}
                price={price}
                thumbnail={image}
            /> 
                : 
              null
      }
      </div>
    )
}


export default DownList