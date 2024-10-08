import {useEffect} from "react"
import modalStyle from '../Modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useAppSelector } from "../../services/store"; 
import { IIngredient } from "../../types/types";

const IngredientDetails = (): React.JSX.Element | null => {
    const data = useAppSelector( state => state.viewedIngridient.currentIngridient)
    const { id } = useParams()
    const ingridients  = useAppSelector( (state) => state.ingridients.ingridients)
    
    const currentIngridient = id ? ingridients.find((item: IIngredient) => {
        return item._id === id
    }) : data;
    console.log(currentIngridient)
    // проверить на тип данных
    const generateMarkup = (element: IIngredient)  => {
        const {
            image_mobile,
            name,
            calories,
            carbohydrates,
            proteins,
            fat
        } = element;

        return (
            <>
                <div className={`${modalStyle.mt4} ${modalStyle.title} ${modalStyle.row}`} data-cy="title">
                                            Детали ингридиента 
                    </div>
                <div className="body">
                    <img className={modalStyle.picture} src={image_mobile} alt={name}/>
                    <div className={modalStyle.nameProduct} data-cy="ingredient title">{name}</div>
                    <div className={modalStyle.rowPherments}>
                        <span>
                            <div className={modalStyle.fontPermentsName}>Каллорий,ккал</div>
                            <div className={modalStyle.fontPermentsNumber}>{calories}</div>
                        </span>
                        <span>
                            <div className={modalStyle.fontPermentsName}>Белки, г</div>
                            <div className={modalStyle.fontPermentsNumber}>{carbohydrates}</div>
                        </span>
                        <span>
                            <div className={modalStyle.fontPermentsName}>Жиры, г</div>
                            <div className={modalStyle.fontPermentsNumber}>{fat}</div>
                        </span>
                        <span>
                            <div className={modalStyle.fontPermentsName}>Углеводы, г</div>
                            <div className={modalStyle.fontPermentsNumber}>{proteins}</div>
                        </span>
                    </div>
                </div> 
            </>
        )
    }
    const modalBody = currentIngridient && generateMarkup(currentIngridient)

    return <>
            {modalBody}
        </>        
    
}

//IngredientDetails.propTypes = {
    // data: ingridientPropTypes.isRequired,
    // closeModal: PropTypes.func,
//}

export default IngredientDetails