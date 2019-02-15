import React, {Component} from "react";
import {View, TextInput, StyleSheet } from "react-native";
import Icon from "../../../../node_modules/react-native-vector-icons/Ionicons";



class customInput extends Component {
  constructor(props){
    super(props);
  }
    render(){
      let ic = null;
      if(!this.props.valid && this.props.touched){
        ic = (<Icon
              style={styles.iconStyle}
              name={"ios-close"}
              size={50}
              color="red"
              
                   />)
      }
      
      return(
        <View style={styles.container}>
          <TextInput underlineColorAndroid="transparent" {...this.props} style={[styles.input, this.props.style]}/>
          {ic}
      </View>)
      }
    }
  

const styles = StyleSheet.create({
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#eee",
    padding: 5,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: "4%"
  },
  invalid: {
    backgroundColor: '#f9c0c0',
    borderColor: "red",
    alignItems: "center"
  }, 
  container: {
    width:"100%" ,
    flexDirection: "row",
    alignItems:"center"
    
    
    
  },
  iconStyle:{ marginLeft: 10}
});

export default customInput;
