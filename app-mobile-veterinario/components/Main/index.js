import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBasketShopping, faHandshake } from '@fortawesome/free-solid-svg-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabRoutes from '../TabRoutes';
import ProdutosScreen from '../Screens/ProdutosScreen';
import CarrinhoScreen from '../Screens/CarrinhoScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServicosScreen from '../Screens/ServicosScreen';

const Drawer = createDrawerNavigator();
const Stack  = createNativeStackNavigator();

export default function Main(){

  DrawerScreen = () => {
    return(
      <Drawer.Navigator screenOptions={{
        title: ''
      }}
      >
            <Drawer.Screen 
              name="home"
              component={TabRoutes}
              options={{
                drawerIcon: ({ color, size }) => (<FontAwesomeIcon icon={faHome} color={color} size={size} />),
                drawerLabel: 'Início'
              }}
            />

            <Drawer.Screen 
              name="produtos"
              component={ProdutosScreen}
              options={{
                drawerIcon: ({ color, size }) => (<FontAwesomeIcon icon={faBasketShopping} color={color} size={size} />),
                drawerLabel: 'Produtos'
              }}
            />

            <Drawer.Screen 
              name="servicos"
              component={ServicosScreen}
              options={{
                drawerIcon: ({ color, size }) => (<FontAwesomeIcon icon={faHandshake} color={color} size={size} />),
                drawerLabel: 'Serviços'
              }}
            />
            
        </Drawer.Navigator>
    )
  }
  
  return (
    <NavigationContainer>
      {/* <DrawerScreen /> */}

      <Stack.Navigator>
        <Stack.Screen name="voltar" component={DrawerScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="carrinho" component={CarrinhoScreen}/>
      </Stack.Navigator>

    </NavigationContainer>
  )
}