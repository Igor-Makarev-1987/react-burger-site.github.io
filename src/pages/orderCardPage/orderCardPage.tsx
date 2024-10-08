import { useEffect } from "react";
import BurgerCardExpanded from "../../components/BurgerOrderExpanded/BurgerOrderExpanded";
import orderCardPageStyles from "./orderCardPage.module.css";
import { useParams } from "react-router-dom";
import { TFeedOrder, IIngredient} from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { getOrders } from "../../services/actions/orderListAction";

const OrderCardPage = (): React.JSX.Element => {
    const { id }= useParams<{id: string}>();
    const dispatch = useAppDispatch();
    // const listOrders = useAppSelector(store => store.listOrderss);
    // const orderPage = (listOrders && id) && listOrders.orders.find( (item: TFeedOrder) => {
    //     return item.number === id
    // })
    const order = useAppSelector( state => state.listOrders.currentOrder)

    useEffect(() => {
        if (id) {
            dispatch(getOrders(id));
        }
    }, []);

    return (
        <>
            {
                order  &&
                <div className={orderCardPageStyles.container}>
                    <BurgerCardExpanded order={ order }/>
                </div>
            }
        </>
    );
};

export default OrderCardPage