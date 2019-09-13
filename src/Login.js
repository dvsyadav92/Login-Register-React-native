import React, {Component} from 'react';
import RegistrationScreen from './RegistrationScreen'
import HomeScreen from './HomeScreen'
import Detail from './DetailScreen'
import UiExamplesScreen from './UiExamples'
import TabContainer from './tbs/TabContainer'
// import { Ionicons } from '@expo/vector-icons'; 
import { createStackNavigator, createAppContainer ,DrawerNavigator,createDrawerNavigator} from "react-navigation";
import {
    StyleSheet,
    View,Text, TextInput, TouchableOpacity, ToolbarAndroid
  } from 'react-native';
  const Realm = require('realm');
  const PersonSchema = {
    name: 'Person',
    properties: {
      name: 'string',
      lName: 'string',
      email: 'string',
      mobile: 'string',
      locality: 'string'
    }
  };
  
  let realm = new Realm({ schema: [PersonSchema], schemaVersion: 2 });
  class Login extends Component{
    static navigationOptions = {
      title: 'Login',
    };
    state={
        email:'',
        password:''
    }
    render(){
        return(
            <View style={{flex: 1, flexDirection: 'column', margin:0}}>

            {/* <ToolbarAndroid  title="Login" titleColor="black" actions={[{title: 'Settings', icon: require('../icons/settings.png'), show: 'always'},{title: 'Notification', icon: require('../icons/notification.png'), show: 'always'}]} onActionSelected={this._onPressButton} style={{height: 60, backgroundColor:'#b6b9bf'}}/> */}

         <View style={{flexDirection:'column' , margin :10}}>
            <TextInput style={{height: 40, borderColor:'gray', borderWidth: .5}}
                placeholder="Email address" underlineColorAndroid='transparent'
                onChangeText={(text)=>this.emailTextChnage(text)}/>

            <TextInput style={{height: 40, borderColor:'gray', borderWidth: .5, marginTop:20}}
                placeholder="Password" secureTextEntry={true} underlineColorAndroid='transparent'
                onChangeText={(text)=>this.passTextChnage(text)}/>

            <TouchableOpacity onPress={()=>this.loginPressButton()} style={{ height: 40, marginTop: 10 , backgroundColor: '#2E8B57'}}>
                <Text style={{color: 'white', textAlign: 'center', marginTop: 10, fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>

            <Text style={{margin:10,fontSize:12,color:'black',textAlign:'center'}}>
              OR
            </Text>
            <TouchableOpacity style={{height:40,marginTop:10,backgroundColor:"#2E8B57"}} onPress={()=>this.onSignUpClick()} >
            <Text style={{margin:10,color:'white',textAlign:'center',fontWeight:'bold'}}>
              Registration
            </Text>
            </TouchableOpacity>

            <TouchableOpacity  onPress={()=>this.UiExampleClick()} style={styles.btnStyle}>
              <Text style={{textAlign: 'center',margin : 10}}>UI Example</Text>
            </TouchableOpacity>
             <TouchableOpacity  onPress={()=>this.tabExampleClick()} style={styles.btnStyle}>
              <Text style={{textAlign: 'center',margin : 10}}>TAB Example</Text>
            </TouchableOpacity>
            </View>
       </View>
        );
    }

    UiExampleClick(){
      this.props.navigation.navigate("UiExample")
    }

   tabExampleClick(){
      this.props.navigation.navigate("TabContainer")
    }
    _onPressButton(position) {
        alert('You tapped the button!'+position)
      }

      loginPressButton() {
          if(this.state.password == "" && this.state.email==""){
            alert("Please enter email & password")
          }else if(this.state.password==""){
            alert("Please enter Password")
          }else if(this.state.email==""){
            alert("Please enter Email")
          }else{
            if(this.isValidUser())
            this.props.navigation.navigate('HomeScreen');
            else
            alert("Please enter Valid email id")
          }
        
      }

      isValidUser(){
      
        Person = realm.objects('Person');
            // alert(Person["0"].email)
        for(let i=0; i< Person.length-1;i++ ){
          console.log("email= "+Person[i+""].email)
          if(Person[i+""].email===this.state.email){
          return true
          }
        }
        return false
      }

      emailTextChnage(value){
          this.setState({email:value});
      }
      passTextChnage(value){
        this.setState({password:value});
    }
    onSignUpClick(){
     this.props.navigation.navigate('Registration');
    }
  }
  const AppNavigator = createStackNavigator({
    Home: {
      screen: Login
    },
    Registration: {screen: RegistrationScreen},
    HomeScreen:{screen:HomeScreen},
    Details:{screen:Detail},
    UiExample:{screen : UiExamplesScreen},
    TabContainer : {screen : TabContainer}
  });


  const styles=StyleSheet.create({
        btnStyle:{ 
        marginTop : 20,
        borderColor:'#d9d9d9',
        borderWidth : 1,
        borderBottomWidth : 5,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        }
      }
    }
  );
  export default createAppContainer(AppNavigator);
