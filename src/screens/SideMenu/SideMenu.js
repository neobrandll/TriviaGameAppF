import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons";
import {connect} from "react-redux"
import {Navigation} from "react-native-navigation";

    
class SideDrawer extends Component {

  closeSideMenu = ()=> {
    Navigation.mergeOptions(this.props.componentId, {
      sideMenu: {
        left: {
          visible: false
        }
      }
    });
  }
  
  goToLogin = ()=>{
    Navigation.setRoot({
      root: {
        component: {
          name: "trivia-game.AuthScreen",
        }
      },
    });
  }

  signOutHandler = () =>{
  let token = this.props.user.token
  let url = 'http://localhost:3001/session/logout'
  let config = {
    method: 'GET',
    withCredentials:true,
    credentials:'same-origin',
    headers:{
      "Content-type":"application/x-www-form-urlencoded",
      "Authorization": "Bearer " + token
    }
    
  }
  fetch(url,config).then(res => res.json()).then(data => {if(data.status == "Bye!"){
        this.goToLogin();
      }else{
        Alert.alert("error", "An error has ocurred")
      }
    })
    .catch(e => {
      Alert.alert("error", "An error has ocurred")
      console.log(e)
    })
  
  }

  render() {
    return (
      <View
        style={[
          styles.container,
          { width: Dimensions.get("window").width * 0.8 }
        ]}
      >
      <View style={[styles.drawerItem, {backgroundColor:"#ea4152", marginBottom:40 }]}> 
      <Text style={{color:"#fff", fontSize:23, fontWeight:"bold"}}>Loggin As: {this.props.user.user.users_email}</Text>
      
      
      </View>
        <TouchableOpacity onPress={this.signOutHandler}>
          <View style={styles.drawerItem}>
            <Icon
              name= "md-log-out" 
              size={50}
              color="rgb(92, 185, 230)"
              style={styles.drawerItemIcon}
            />
            <Text style={{color:"rgb(92, 185, 230)", fontSize:23, fontWeight:"bold"}}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: "white",
    flex: 1,
    
  },
  drawerItem: {
    marginLeft:25,
    borderRadius:5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"center",
    padding: 10,
    backgroundColor: "#eee",
    width:"80%"
  },
  drawerItemIcon: {
    marginRight: 10
  }
});





const mapStateToProps = state=> {
  return{
      user: state.app.authData
  }
}

export default connect(mapStateToProps,null)(SideDrawer)
