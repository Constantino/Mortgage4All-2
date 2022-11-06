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
        wallet: false,
    }
  }

    async componentDidMount(){
        console.log('Landing') 
        new GetCov().getData()
    }

    async send(){
        // You'll want to replace this with a wallet from your application
        const wallet = Wallet.createRandom()
        // Create the client with your wallet. This will connect to the XMTP development network by default
        const xmtp = await Client.create(wallet)
        // Start a conversation with XMTP
        const conversation = await xmtp.conversations.newConversation(
            '0x3F11b27F323b62B159D2642964fa27C46C841897'
        )
        // Load all messages in the conversation
        const messages = await conversation.messages()
        
        // Send a message
        await conversation.send('gm')
        // Listen for new messages in the conversation
        
        /*try {
            for await (const message of await conversation.streamMessages()) {
                console.log(`[${message.senderAddress}]: ${message.content}`)
            }
        } catch (error) {
            console.log(error)
        }*/
        await conversation.streamMessages().then(message => {
            console.log(message)
        })
        
    }

    openHome(){
        this.props.navigation.navigate('Home')
        //console.log('HEEJJEJEJEJE')
    }

    openDash(){
        this.props.navigation.navigate('Dashboard')
        //console.log('HEEJJEJEJEJE')
    }

    connect(){

    }

  onChangeText = (text) => {
    console.log(text)
  }

  render(){
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <View style={{position:'absolute', zIndex:1, top:0, height:height*0.5, width:width, flexDirection:'column', justifyContent:'center'}}>
                    <Text style={{fontSize:width*0.04, color:'white', fontWeight:'bold', alignSelf:'center'}}>Discover new opportunities</Text>
                    <View style={{flexDirection:'row', alignSelf:'center', width:'30%', justifyContent:'center', margin:30}}>
                        <TextInput
                            style={{borderRadius:12, backgroundColor:'white', borderColor:theme.colors.yellow, borderWidth:2, alignSelf:'center', padding:15, width:'100%'}}
                            {...this.props} 
                            onChangeText={this.onChangeText}  
                            value={this.state.search}
                            placeholder="Search locations"
                            keyboardType="twitter"
                            mode='flat' 
                            multiline={false} 
                            selectionColor={theme.colors.yellow}
                        />
                        <Icon style={{alignSelf:'center'}} color={theme.colors.white} size={width*0.04} name={"magnify"}/>
                    </View>
                </View>
                <Image style={{height:'100%', width:width, alignSelf:'center'}} resizeMode={'cover'} source={require('../srcassets/house.png')}></Image>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                <Surface style={{borderRadius:12, marginRight:10}}>
                    <TouchableOpacity onPress={()=>this.openHome()}>
                        <Text style={{fontSize:width*0.04, color:theme.colors.blue, fontWeight:'bold', alignSelf:'center', padding:40}}>Find a deal</Text>
                    </TouchableOpacity>
                </Surface>

                <Surface style={{borderRadius:12, marginLeft:10}}>
                    <TouchableOpacity onPress={()=>this.openDash()}>
                        <Text style={{fontSize:width*0.04, color:theme.colors.blue, fontWeight:'bold', alignSelf:'center', padding:40}}>Dashboard</Text>
                    </TouchableOpacity>
                </Surface>
            </View>
        </View>
    )
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