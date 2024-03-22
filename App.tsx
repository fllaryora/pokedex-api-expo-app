
import { NavigationContainer } from '@react-navigation/native' 
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen'
import DetailsScreen from './screens/DetailScreen'
import { RootStackParamList } from './props';

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator
        initialRouteName = 'Home'

        screenOptions = {
        {
          headerBackTitle:  "",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: '#fff',
          headerTitle: "Podekex",
          headerTitleStyle: {
            fontWeight: "bold",
          },

        }
        }
      >

      <Stack.Screen component={HomeScreen} name='Home' options={{title:'Home'}}/>
      <Stack.Screen component={DetailsScreen} name='Details' options={{title:'Details'}}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}