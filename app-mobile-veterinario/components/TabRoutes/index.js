import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faHome, faCode } from '@fortawesome/free-solid-svg-icons';

import HomeScreen from '../Screens/HomeScreen';

export default function StackRoutes(){

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen 
          name="home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faHome} color={color} size={size}/>,
            tabBarLabel: 'Início'
          }}
        />
    
      </Tab.Navigator>
    )
}