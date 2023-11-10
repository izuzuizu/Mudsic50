import { createStackNavigator } from '@react-navigation/stack'
import Login from '../backend/Login';


const Stack = createStackNavigator()

export default function stacks() {
    return (
            <Stack.Screen 
            name="login"
            component={Login}
            options={{title: "iniciar sesion..."}}/>
    )
}