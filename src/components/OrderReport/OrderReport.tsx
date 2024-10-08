import styles from "./orderReport.module.css";
import { TFeedOrder } from "../../types/types";
import { useAppSelector, useAppDispatch } from "../../services/store";

export const OrderReport = (): React.JSX.Element => {
    // исправить потом на listOrderss on listOrders
    const orders = useAppSelector( store => store.listOrderss.orders)
    const success = useAppSelector( store => store.listOrderss.success)
    const total = useAppSelector( store => store.listOrderss.total)
    const totalToday = useAppSelector( store => store.listOrderss.totalToday)

    const doneItems = orders && orders.filter( (item: TFeedOrder) => {
        return item.status === "done";
    });

    const proccessItems = orders && orders.filter((item: TFeedOrder) => {
        return item.status !== "done";
    });

    const separateItems = (items: TFeedOrder[]) => {
        const resultArr = [];
        const end = items.length / 10;

        for (let i = 0; i < end; i++) {
            resultArr.push([...items.splice(0, 10)]);
        }

        return resultArr;
    };

    const doneItemsArr = doneItems && separateItems(doneItems);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className="mr-9 mt-9">
                    <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                    <div className={styles.list_container}>
                        {doneItemsArr && doneItemsArr.map((item: TFeedOrder[], index: number) => {
                            return (
                                <ul key={index}>
                                    {item.map((child) => {
                                        return (
                                            <li
                                                key={child._id}
                                                className={`${styles.text} text text_type_digits-default mb-2`}
                                            >
                                                {child.number}
                                            </li>
                                        );
                                    })}
                                </ul>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                    <ul>
                        {proccessItems && proccessItems.map( (item:TFeedOrder) => {
                            return (
                                <li
                                    key={item._id}
                                    className={`${styles.text} text text_type_digits-default mb-2`}
                                >
                                    {item.number}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <h2 className="text text_type_main-medium mb-6">Выполнено за все время:</h2>
            <p className="text text_type_digits-large mb-15">{total}</p>
            <h2 className="text text_type_main-medium mb-6">Выполнено за сегодня:</h2>
            <p className="text text_type_digits-large">{totalToday}</p>
        </div>
    );
};