import React, { Component } from 'react';
import ListItem from './ListItem'
import { View, Text, StyleSheet, ScrollView, Image, Button, TouchableOpacity, Modal, FlatList,ActivityIndicator } from 'react-native'
import { createStackNavigator, createAppContainer, DrawerNavigator, createDrawerNavigator } from "react-navigation";
class UiExamples extends Component {

    constructor() {
        super()
        this.state = {
            counter: 1,
            diaLogVisible: false,
            dataSource: [],
            isLoading: true,
        }
    }

    calBacMethod=()=>{

    }
    componentDidMount() {
        return fetch('https://api.github.com/users')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function () {
                    console.log("RESPONSE= " + JSON.stringify(responseJson))
                });

            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        return (
            !this.state.isLoading ?
                <View style={styles.container}>
                    <ScrollView>
                        <MyAppText>This is Demo for UI</MyAppText>

                        <View style={{ flexDirection: 'column' }}>
                            <FlatList
                                data={this.state.dataSource}
                                renderItem={({ item }) => <ListItem key= {item.id+""} itemData={item} callBackMethod={this.calBacMethod}></ListItem>} />
                        </View>
                    </ScrollView>
                </View>
                :
                <View style={{flex : 1,alignItems : 'center',justifyContent : 'center'}}>
                    {/* <MyAppText >Data is loading</MyAppText> */}
                    <CustomProgressBar></CustomProgressBar>
                </View>
        )
        // }
    }
    static navigationOptions = {
        title: 'User Listing'
    };

}
const CustomProgressBar = ({ visible }) => (
    <Modal onRequestClose={() => null} visible={visible} transparent={true}>
      <View style={{ flex: 1,  alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ borderRadius: 10, backgroundColor: '#D2D2CD', padding: 25 }}>
          <Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      </View>
    </Modal>
  );
export default UiExamples
class MyAppText extends Component {

    render() {
        return (
            <View>
                <Text style={styles.title}>{this.props.children}</Text>
            </View>
        );
    }

}

