import orderStyle from './order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React, {useMemo, useState} from 'react';
import Modal from '../Modal/Modal';
import modalStyle from '../Modal/modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../Modal/ModalOverlay';
import OrderDetails from './OrderDetails';
import { postOrder } from '../../services/actions/orderAction';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../services/store';
import { IIngredient } from '../../types/types'; 


const Order = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const navigate = useNavigate()
    const user = useAppSelector( (state) => state.form.userInfo);

    const openModal = () => {
        if(!user) {
            navigate('/login')
        }
        
        setIsOpen(!isOpen);
        checkout();
    }

    const closeModal = () => {
        setIsOpen(!isOpen);
    }

    const constructorIngridients = useAppSelector( state => state.constructorIngridients.constructorIngridient)
    // const constructorIngridients = useAppSelector( state => state.constructorIngridients.constructorIngridient)
    const checkout = async () => {
        const ingridients_Id = constructorIngridients.ingridients.map( (value: IIngredient) => {
            return value._id
        })

        // переделать под чистую функцию!!!
        if(constructorIngridients.bun.length > 0) {
            constructorIngridients.bun.map( (ingridient: IIngredient) => {
                ingridients_Id.push(ingridient._id)
            })
            // ingridients_Id.push(constructorIngridients.bun?._id)
        }

        if (ingridients_Id.length > 0) {
           dispatch(postOrder(ingridients_Id));
        }

    }

    const disabledButton = constructorIngridients.bun.length === 0 ? true : false

    // const constructorIngridient = useSelector( state => state.ingridients.constructorIngridient)
   
    const totalSum = useMemo<number>( () => {
        let total = 0;
        let totalBun = 0
        let totalIngridients = 0;
        if(constructorIngridients.bun.length > 0) {
            constructorIngridients.bun.map( (ingridient: IIngredient) => {
                totalBun = ingridient.price * 2;
            })
            // totalBun = constructorIngridients.bun[0].price * 2 
        } 

        if(constructorIngridients.ingridients.length > 0) {
            totalIngridients =  constructorIngridients?.ingridients.reduce( 
                (sum: number, current: IIngredient) => sum + current.price, 0
            )
        }

        total = totalBun + totalIngridients;
        return total;
    }, [constructorIngridients])

    return (
        <div>
            <div className={orderStyle.container}>
                <div className={`${orderStyle.row} ${orderStyle.pricePosition}`}>
                    <span className={`${orderStyle.price}`}>
                        <span className={`${orderStyle.mr3}`}>
                            {totalSum} 
                        </span>
                        <span className={`${orderStyle.icon}`}>                            
                            <CurrencyIcon type="primary" />
                        </span>
                    </span>
                    <span className={orderStyle.button} data-cy="make-an-order-info">
                        <Button htmlType="button" disabled={disabledButton} type="primary" size="large" onClick={openModal}>
                            Оформить заказ
                        </Button>
                    </span>
                </div>

                {isOpen && <Modal onClose={closeModal} >
                    <>
                        <OrderDetails onClose={closeModal}></OrderDetails>
                    </>
                </Modal>}         
            </div>
        </div>
    )
}

export default Order