import burgerConstructorStyle from './burgerConstructor.module.css';
import UpList from '../UpList/UpList';
import List from '../List/List';
import DownList from '../DownList/DownList';
import Order from '../Order/Details';
import listStyle from '../List/list.module.css';
import PropTypes from 'prop-types';
import { ingridientPropTypes } from '../PropsTypes/validateIngridients';
import {addIngridient} from '../../services/slices/constructorIngridientsSlice';
import {useDrop} from 'react-dnd';
import { v4 as uuid } from 'uuid';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { IIngredientDetail } from "../../types/types";
import type { Identifier } from "dnd-core";


function BurgerConstructor(): React.JSX.Element {
    // const {data, isLoading, error} = useSelector( (state) => (state.ingridients.constructorIngridient
    //  убрано по причине warning
    //     {
    //     data: state.ingridients.constructorIngridient,
    //     isLoading: state.ingridients.isLoading,
    //     error: state.ingridients.error
    // }
    // ));
    const {constructorIngridient, isLoading, error} = useAppSelector( (state) => state.constructorIngridients);
    const isIngredientDragged = useAppSelector( (state) => state.constructorIngridients.isIngredientDragged);
    const dispatch = useAppDispatch();

    const [, dropRef] = useDrop<IIngredientDetail, unknown, { handlerId: Identifier | null }>({
        accept: 'ingridient',
        drop(item) {
          console.log("ttt", item);
          dispatch(addIngridient({...(item as object), id:uuid()}))
        } 
    })

    const outline = isIngredientDragged ? "1px dashed lightgreen" : "transparent";
    // перенос в constructorIngridient
    // const constructorIngridient = useSelector( state => state.ingridients.constructorIngridient)

    return (
        <div className={burgerConstructorStyle.container} ref={dropRef} data-cy="constructor">
            <>
                <UpList></UpList>
                <>
                    <div className={listStyle.container} >
                        <div className={`${listStyle.scroll} ${burgerConstructorStyle.column}`} style={{outline}}>
                            {!isLoading && constructorIngridient.ingridients && constructorIngridient.ingridients.map( 
                                (component: IIngredientDetail, index) => <List data={component} key={component.id} orderIndex={index}></List>
                            )}
                        </div>
                    </div>
                </>
                <DownList></DownList>
                <Order></Order>
            </>
        </div>
    )
}

// проверка на типизацию
// BurgerConstructor.propTypes = {
    // data: PropTypes.shape({
    //     success: PropTypes.bool,
    //     data: PropTypes.arrayOf( ingridientPropTypes.isRequired)
    // }),
    // isLoading: PropTypes.bool.isRequired,
    // hasError: PropTypes.bool.isRequired
// }


export default BurgerConstructor
