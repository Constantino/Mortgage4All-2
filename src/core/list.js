import * as React from 'react';
import { StyleSheet, Text, View, Appearance, StatusBar, Platform, Dimensions, Image, TouchableOpacity, FlatList } from 'react-native';
import { Provider, Surface } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

import { theme } from '../core/theme';

export const height = Dimensions.get('window').height
export const width = Dimensions.get('window').width

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      houses: [{price: 100, title:'HOUSE1'}, {price: 400, title:'HOUSE2'}, {price: 600, title:'HOUSE3'}, {price: 45949, title:'HOUSE4'}],
    }
  }
  
  openItem(item){
    this.props.openItem(item)
  }

  render(){
    return(
        <View style={{flex:0.8, justifyContent:'center', backgroundColor:theme.colors.backgroundLight}}>

            <FlatList
                style={{flex: 0.8, margin: 20}}  
                data={this.state.houses}  
                scrollEnabled={true}
                numColumns={2}   
                //keyExtractor={item => item.id}    
                renderItem={({ item, index }) =>  
                  <View style={{flex:1, minHeight:'100%', width:'100%', flexDirection:'column', padding:10}}>
                     <TouchableOpacity onPress={()=>this.openItem(item)}>
                        <Surface style={{borderRadius:12}}><Image style={{height:height*0.2, width:'100%', alignSelf:'center', borderRadius:12}} resizeMode={'contain'} source={require('../srcassets/huspic.png')}></Image></Surface>
                    </TouchableOpacity>
                    <View><Text style={{color:'black', fontSize:width*0.02}}>${item.price}</Text></View>
                  </View>
                }
            />

        </View>
        )
    }
}

export default List;