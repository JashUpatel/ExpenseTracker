import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// import common props for navigator
import NavigatorProps from '../assets/props/navigatorProps';
import Contact from '../components/Contact';


function ContactScreen() {
  return (
    <Contact />
  );
}

const Stack = createStackNavigator();

export default function contactNavigator() {
  return (
      <Stack.Navigator  screenOptions={NavigatorProps}> 
        <Stack.Screen name="Get in Touch" component={ContactScreen}
          options={
            ({navigation})=>({headerLeft: ()=>(
                            <Icon name='menu' size={32} color='#fff'
                              containerStyle={{marginHorizontal:20,fontWeight:'bold'}}
                              onPress={()=>navigation.toggleDrawer()}
                              />
              )
            }
            )
            
          } 
          
         />
      </Stack.Navigator>
   
  );
}

 