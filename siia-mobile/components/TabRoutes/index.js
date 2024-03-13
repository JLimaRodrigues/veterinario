import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faHome, faCode } from '@fortawesome/free-solid-svg-icons';

import HomeScreen from '../Screens/HomeScreen';
import EquipeScreen from '../Screens/EquipeScreen';

export default function TabRoutes(){

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "black" }}>
        <Tab.Screen 
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faHome} color={color} size={size}/>,
            tabBarLabel: 'Início'
          }}
        />
    
        <Tab.Screen 
          name="equipe"
          component={EquipeScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faCode} color={color} size={size}/>,
            tabBarLabel: 'Equipe'
          }}
        />
    
      </Tab.Navigator>
    )
}