import React, {useEffect} from 'react';
import appStyles from '../../components/app/app.module.css';
import AppBurgerIngredients from '../../components/BurgerIngredients/AppBurgerIngredients'
import AppBurgerConstructor from '../../components/BurgerConstructor/AppBurgerConstructor';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

function HomePage(): React.JSX.Element {

  return (
    <div className={appStyles.layout}>
      <main className={`${appStyles.mt12} ${appStyles.center}`}>
        <DndProvider backend={HTML5Backend}>
          <AppBurgerIngredients />
          <AppBurgerConstructor />
        </DndProvider>  
      </main>
    </div>
  );
}

export default HomePage;