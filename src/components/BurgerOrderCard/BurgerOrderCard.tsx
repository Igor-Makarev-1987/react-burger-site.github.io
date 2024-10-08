import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerOrderCard.module.css";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { TFeedOrder, IIngredient} from "../../types/types";
import { addIngredients } from "../../utils/addIngridient";
import { useAppDispatch, useAppSelector } from '../../services/store';

const BurgerOrderCard = ({ order }: { order: TFeedOrder }) => {
    const { createdAt, name, number, ingredients } = order;
    const maxLength = 5;
    
    const ingridientsData = useAppSelector(store => store.ingridients.ingridients);
    const orderIngredients = (ingredients && ingridientsData) && addIngredients<IIngredient, string>(ingridientsData, ingredients);

    const totalPrice = orderIngredients.reduce((acc: number, ingridient: IIngredient) => {
        let total = 0;
        if(ingridient.type === 'bun') {
            total = ingridient.price * 2
        } else {
            total = ingridient.price
        }

        return acc + total;
    }, 0);

    const iterateIngredients = (ingredients: IIngredient[]): JSX.Element[] => {
        return [...ingredients].map((item, index) => {
            return (
                <li key={index} className={styles.image_container}>
                    <img className={styles.image} alt={item.name} src={item.image} />
                </li>
            );
        });
    };

    const cropIngredients = (ingredients: IIngredient[]): JSX.Element[] | null => {
        if (ingredients.length <= maxLength) {
            return iterateIngredients(orderIngredients);
        } else {
            const slicedIngredients = ingredients.slice(0, maxLength + 1);
            const leftItemsLength = ingredients.length - slicedIngredients.length;

            const lastShownEl = leftItemsLength ? (
                <li key={ingredients.length} className={styles.image_container}>
                    <div className={`${styles.image_overlay} text text_type_main-default`}>
                        +{leftItemsLength}
                    </div>
                    <img src={ingredients[slicedIngredients.length] && ingredients[slicedIngredients.length].image}
                         className={styles.image}
                         alt=""
                    />
                </li>
            ) : null;

            const result = iterateIngredients(slicedIngredients);
            lastShownEl && result.push(lastShownEl);

            return lastShownEl
                ? result 
                : iterateIngredients(slicedIngredients);
        }
    };

    return (
        <div className={`${styles.card} pb-6 pt-6 pl-6 pr-6`}>
            <div className={styles.info}>
                <span className="text text_type_digits-default pb-6">#{number}</span>
                <span className="text text_type_main-default text_color_inactive">
                    {<FormattedDate date={new Date(createdAt)} />}
                </span>
            </div>
            <h2 className={`${styles.name} text text_type_main-medium mb-2`}>
                {name}
            </h2>
            <p className="text text_type_main-default mb-6"></p>
            <div className={styles.order_info}>
                <ul className={styles.ingredients_list}>
                    {cropIngredients(orderIngredients)}
                </ul>
                <p className={`${styles.price} text text_type_digits-default`}>
                    <span className="mr-2">{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </p>
            </div>
        </div>
    );
    };

export default BurgerOrderCard;