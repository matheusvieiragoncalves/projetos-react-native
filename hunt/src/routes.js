import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'; //navegação por cliques

import Main from './pages/main';
import Product from './pages/products';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main: {
        screen: Main,
        navigationOptions: {
          title: 'JSHunt',
        },
      },

      Product: {
        screen: Product,
      },
    },
    {
      defaultNavigationOptions: {
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#DA552F',
        },
      },
    }
  )
);

export default Routes;
