import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from '../TabRoutes';
import StackRoutes from '../StackRoutes';

const Drawer = createDrawerNavigator();

export default function Main(){
  return (
 <NavigationContainer>
  <Drawer.Navigator screenOptions={{
    title: ''
  }}
  >
        <Drawer.Screen 
          name="home"
          component={TabRoutes}
          options={{
            drawerLabel: 'Início'
          }}
        />

        <Drawer.Screen 
          name="profile"
          component={StackRoutes}
          options={{
            drawerLabel: 'Meu Perfil'
          }}
        />
    </Drawer.Navigator>
 </NavigationContainer>
  )
}