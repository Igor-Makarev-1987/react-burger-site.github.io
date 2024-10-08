import React, { useEffect } from "react";
import BurgerOrderList from "../../components/BurgerOrderList/BurgerOrderList";
import feedStyles from "./feed.module.css";
import { OrderReport } from "../../components/OrderReport/OrderReport";
// import { FEED_CONNECT, FEED_DISCONNECT } from "../../services/constants";
import { WS_SOCKET, WS_SOCKET_USER } from '../../utils/const';
import { wsConnect, wsDisconnect } from '../../services/actions/listOrdersAction';
import { useAppDispatch, useAppSelector } from "../../services/store";

export const FeedPage = () => {
    const orders = useAppSelector(store => store.listOrderss.orders);
    const success = useAppSelector(store => store.listOrderss.success);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch( wsConnect(WS_SOCKET))

        return () => {
            dispatch(wsDisconnect())
        };
    }, []);

    return (
        <div className={feedStyles.page_container}>
            <h2 className="text text_type_main-large mb-5">Лента заказов</h2>
            <div className={feedStyles.container}>
                <div className={`${feedStyles.list_container}`}>
                    {success && <BurgerOrderList orders={orders} to={"feed"} />}
                </div>
                <OrderReport />
            </div>
        </div>
        );
};