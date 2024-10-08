import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";

type TProtectedRoute = {
  onlyUnAuth: boolean;
  component: React.JSX.Element;
};

const ProtectedRoute = ({ onlyUnAuth = false, component}: TProtectedRoute) => {
  // isAuthChecked это флаг, показывающий что проверка токена произведена
  // при этом результат этой проверки не имеет значения, важно только,
  // что сам факт проверки имел место.
  const isAuthChecked = useAppSelector((store) => store.form.isAuthChecked);
  const user = useAppSelector((store) => store.form.userInfo);
  // console.log(user)
  // console.log(isAuthChecked)
  const location = useLocation();
//   console.log(isAuthChecked)
    // console.log(user)
  if (!isAuthChecked) {
    // Запрос еще выполняется
    // Выводим прелоадер в ПР
    // Здесь возвращается просто null для экономии времени
    return null;
  }
  // console.log(onlyUnAuth )
  // console.log(user)
  if (onlyUnAuth && user) {
    // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя

  return component;
};

type TProtectedProps = Pick<TProtectedRoute, "component">;

export const OnlyAuth = ({component}: TProtectedProps) => (
  <ProtectedRoute onlyUnAuth={false} component={component} />
);
export const OnlyUnAuth = ({ component }: TProtectedProps) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);