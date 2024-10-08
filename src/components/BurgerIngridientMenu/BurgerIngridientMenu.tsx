import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import burgerIngredientsMenu from './burgerIngridientMenu.module.css';
//   убрано по причине переноса на typescript
// import PropTypes from 'prop-types';
import {IProps, NAV_TYPES } from "../../types/types";

const Menu = (props: IProps): React.JSX.Element => {
    const [current, setCurrent] = useState('buns')
    const handleClick = (param: string) => {
        setCurrent(param)
    }

    return (
        <div className={burgerIngredientsMenu.container}>
            <Tab value="buns" active={NAV_TYPES.BUNS === props.current} onClick={() => handleClick(NAV_TYPES.BUNS)}>
                Булки
            </Tab>
            <Tab value="sauces" active={NAV_TYPES.SAUCES === props.current} onClick={() => handleClick(NAV_TYPES.SAUCES)}>
                Соусы
            </Tab>
            <Tab value="fillings" active={NAV_TYPES.FILLINGS === props.current} onClick={() => handleClick(NAV_TYPES.FILLINGS)}>
                Начинки
            </Tab>
        </div>
    )
  }

//   убрано по причине переноса на typescript
// Menu.propTypes = {
//     current: PropTypes.string.isRequired,
// }

  export default Menu;