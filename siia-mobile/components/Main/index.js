import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from '../TabRoutes';

const Drawer = createDrawerNavigator();

export default function Main(){
  return (
 <NavigationContainer>
  <Drawer.Navigator>
        <Drawer.Screen 
          name="home"
          component={TabRoutes}
          options={{
            drawerLabel: 'Início'
          }}
        />
    </Drawer.Navigator>
 </NavigationContainer>
  )
}