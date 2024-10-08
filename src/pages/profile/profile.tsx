import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useCallback, useEffect, useState, FormEvent } from "react";
import { Link, replace, useNavigate } from "react-router-dom";

import { ProfileInputs } from "../../components/ProfileInput/ProfileInput";
import { logoutUser } from "../../services/actions/logoutUserAction";
import profileStyle from "./profile.module.css";
import { getUserParam } from "../../services/actions/formAction";
import { setUserData } from "../../services/actions/formAction";
import { useAppSelector, useAppDispatch } from "../../services/store";
import NavigationMenu from "../../components/NavigationMenu/NavigationMenu";

type TProfilePageProps= {
    activeTab: string
}


function ProfilePage({ activeTab }: TProfilePageProps) {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");
    const [dataIsChanged, setDataIsChanged] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const user = useAppSelector( (state) => state.form.userInfo);

    type TSetInitialState = () => void;

    const setInitialState = useCallback<TSetInitialState>(() => {
        if (user && user.name && user.email) {
          setName(user.name);
          setLogin(user.email);
          setPassword("");
          setDataIsChanged(false);
        }
    }, [user]);

    useEffect(() => {
        setInitialState();
    }, [setInitialState]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (dataIsChanged) {
            dispatch(setUserData({
                    name,
                    email: login,
                    password,
                })
                );
          } else {
            alert("Data was not changed!");
          }
    };

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login', {replace: true});
    };

    useEffect( () => {
        dispatch(getUserParam())
    }, [dispatch])

      const cancelNewData = () => {
        setInitialState();
      };

      const PROFILE = "PROFILE";
      const ORDERS = "ORDERS";

    return (
           <form className={profileStyle.main} onSubmit={handleSubmit}>
                <div className={profileStyle.main__columnsWrapper}>
                    {/* убрано по причене замены на компонент */}
                {/* <div className={profileStyle.main__columnLeft}>
                    <p
                    className={`${
                        profileStyle.main__columnLeft__text
                    } text text_type_main-medium ${
                        activeTab === PROFILE ? "" : "text_color_inactive"
                    }`}
                    >
                    <Link to="/profile">Профиль</Link>
                    </p>
                    <p
                    className={`${
                        profileStyle.main__columnLeft__text
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
                        className={`${profileStyle.logout_btn} text text_type_main-medium`}
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
                </div> */}
                <NavigationMenu activeTab="PROFILE"></NavigationMenu>
                <div className={profileStyle.main__columnRight}>
                    {activeTab === PROFILE ? (
                    <>
                        <ProfileInputs
                        name={name}
                        setName={setName}
                        login={login}
                        setLogin={setLogin}
                        password={password}
                        setPassword={setPassword}
                        setDataIsChanged={setDataIsChanged}
                        />
                        <div
                        className={`mt-15 ${
                            dataIsChanged
                            ? `${profileStyle.footer__btns}`
                            : `${profileStyle.footer__btns_hidden}`
                        }`}
                        >
                        <div className={`${profileStyle.footer__btnsWrapper}`}>
                            <Button
                            onClick={cancelNewData}
                            htmlType="button"
                            type="secondary"
                            size="medium"
                            >
                            Отменить
                            </Button>
                            <Button htmlType="submit" type="primary" size="medium">
                            Сохранить
                            </Button>
                        </div>
                        </div>
                    </>
                    ) : (
                        ""
                    )}
                </div>
                </div>
            </form> 
    )
} 

export default ProfilePage;