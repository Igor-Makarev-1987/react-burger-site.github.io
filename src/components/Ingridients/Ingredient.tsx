import React, {useEffect, useState} from 'react';
import ingridientsStyle from './ingridients.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingridientPropTypes } from '../PropsTypes/validateIngridients';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import {changeDraggingIngredientState} from '../../services/slices/constructorIngridientsSlice';
import { useLocation, Link  } from 'react-router-dom';
import { useAppSelector,  useAppDispatch } from "../../services/store";
import { IIngredient, IDragObject } from '../../types/types';

type IIngredienttype =  {
    data: IIngredient
    onClick: () => void
}

type TDragCollectedProps = {
    isDrag: boolean
}

const Ingridient = ({data, onClick}: IIngredienttype): React.JSX.Element => {
    const dispatch = useAppDispatch()
    const [count, setCount] = useState<number | null>(null);
    const [{isDrag}, dragRef] = useDrag<IIngredient, unknown, TDragCollectedProps>({ 
        type: "ingridient",
        item: data,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })
    const location = useLocation();
    useEffect( () => {
        dispatch( changeDraggingIngredientState(isDrag) )
      }, [dispatch, isDrag])

    const handleClick = () => {
        onClick() // data
    }

    // выбранные ингридиенты
    const selectedIngredients = useAppSelector( state => state.constructorIngridients.constructorIngridient);
    // const {dat, isLoading, error} = useSelector( (state) => ({
    //     dat: state.ingridients.constructorIngridient,
    //     isLoading: state.ingridients.isLoading,
    //     error: state.ingridients.error
    // }));

    useEffect(() => {
        setCount(null);
        let count = null;
        let selBun = selectedIngredients.bun.filter( (ingridient: IIngredient) => ingridient._id === data._id)
        if(selBun.length > 0)  {
            setCount(2)
        }

        count = selectedIngredients.ingridients.filter((ingridient: IIngredient) => ingridient._id === data._id)
        if(count.length > 0 ) {
            setCount(count.length)
        }
    }, [selectedIngredients])

    return (
        <>
         <Link to={`/ingredients/${data._id}`}
               state= {{ background: location }}
               key={data._id}
               className={ingridientsStyle.link}
             >  
            <div className={ingridientsStyle.product}  onClick={() => handleClick} ref={dragRef} data-cy={`${data.name} title-ingridient`}>
                <div className={ingridientsStyle.card} >
                    <span className={`${ingridientsStyle.positionCount}`} >                    
                        <div className={ingridientsStyle.count} data-cy={`${data.name} counter`} >
                            {count && <Counter count={count} />}
                        </div>
                    </span>
                    <img className={ingridientsStyle.picture} src={data.image} />
                    <div className={ingridientsStyle.price}>{data.price} <span className={ingridientsStyle.icon}><CurrencyIcon type="primary" /></span></div> 
                    <div className={ingridientsStyle.price}>{data.name}</div> 
                </div>
            </div>
        </Link>
        </>
    )
  }

// Ingridient.propTypes = {
//     data: ingridientPropTypes.isRequired,
//     onClick: PropTypes.func
// }

export default Ingridient;