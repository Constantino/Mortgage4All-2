import * as React from 'react';
import { StyleSheet, Text, View, Appearance, StatusBar, Platform, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Provider, Surface } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import { theme } from '../core/theme';
import Item from '../core/item';
import List from '../core/list';

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: null,
    }
  }

  componentDidMount(){
    console.log('Home')
  }

  openItem(item){
    this.setState({selected: item})
  }

  render(){
    return(
        <View style={{flex:1, flexDirection:'row'}}>
          
          {this.state.selected?
          <Item item={this.state.selected}></Item>
          :<List openItem={this.openItem.bind(this)}></List>
          }

          <View style={{flex:1, justifyContent:'center'}}>
              <Image style={{height:'80%', width:'80%', alignSelf:'center', borderRadius:12}} resizeMode={'cover'} source={require('../srcassets/maps.png')}></Image>
          </View>
        </View>
    )
  }
}

export default Home;