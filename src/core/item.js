import * as React from 'react';
import { StyleSheet, Text, View, Appearance, StatusBar, Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Provider, Surface } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import { theme } from '../core/theme';

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width

import { Contract, ethers } from "ethers";
//import * as abi from "../values.json"

class Item extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      options: [{value: 10}, {value: 20}],
      option: 0,
      item: this.props.item
    }
  }

  async invest(){
    //console.log('abi_clean', abi['default'])
    console.log('abi', abi)
    const ethereum = window.ethereum
    console.log(ethereum)
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0]
    const signer = provider.getSigner(walletAddress);
    console.log(signer)
    //const gad = "0x63d0E83048402bDc8594714E248c29F75354149B"
    const polyad = "0x05C27DDD796F32549071c2cC464b086d25646d68"
    //const optad = ""
 
    //await MortgageContract.connect(owner).invest()
    const MortgageContract = new ethers.Contract(polyad, abi, signer)
    await MortgageContract.connect(signer).invest(0);
  }

  render(){
    return(
        <View style={{flex:0.8, justifyContent:'center'}}>
            <Surface style={{height:'90%', width:'80%', alignSelf:'center', borderRadius:12}}>
                <View style={{flex:1, flexDirection:'column'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Surface style={{flex:1, borderRadius:12, backgroundColor:theme.colors.backgroundLight, margin:5, justifyContent:'center'}}>
                    <Image style={{height:'80%', width:'80%', alignSelf:'center', borderRadius:12, justifyContent:'center'}} resizeMode={'contain'} source={require('../srcassets/huspic.png')}></Image>
                    </Surface>
                    <View style={{flexDirection:'column', flex:1}}>
                    <Surface style={{borderRadius:12, flex:1, margin:5, backgroundColor:theme.colors.backgroundLight, justifyContent:'center'}}>
                    <Image style={{height:'80%', width:'80%', alignSelf:'center', borderRadius:12}} resizeMode={'contain'} source={require('../srcassets/huspic.png')}></Image>
                    </Surface>
                    <Surface style={{borderRadius:12, flex:1, margin:5, backgroundColor:theme.colors.backgroundLight, justifyContent:'center'}}>
                    <Image style={{height:'80%', width:'80%', alignSelf:'center', borderRadius:12}} resizeMode={'contain'} source={require('../srcassets/huspic.png')}></Image>
                    </Surface>
                    </View>
                </View>
                <View style={{flex:0.6}}>
                    <Text style={{fontSize:width*0.04, color:theme.colors.blue, fontWeight:'bold', alignSelf:'center'}}>Title</Text>
                    <Text style={{fontSize:width*0.02, color:theme.colors.backgroundDark, alignSelf:'center'}}>${this.state.item.price}</Text>

                    <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                        <Surface style={{width:'20%', height:'80%', borderRadius:12, margin: 15, justifyContent:'center'}}>
                        <Picker
                            style={{flex:1, backgroundColor:theme.colors.yellow, borderWidth:0, borderRadius:12}}
                            //itemStyle = {{fontSize: 15}}
                            selectedValue={this.state.option}
                            onValueChange={(itemValue, itemIndex) =>
                            //console.log(itemIndex)
                            this.setState({option: itemIndex})
                            }>  
                            {this.state.options.map((item, index) => <Picker.Item label={'%' + item.value} value={item.value}/>)}
                        </Picker>
                        </Surface>
                        <Surface style={{backgroundColor:theme.colors.yellow, height:'80%', alignSelf:'center', width:'60%', borderRadius:12}}>
                            <TouchableOpacity onPress={()=>this.invest()}>
                            <Text style={{alignSelf:'center', color:theme.colors.blue, fontWeight:'bold', fontSize:width*0.02}}>Invest now</Text>
                            </TouchableOpacity>
                        </Surface>
                    </View>

                </View>
                </View>
            </Surface>
        </View>
        )
    }
}

export default Item;

const abi = [
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_mortgageId",
       "type": "uint256"
      }
     ],
     "name": "approveMortgage",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_mortgageId",
       "type": "uint256"
      }
     ],
     "name": "invest",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_mortgageId",
       "type": "uint256"
      }
     ],
     "name": "listMortgageRequest",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_mortgageId",
       "type": "uint256"
      }
     ],
     "name": "payMortgage",
     "outputs": [],
     "stateMutability": "payable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "_propertyValue",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "_mortgageAmount",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "_downPayment",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "_debtIncomeRatio",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "_area",
       "type": "uint256"
      },
      {
       "internalType": "uint256",
       "name": "_interestRate",
       "type": "uint256"
      },
      {
       "internalType": "int256",
       "name": "_latitude",
       "type": "int256"
      },
      {
       "internalType": "int256",
       "name": "_longitude",
       "type": "int256"
      }
     ],
     "name": "requestMortgage",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
    },
    {
     "inputs": [
      {
       "internalType": "uint256",
       "name": "id",
       "type": "uint256"
      }
     ],
     "name": "getMortgage",
     "outputs": [
      {
       "components": [
        {
         "internalType": "uint256",
         "name": "id",
         "type": "uint256"
        },
        {
         "internalType": "address",
         "name": "borrower",
         "type": "address"
        },
        {
         "internalType": "uint256",
         "name": "propertyValue",
         "type": "uint256"
        },
        {
         "internalType": "uint256",
         "name": "mortgageAmount",
         "type": "uint256"
        },
        {
         "internalType": "uint256",
         "name": "downPayment",
         "type": "uint256"
        },
        {
         "internalType": "uint256",
         "name": "debtIncomeRatio",
         "type": "uint256"
        },
        {
         "internalType": "uint256",
         "name": "area",
         "type": "uint256"
        },
        {
         "internalType": "uint256",
         "name": "interestRate",
         "type": "uint256"
        },
        {
         "components": [
          {
           "internalType": "int256",
           "name": "latitude",
           "type": "int256"
          },
          {
           "internalType": "int256",
           "name": "longitude",
           "type": "int256"
          }
         ],
         "internalType": "struct MortgageContract.Location",
         "name": "location",
         "type": "tuple"
        },
        {
         "internalType": "enum MortgageContract.Status",
         "name": "status",
         "type": "uint8"
        },
        {
         "internalType": "uint256",
         "name": "fund",
         "type": "uint256"
        }
       ],
       "internalType": "struct MortgageContract.Mortgage",
       "name": "",
       "type": "tuple"
      }
     ],
     "stateMutability": "view",
     "type": "function"
    }
   ]