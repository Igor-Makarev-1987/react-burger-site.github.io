import orderStyles from "./orders.module.css"
// import NavigationMenu from "../../components/navigation-menu/navigation-menu";
// import BurgerOrderList from "../../components/burger-order-list/burger-order-list";
import { useEffect } from "react";
// import { FEED_ORDER_CONNECT, FEED_ORDER_DISCONNECT } from "../../services/constants";
import { TProfilePageProps } from "../../types/types";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";
// import { getListAuthUserOrders } from "../../services/actions/orderListAction";
import BurgerOrderList from "../../components/BurgerOrderList/BurgerOrderList";
import { useAppSelector, useAppDispatch } from "../../services/store";
import { wsConnectUser, wsDisconnectUser } from "../../services/actions/userOrdersAction";
import { WS_SOCKET_USER } from "../../utils/const";

export const OrderPage = () => {
    // проверить и удалить в дальнейшем
    const dispatch = useAppDispatch();
    // useEffect( () => {
    //     dispatch(getListOrders())
    // }, [dispatch])

    useEffect(() => {
        const pureToken = localStorage.getItem("accessToken");
        const accessToken = pureToken?.replace("Bearer ","");
        dispatch( wsConnectUser(`${WS_SOCKET_USER}?token=${accessToken}`))

        return () => {
            dispatch(wsDisconnectUser())
        };
    }, [dispatch]);

    const orders = useAppSelector( store => store.userOrders.orders)

    return (
        <div className={orderStyles.main} >
            <div className={orderStyles.main__columnsWrapper}>
                <NavigationMenu activeTab="ORDERS" />
                <div className={orderStyles.main__columnRight}>
                <BurgerOrderList orders={orders} to="profile/orders" />
            </div>
            </div>
        </div>
    );
};