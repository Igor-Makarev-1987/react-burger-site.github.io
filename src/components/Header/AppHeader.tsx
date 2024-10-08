import headerStyles from './header.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from "react-router-dom";

function AppHeader(): React.JSX.Element {
    return (
        <header className={headerStyles.layout}>
            <div className={headerStyles.container}>
                <div className={headerStyles.row}>
                    <span className={`${headerStyles.vertical} ${headerStyles.typography}`}>
                        {/* <NavLink className={({isActive}) => isActive ? "active-class": "non-active-class" } > </Navlink> */}
                        <NavLink to="/" className={({isActive}) => isActive ? headerStyles.active : headerStyles.nonactive}>
                            <BurgerIcon type="primary" /> <span className={`${headerStyles.pl6}`}>Конструктор</span>
                        </NavLink>
                    </span>
                    <span className={`${headerStyles.vertical} ${headerStyles.typography}`}>
                        <NavLink to="/feed" className={({isActive}) => isActive ? headerStyles.active : headerStyles.nonactive}>
                            <ListIcon type="secondary" /> <span className={`${headerStyles.pl6}`}>Лента заказов</span>
                        </NavLink>
                    </span>
                    <Logo />
                    <span className={`${headerStyles.vertical} ${headerStyles.typography}`}>
                        <div className={`${headerStyles.textlink}`}>
                            <NavLink to="/profile" className={({isActive}) => isActive ? headerStyles.active : headerStyles.nonactive}>
                                <ProfileIcon type="secondary"/> <span className={`${headerStyles.pl6}`}>Личный кабинет</span>
                            </NavLink>
                        </div>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;