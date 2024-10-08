import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import BurgerOrder from "./burger-order/burger-order";
import burgerOrderListStyles from "./burgerOrderList.module.css";
import { TFeedOrder } from "../../types/types";
import BurgerOrderCard from "../BurgerOrderCard/BurgerOrderCard";

type TProps = {
    orders: TFeedOrder[];
    to: string;
};

const BurgerOrderList = (orders: TProps): JSX.Element | null => {
    const location = useLocation();
    return orders.orders ? (
        <ul className={`${burgerOrderListStyles.order_list} ml-15 custom-scroll`}>
            {orders.orders.map((item) => {
                return (
                    item && (
                        <li
                            className={`${burgerOrderListStyles.item} mb-6`}
                            key={item._id}
                        >
                            <Link
                                to={`/${orders.to}/${item.number}`}
                                state={{ background: location }}
                                key={item._id}
                            >
                                <BurgerOrderCard order={item} />
                            </Link>
                        </li>
                    )
                );
            })}
        </ul>
    ) : null;
};

export default BurgerOrderList;