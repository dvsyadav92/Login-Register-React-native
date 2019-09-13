import React, {Component} from 'react';
import {View, Text,StyleSheet,ScrollView,Image,Button,TouchableOpacity,Modal} from 'react-native'
export default class ListItem extends Component{

    constructor(props){
        super(props)
        this.state={
            counter:1,
            diaLogVisible:false,
            dataSource :this.props.itemData,
            isLoading: true,
        }
        // alert(JSON.stringify(this.props.itemData))
    }

    render(){
        return(
            <View>
                <TouchableOpacity onPress={()=>alert("clicked")} style={{borderRadius : 10,elevation : 8, marginBottom:15}}>
                <View style={{flexDirection : 'column'}}>
                    <View style={styles.block1}>
                        <Image style={{width :90,height : 90}}  source={{uri:this.state.dataSource.avatar_url}} />
                        <View style={{flexDirection : 'column',margin : 10}}>
                            <Text style={{fontWeight : 'bold',fontSize : 20,color : 'red'}}>
                                It's content title
                            </Text>
                            <Text style={{fontWeight : 'bold',fontSize : 14,color : 'black'}}>
                                It's content detail
                            </Text>
                        </View>
                       
                    </View>

                    <Text style={{margin : 10}}>
                        It's comtent belowo of the Image
                    </Text>
                    <View style={{flexDirection : 'row',justifyContent : 'space-between', padding : 10}}>
                        <TouchableOpacity style={styles.btnStyle} onPress={ () => { this.Show_Custom_Alert(!this.state.diaLogVisible)}}>
                            <Text style={{color : 'white'}}> show Info </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnStyle} onPress={this.onBtnPress}>
                        <Text style={{color : 'white'}} >Do Action</Text>  
                        </TouchableOpacity> 
                    </View>
                    <Modal
                        visible={this.state.diaLogVisible}
                        transparent={true}
                        animationType={"fade"}
                        onRequestClose={ () => { this.Show_Custom_Alert(!this.state.diaLogVisible)} } >
                              <View style={{ flex:1, alignItems: 'center',backgroundColor :'#000000E6' , justifyContent: 'center' }}>
                            <View style={styles.Alert_Main_View}>
                                <Text style={{marginTop : 20, fontWeight : 'bold',fontSize : 18}}>Custome DialogBox title</Text>
                                <View style={{flex : 1,flexDirection : 'row',width: '90%', alignItems : 'center',justifyContent: 'space-around'}}>
                                    <TouchableOpacity style={styles.btnStyle} onPress={()=>this.Show_Custom_Alert(!this.state.diaLogVisible)}>  
                                    <Text style={{color: 'white'}}>OKAY</Text> 
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.btnStyle} onPress={()=>this.Show_Custom_Alert(!this.state.diaLogVisible)}>  
                                    <Text style={{color: 'white'}}>Cancel</Text> 
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </View>
                    </Modal>
                    </View>
                    </TouchableOpacity>
            </View>
        );
    }

    Show_Custom_Alert(visible){
        this.setState({diaLogVisible:visible})
    }
onBtnPress=()=>{
  let temp=this.state.counter+1;
  this.setState({counter:temp});
  alert("Btn Pressed")
}
onTextPress(){
  alert("Text clicked")
}
}
styles=StyleSheet.create({
    title :{
        color : 'red',
        fontSize : 20,
        fontWeight : 'bold',
    
    },
    detail:{
        color : 'black',
        fontSize : 18,
    },
    container : {
        margin : 20,
        backgroundColor : '#f5f5f0',
        flexDirection : "column",
        alignContent  : "space-around",
        position : "relative"
    },
    block1 : {
        flexDirection : 'row',
        backgroundColor : '#ccccb3',
        padding :10,
    },
    block2 : {
        width : 100,
        height : 50,
        backgroundColor : 'yellow'
    },
    block3 : {
        width : 100,
        height : 50,
        backgroundColor : 'red'
    },
    btnStyle:{
        backgroundColor : '#3d3d29',
        borderWidth :2,
        color : 'white',
        shadowColor : '#2e2e1f',
        padding : 5,
        borderRadius : 4
    },
    MainContainer :{
    
 flex:1,
 justifyContent: 'center',
 alignItems: 'center',
 marginTop: (Platform.OS == 'ios') ? 20 : 0,
 backgroundColor : 'red'
 
},
 
Alert_Main_View:{
  alignItems: 'center',
  justifyContent: 'space-around',
  backgroundColor : "#E4E4DF", 
  elevation : 5,
  height: 200 ,
  width: '90%',
  borderWidth: 1,
  borderColor: '#fff',
  borderRadius:7,
 }
});