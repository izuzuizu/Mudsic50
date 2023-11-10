import { createAppContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'

import Login from './Login';
import Register from './Register';

const AppNavigator = createStackNavigator({
    Login: Login,
    Register: Register,
});

export default createAppContainer(AppNavigator);