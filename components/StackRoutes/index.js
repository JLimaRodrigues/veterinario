import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faHome, faCode } from '@fortawesome/free-solid-svg-icons';

import ProfileScreen from '../Screens/ProfileScreen';

export default function StackRoutes(){

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="home"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => <FontAwesomeIcon icon={faPlus} color={color} size={size}/>,
            tabBarLabel: 'Início'
          }}
        />
    
      </Stack.Navigator>
    )
}
