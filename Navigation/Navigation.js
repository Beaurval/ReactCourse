import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Search from '../Components/Search'
import Text from "react-native-web/dist/exports/Text";

const Stack = createStackNavigator();


function Navigation() {


    return (
        <Stack.Navigator>
            <Stack.Screen name="Rechercher" component={Search}/>
        </Stack.Navigator>
    )


}

export default Navigation
