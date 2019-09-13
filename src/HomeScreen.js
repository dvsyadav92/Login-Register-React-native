import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList,Image,TouchableOpacity } from 'react-native'
import { createStackNavigator, createAppContainer,DrawerNavigator } from "react-navigation";
import DetailScreen from './DetailScreen'
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
let Person
let userData = []
class HomeScreen extends Component {
  state = {
    userData: []
  }
  constructor() {
    super()
  }

  componentDidMount() {
    Person = realm.objects('Person');
    // let keys = Person.keys();
    let userData = []
     for(let i=0; i< Person.length-1;i++ ){
      userData.push(Person[i+""]);
     }

    // userData = Object.values(Person);
    // userData = Array.prototype.slice.call(Person)
    // alert('data:- ' + JSON.stringify(userData)+" "+Person.length)

    this.setState({ userData: userData }, () => {

      // this.showUserList()
    })

  }

  showUserList() {
    // let Person = realm.objects('Person');
    // alert("Registered Successfully" + JSON.stringify(this.state.userData) + " length " + this.state.userData.length + " obj" + Person)
  }

  static navigationOptions = {
    title: 'Home',
  };
  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column', textAlign: 'center' }}>
        <Text style={{ textAlign: 'center', fontSize: 20 }}>
          Welcome in Home Screen
            </Text>
        <FlatList  
                    data={
                       this.state.userData 
                    }  
                    renderItem={({item}) => (
                       <TouchableOpacity onPress={this.getListViewItem.bind(this, item)}>
                      <View style={styles.container}>
                         <Image source={{ uri: 'https://picsum.photos/id/237/200/300' }} style={styles.photo} />
                       <View style={styles.container_text}>
                        <Text style={styles.title}  
                              >Name : {item.name+ " "+item.lName}</Text>
                              <Text
                                >Mobile No : 
                                {item.mobile}
                              </Text>
                              <Text
                               >Email Id : 
                                {item.email}
                              </Text>
                              <Text
                               >Locality : 
                                {item.locality}
                              </Text>
                              </View>
                    </View>
                    </TouchableOpacity>
                    )}   
                />  
      </View>
    );
  }
  getListViewItem=(item)=>{
      this.props.navigation.navigate('Details',item);
  }
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      padding: 10,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#FFF',
      elevation: 2,
  },
  title: {
      fontSize: 16,
      color: '#000',
  },
  container_text: {
      flex: 1,
      flexDirection: 'column',
      marginLeft: 12,
      justifyContent: 'center',
  },
  description: {
      fontSize: 11,
      fontStyle: 'italic',
  },
  photo: {
      height: 50,
      width: 50,
  },
});

export default HomeScreen