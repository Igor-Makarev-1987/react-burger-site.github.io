import React, {useEffect, useState} from 'react';
import AppHeader from '../Header/AppHeader';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import HomePage from "../../pages/home/home";
import LoginPage from '../../pages/login/login';
import ProfilePage from '../../pages/profile/profile';
import RegistraionPage from '../../pages/registration/registration';
import ResetPasswordPage from '../../pages/resetPassword/resetPassword';
import { ForgotPasswordPage } from '../../pages/forgotPassword/forgotPassword';
import NotFound404  from "../../pages/notFound/notFound404";
import { OrderPage } from '../../pages/orders/orders';
// import BurgerOrderCard from '../BurgerOrderCard/BurgerOrderCard';
import OrderCardPage  from "../../pages/orderCardPage/orderCardPage";
import Modal from '../Modal/Modal';
import IngredientDetails from '../Ingridients/IngredientDetails';
import { OnlyAuth, OnlyUnAuth } from "../ProtectedRouteElement/ProtectedRouteElement";
import { checkUserAuth } from '../../services/actions/formAction';
import { loadAllIngredients } from '../../services/actions/ingridientAction';
// import { getListAuthUserOrders } from "../../services/actions/orderListAction";
// import { getListUnAuthUserOrders } from "../../services/actions/orderListAction";
import { useAppDispatch, useAppSelector } from '../../services/store';
import BurgerCardExpanded from '../BurgerOrderExpanded/BurgerOrderExpanded';
import { FeedPage } from '../../pages/feed/feed';
import { WS_SOCKET, WS_SOCKET_USER } from '../../utils/const';
import { wsConnect } from '../../services/actions/listOrdersAction';
import { wsConnectUser } from '../../services/actions/userOrdersAction';
import { refreshToken } from '../../services/auth';


function App(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [isModal, setIsModal] = useState(true);
  const navigate = useNavigate()
  const location = useLocation();
  const background = location.state && location.state.background;
  // проверка
  // const accessToken = localStorage.getItem('accessToken') && localStorage.getItem('accessToken')?.replace('Bearer ', '');

  const closeModal = () => {
      setIsModal(false)
      navigate(-1)
  }

  const user = useAppSelector( store => store.form.userInfo);
  const success = useAppSelector(store => store.listOrderss.success);
  const orders = useAppSelector(store => store.listOrderss.orders);
  const successUser = useAppSelector(store => store.userOrders.success);
  const ordersUser = useAppSelector(store => store.userOrders.orders);
  useEffect ( () => {

    dispatch( loadAllIngredients() )
    dispatch( checkUserAuth() )
  }, [dispatch])
  return (
    <>
          <AppHeader />
          <Routes location={background || location}>
            <Route path='/' element={<HomePage />}></Route>
            <Route path="/login"  element={<OnlyUnAuth component={<LoginPage />} />} />
            <Route path="/profile" element={<OnlyAuth component={<ProfilePage activeTab="PROFILE" />}/>} />
            <Route path="/profile/orders" element={<OnlyAuth component={<OrderPage />} />} />
            <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderCardPage />} />}/>
            <Route path="/register" element={<OnlyUnAuth component={<RegistraionPage />}/>} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />}/>} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />}/>} />
            <Route path='/*' element={<NotFound404 />}></Route>
            <Route path="/feed" element={<FeedPage />}/>
            <Route path="/feed/:id" element={<OrderCardPage />}/>
            <Route path="/ingredients/:id" element={<IngredientDetails/>}></Route>
          </Routes>

          {background && (
            <Routes>
              <Route path="/ingredients/:id" element={
                <Modal onClose={closeModal}>                    
                    <IngredientDetails />
                </Modal>
              }></Route>
              {/* модальное окно выбранного заказа */}
                <Route path="/profile/orders/:id" element={
                  successUser && 
                  (<Modal onClose={closeModal} >                
                      <OnlyAuth component={<BurgerCardExpanded order={ ordersUser } />}/>
                  </Modal>)
                }></Route>
                {/* модальное окно выбранного заказа */}
                <Route path="/feed/:id" element={
                  success && 
                  (<Modal onClose={closeModal}>                    
                      <BurgerCardExpanded order={ orders }/>
                  </Modal>)
                }></Route>
            </Routes>
          )}


    </>
  );
}

export default App;
