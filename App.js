import * as React from 'react';
import { StyleSheet, Text, View, Appearance, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-native-paper';
import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'

import { NavigationContainer, /*DefaultTheme, DarkTheme*/ } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Landing from './src/components/Landing';
import Home from './src/components/Home';
import Dashboard from './src/components/Dashboard';

function getLibrary(provider){
  return new Web3(provider)
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  componentDidMount(){
    console.log('HEJJ')
  }

  render(){
    return(
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider>
        <NavigationContainer>
          <Stack.Navigator initialRoutname="Landing">

            <Stack.Screen  
              name="Landing"
              component={Landing} 
              options={{ headerShown: false }}
            />

            <Stack.Screen  
              name="Home" 
              component={Home} 
              options={{ headerShown: false }}
            />

            <Stack.Screen  
              name="Dashboard" 
              component={Dashboard} 
              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        </NavigationContainer>
        </Provider>
      </Web3ReactProvider>
    )
  }
}

export default App;

/*export default function App() {
  console.log('HEJJ')
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
