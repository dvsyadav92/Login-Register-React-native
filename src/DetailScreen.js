import React, { Component } from 'react';
import { Text,View,StyleSheet,ActivityIndicator} from 'react-native'
import { createStackNavigator, createAppContainer } from "react-navigation";
class DetailScreen extends Component{

      constructor(){
         super()
         this.state={
            isLoading:true,
            dataSource:null
         }
      }

    render(){
        const { navigation } = this.props;
        const name = navigation.getParam('name', 'NO-ID');
        const mobile = navigation.getParam('mobile', '88888888888');
        const email = navigation.getParam('email', '88888888888');
        const locality = navigation.getParam('locality', '88888888888');
        const lName = navigation.getParam('lName', '88888888888');
        return(
         <View style={{flex:1}}>
             {this.state.isLoading?
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicator size="large" color="#0000ff" style={{alignItems:'center',justifyContent:'center'}}  />
            </View>
            :
            <View >
                <Text style={styles.item}>
                   Name : {JSON.stringify(name)}
                </Text>
                <Text style={styles.item}>
                   Last Name  : {JSON.stringify(lName)}
                </Text>
                <Text style={styles.item}>
                   Mobile  : {JSON.stringify(mobile)}
                </Text>
                <Text style={styles.item}>
                   Email  : {JSON.stringify(email)}
                </Text>
                <Text style={styles.item}>
                   Locality  : {JSON.stringify(locality)}
                </Text>
            </View> 
             }
         </View>
        );
    }
    static navigationOptions = {
        title: 'Detail Screen',
      };

      componentDidMount(){
         fetch('https://reqres.in/api/users')
         .then((response) => response.json())
         .then((responseJson) => {
            console.log("RESPONSE= "+responseJson)
           this.setState({
             isLoading: false,
             dataSource: responseJson,
           }, function(){
              alert(JSON.stringify(this.state.dataSource));
           });
   
         })
         .catch((error) =>{
           console.error(error);
         });
      }
}

const styles=StyleSheet.create({ item:{padding : 10,fontSize : 12 , color : 'black'},})
export default DetailScreen