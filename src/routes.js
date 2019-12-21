import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

import Conversor from './pages/Conversor';
import Coin from './pages/Coin';
import Relatorio from './pages/Relatorio';

const Routes = createAppContainer(createSwitchNavigator({
    Conversor: Conversor ,
    Coin:  Coin ,
    Relatorio: Relatorio,
}));


export default Routes;
