import burdgerOrderExpendedStyles from "./burgerOrderExpanded.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedOrder, IIngredient, TFeedOrderCurrentOpened } from "../../types/types";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { addIngredients } from "../../utils/addIngridient";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../../services/store';


type TBurgerOrderParams = {
    name: string,
    price: string,
    image: string,
    _id: string
}

const BurgerCardExpanded = (props: { order: [] | TFeedOrder[]}): React.JSX.Element | null => {
    // new code
    const listOrders = useAppSelector(store => store.listOrderss);
    const { id } = useParams<{id: string}>()
    const  currentOpened  = props.order && id ? props.order.find( (item: TFeedOrder) => item.number ===  Number(id) ) : null
    const ingridientsData = useAppSelector(store => store.ingridients.ingridients);
    const orderIngredients = (currentOpened && ingridientsData) && addIngredients<IIngredient, string>(ingridientsData, currentOpened?.ingredients);
    
    const totalPrice: number | null | undefined  = orderIngredients && orderIngredients.reduce(
        (acc: number, ingridient: IIngredient) => {
            let total = 0;
            if(ingridient.type === 'bun') {
                total = ingridient.price * 2
            } else {
                total = ingridient.price
            }

        return acc + total;
        }, 0
    );

    const accObject: Record<string, number> = {};

    currentOpened?.ingredients.forEach((item: string) => {
        if (accObject[item] === undefined) {
            accObject[item] = 1;
        } else {
            accObject[item]++;
        }
    });

    const set = [...new Set<IIngredient>(orderIngredients)];

    const generateMarkup = (element: TFeedOrder, totalPrice: number | null | undefined)  => {
        const {
            name,
            number,
            createdAt,
        } = element;

        return (
            <>
               <div className={burdgerOrderExpendedStyles.container}>
                <p
                    className={`mb-10 text text_type_digits-default ${burdgerOrderExpendedStyles.order_number}`}
                >
                    #{currentOpened?.number}
                    </p>
                <h2 className="mb-3 text text_type_main-medium">{currentOpened?.name}</h2>
                <p className={`mb-15 text text_type_main-default ${burdgerOrderExpendedStyles.status}`}>
                    {currentOpened?.status === "done" ? "Выполнен" : null}
                </p>
                <p className="mb-6 text text_type_main-medium">Состав:</p>
                <ul className={`${burdgerOrderExpendedStyles.list} mb-10 custom-scroll`}>
                    {set.map(({ name, price, image, _id }, index): React.JSX.Element => {
                        return (
                            <li key={index} className={`${burdgerOrderExpendedStyles.item} mb-4`}>
                                <img src={image} alt="" />
                                <p className={`${burdgerOrderExpendedStyles.name} text text_type_main-default`}>
                                    {name}
                                </p>
                                    <p className={burdgerOrderExpendedStyles.price}>
                                    <span className="text text_type_digits-default">
                                        {accObject[_id]} x {price}
                                    </span>
                                    <CurrencyIcon type="primary" />
                                </p>
                            </li>
                        );
                    })}
                </ul>
                <div className={burdgerOrderExpendedStyles.info_column}>
                    <span className="text text_type_main-default text_color_inactive">
                        {<FormattedDate date={new Date(currentOpened?.createdAt!)} />}
                    </span>
                    <span className={burdgerOrderExpendedStyles.price}>
                        <span className="text text_type_digits-default">{totalPrice}</span>
                        <CurrencyIcon type="primary" />
                    </span>
                </div>
                </div>
            </>
        )
    }

    const modalBody = currentOpened && generateMarkup(currentOpened, totalPrice)

    return (
        // <div className={burdgerOrderExpendedStyles.container}>
        //     <p
        //         className={`mb-10 text text_type_digits-default ${burdgerOrderExpendedStyles.order_number}`}
        //     >
        //     #{currentOpened?.number}
        //     </p>
        // <h2 className="mb-3 text text_type_main-medium">{currentOpened?.name}</h2>
        // <p className={`mb-15 text text_type_main-default ${burdgerOrderExpendedStyles.status}`}>
        //     {currentOpened?.status === "done" ? "Выполнен" : null}
        // </p>
        // <p className="mb-6 text text_type_main-medium">Состав:</p>
        // <ul className={`${burdgerOrderExpendedStyles.list} mb-10 custom-scroll`}>
        //     {set.map(({ name, price, image, _id }, index): JSX.Element => {
        //         return (
        //             <li key={index} className={`${burdgerOrderExpendedStyles.item} mb-4`}>
        //                 <img src={image} alt="" />
        //                 <p className={`${burdgerOrderExpendedStyles.name} text text_type_main-default`}>
        //                     {name}
        //                 </p>
        //                     <p className={burdgerOrderExpendedStyles.price}>
        //                     <span className="text text_type_digits-default">
        //                         {accObject[_id]} x {price}
        //                     </span>
        //                     <CurrencyIcon type="primary" />
        //                 </p>
        //             </li>
        //         );
        //     })}
        // </ul>
        // <div className={burdgerOrderExpendedStyles.info_column}>
        //     <span className="text text_type_main-default text_color_inactive">
        //         {<FormattedDate date={new Date(currentOpened?.createdAt!)} />}
        //     </span>
        //     <span className={burdgerOrderExpendedStyles.price}>
        //         <span className="text text_type_digits-default">{totalPrice}</span>
        //         <CurrencyIcon type="primary" />
        //     </span>
        // </div>
        // </div>

        <>
            {modalBody}
        </>
    );
};

export default BurgerCardExpanded