import orderStyle from './order.module.css';
import modalStyle from '../Modal/modal.module.css';
// import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
// import  ModalOverlay from '../Modal/ModalOverlay';
import {useSelector } from 'react-redux';
import { useAppSelector } from '../../services/store';

type TOrderDetail = {
    onClose: () => void
}

const CurrentOrder = ({onClose}: TOrderDetail): React.JSX.Element => {
    const order = useAppSelector(state => state.checkout.orderId)

    return (
            <div className="body">
                <div className={`${modalStyle.row} ${orderStyle.numberOrder}`}>{order}</div>
                <div className={`${orderStyle.mt2} ${modalStyle.row} ${orderStyle.identificatorOrder}`}>идентификатор заказа</div>
                <div className={`${orderStyle.mt4} ${modalStyle.row}`}>
                    <span className={orderStyle.borderRadius}>
                        <div className={orderStyle.iconPosition}> <CheckMarkIcon type="primary" /></div>
                    </span>
                </div>
                <div className={`${orderStyle.mt4} ${modalStyle.row} ${orderStyle.infoOrder}`} data-cy="order-load">Ваш заказ начали готовить</div>
                <div className={`${modalStyle.row} ${orderStyle.infoOrderGet}`}> Дождитесь готовности на орбитальной станции</div>
            </div> 
    )
}

// CurrentOrder.propTypes = {
//     onClose: PropTypes.func
// }

export default CurrentOrder
