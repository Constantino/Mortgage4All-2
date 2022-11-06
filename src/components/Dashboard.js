import * as React from 'react';
import { StyleSheet, Text, View, Appearance, StatusBar, Platform, SafeAreaView, Image, Dimensions, TextInput, Button, TouchableOpacity } from 'react-native';
import { Provider, Surface } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { injected } from "../wallet/connectors"

import { theme, colors } from '../core/theme';      

import { NavigationContainer, /*DefaultTheme, DarkTheme*/ } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width

import { Client } from '@xmtp/xmtp-js'
import { Wallet } from 'ethers'

import GetCov from '../core/GetCov';

class Landing extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        cov: null,
    }
  }

    async componentDidMount(){
        console.log('Dash') 
        await new GetCov().getData().then((res)=>{
            //this.setState({cov: res})
            console.log(res)
        })
    }

  render(){
    /*return(
        <View style={{flex:1}}>
            <Text>Today: {this.state.cov[0]} Week: {this.state.cov[1]} Month: {this.state.cov[2]} Current:{this.state.cov[3]}</Text>
        </View>
    )*/
  }
}

export default Landing;





/*<View style={{flex:1}}>
                <Text style={{fontSize:width*0.02, color:theme.colors.blue, fontWeight:'bold'}}>Explore newly listed homes</Text>
                <Button title='PRESS ME' onPress={()=>this.send()}></Button>
                <View style={{height:20}}></View>
                <Button title='CONNECT TO META MASK' onPress={()=>this.connect()}></Button>
                <Text style={{fontSize:width*0.02, color:theme.colors.blue, fontWeight:'bold'}}>{this.state.wallet?'CONNECTED':'NOT CONNECTED'}</Text>
    </View>*/