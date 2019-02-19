import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Platform
} from "react-native";

const QuestionBtn = props => {
    const content = (
      <View  style={[styles.button, { backgroundColor: props.color }, ]}>
        <Text style={styles.textStyles}>
          {props.children}
        </Text>
      </View>
    );
    
    
      return (
        <TouchableOpacity style={styles.container}onPress={props.onPress}>
          {content}
        </TouchableOpacity>
      );
    
  };
  
  const styles = StyleSheet.create({
      container:{
          width:"48%",
          paddingTop:15,
          padding:10
    },
    button: {
        alignItems:"center",
        justifyContent:"center",
        height:80,
      padding: 10,
      margin: 5,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "transparent"
    },
    textStyles:{
        color:"#fff",
        fontSize:15,
        fontWeight:"bold"
    }
    
  });
  
  export default QuestionBtn;