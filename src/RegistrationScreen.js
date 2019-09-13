import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {
    StyleSheet,
    View, Text, TextInput, TouchableOpacity, ToolbarAndroid, AsyncStorage, Picker
} from 'react-native';
const Realm = require('realm');
// Define your models and their properties
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
class RegistrationScreen extends Component {

    static navigationOptions = {
        title: 'Signup',
    };
    state = {
        fName: '',
        lName: '',
        mobile: '',
        email: '',
        locality: '',
        language : 'Java',
        selectedService: 'India',
        serviceItems: ['India', 'US', 'Lanka', 'Nepal', 'Bhutna', 'England']
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', margin: 0 }}>
                <View style={{ flexDirection: 'column', margin: 10 }}>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: .5 }}
                        placeholder="First Name" underlineColorAndroid='transparent'
                        onChangeText={(text) => this.fNameTextChnage(text)} />

                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: .5, marginTop: 20 }}
                        placeholder="Last Name" underlineColorAndroid='transparent'
                        onChangeText={(text) => this.lNameTextChnage(text)} />

                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: .5, marginTop: 20 }}
                        placeholder="Email Adress" underlineColorAndroid='transparent'
                        onChangeText={(text) => this.emailTextChnage(text)} />

                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: .5, marginTop: 20 }}
                        placeholder="Mobile Number" underlineColorAndroid='transparent'
                        onChangeText={(text) => this.mobileTextChnage(text)} />

                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: .5, marginTop: 20 }}
                        placeholder="Locatlity" underlineColorAndroid='transparent'
                        onChangeText={(text) => this.localityTextChnage(text)} />

                    <TouchableOpacity onPress={() => this.submitPressButton()} style={{ height: 40, marginTop: 10, backgroundColor: '#2E8B57' }}>
                        <Text style={{ color: 'white', textAlign: 'center', marginTop: 10, fontWeight: 'bold' }}>Submit</Text>
                    </TouchableOpacity>
                    <View>
                        <Text>Pick a country</Text>
                        <Picker
                             selectedValue={this.state.selectedService}
                             onValueChange={ (service) => ( this.setState({selectedService:service}) ) } >
         
                             {this.state.serviceItems}
                        </Picker>
                    </View>
                </View>
            </View>
        );
    }
    fNameTextChnage(text) {
        this.setState({ fName: text })
    }
    lNameTextChnage(text) {
        this.setState({ lName: text })
    }
    emailTextChnage(text) {
        this.setState({ email: text })
    }
    mobileTextChnage(text) {
        this.setState({ mobile: text })
    }
    localityTextChnage(text) {
        this.setState({ locality: text })
    }
    saveUserValues() {
        //  alert("Registered Successfully"+JSON.stringify(this.state))
        realm.write(() => {
            let charlie = realm.create('Person', {
                name: this.state.fName,
                lName: this.state.lName,
                email: this.state.email,
                mobile: this.state.mobile,
                locality: this.state.locality
            });
        });
        let Person = realm.objects('Person');
        alert("Registered Successfully" + JSON.stringify(Person))
    }
    submitPressButton() {
        var erroMessage = ''
        if (this.state.fName == '') {
            erroMessage = "Please Enter First Name"
        }
        else if (this.state.lName == '') {
            erroMessage = "Please Enter Last Name"
        }
        else if (this.state.email == '') {
            erroMessage = "Please Enter Email Address"
        }
        else if (this.state.mobile == '') {
            erroMessage = "Please Enter Mobile Number"
        }
        else if (this.state.locality == '') {
            erroMessage = "Please Enter Locality"
        }
        if (erroMessage !== '') {
            alert(erroMessage)
        } else {

            this.saveUserValues()
            this.props.navigation.goBack();
        }
    }


}
export default RegistrationScreen;