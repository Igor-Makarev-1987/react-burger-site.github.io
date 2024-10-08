import listStyle from './list.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingridientPropTypes } from '../PropsTypes/validateIngridients';
import { deleteIngridients, moveIngredients } from '../../services/slices/constructorIngridientsSlice';
import { useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import PropTypes from 'prop-types';
import { IIngredientDetail } from "../../types/types";
import { useAppDispatch } from '../../services/store';
import type { Identifier } from "dnd-core";
import { IDragObject } from '../../types/types';

type TList = {
  data: IIngredientDetail
  orderIndex: number
}

interface DragItem {
  orderIndex: number;
  id: number | undefined;
  type: string;
}

const List = ({data, orderIndex}: TList): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const ACCEPTED_TYPE = "selectedIngredient";
    const ref = useRef<HTMLDivElement>(null);
    const [, dragRef] = useDrag<TList, unknown, {isDragging: boolean}>({
        type: ACCEPTED_TYPE,
        item: { data, orderIndex },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

    const [, drop] = useDrop<DragItem, unknown, { handlerId: Identifier | null }>({
        accept: ACCEPTED_TYPE,
        hover(item: DragItem) {
          if (!ref.current) {
            return;
          }

          const dragIndex = item.orderIndex;
          const hoverIndex = orderIndex;

          if (dragIndex === hoverIndex) {
            return;
          }
console.log(333)
          if (dragIndex !== undefined && hoverIndex !== undefined) {
            dispatch(moveIngredients({ dragIndex, hoverIndex }));
            item.orderIndex = hoverIndex;
          }
        },
      });

    dragRef(drop(ref));

    const handleIngredientRemoval = (id: number | undefined) => () => {
      // console.log(id)
        dispatch(deleteIngridients(id));
    };
    return (
 
        <div ref={ref} className={`${listStyle.row} ${listStyle.constructorElement}`} data-cy="constructor-inside">
            <span className={`${listStyle.paramsWidth} ${listStyle.cursor}`} >
                <DragIcon type="primary" ></DragIcon>
                <ConstructorElement
                    text={data.name}
                    price={data.price}
                    thumbnail={data.image}
                    handleClose={handleIngredientRemoval(data?.id)}
                ></ConstructorElement>
            </span>
        </div>
    )
}

List.propTypes = {
    // data: ingridientPropTypes.isRequired,
    // orderIndex: PropTypes.number.isRequired,
  }

export default List; 