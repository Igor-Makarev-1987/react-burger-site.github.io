import React from "react";
import navigationMenuStyle from "./navigationMenu.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../services/store";
import { logoutUser } from "../../services/actions/logoutUserAction";

type TProfilePageProps= {
    activeTab: string
}

function NavigationMenu({ activeTab }: TProfilePageProps) {
    const PROFILE = "PROFILE";
    const ORDERS = "ORDERS";

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login', {replace: true});
    };

    return (
        <div className={navigationMenuStyle.main__columnLeft}>
            <p
            className={`${
                navigationMenuStyle.main__columnLeft__text
            } text text_type_main-medium ${
                activeTab === PROFILE ? "" : "text_color_inactive"
            }`}
            >
            <Link to="/profile">Профиль</Link>
            </p>
            <p
            className={`${
                navigationMenuStyle.main__columnLeft__text
            } text text_type_main-medium ${
                activeTab === ORDERS ? "" : "text_color_inactive"
            }`}
            >
            <Link to="/profile/orders">
                История заказов
            </Link>
            </p>
            <button
                onClick={handleLogout}
                className={`${navigationMenuStyle.logout_btn} text text_type_main-medium`}
            >
                Выход
            </button>
            {activeTab === PROFILE && (
            <span
                className={`text text_type_main-small text_color_inactive mt-30`}
            >
                В этом разделе вы можете изменить свои персональные данные
            </span>
            )}
        </div>
    )
}

export default NavigationMenu