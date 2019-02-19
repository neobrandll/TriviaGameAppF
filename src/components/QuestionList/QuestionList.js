import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  
} from "react-native";
import QuestionBtn from "../QuestionBtn/QuestionBtn"



    

const QuestionList = (props)=>{
    let content;
    if(props.array.length>2){
        let originalArr = props.array
        let arr1 = originalArr.splice(0,(originalArr.length/2));
        let arr2 = originalArr.splice(0,originalArr.length);
        const firstView = arr1.map(question =>  <QuestionBtn key={question} color={"#ea4152"}> {question} </QuestionBtn>);
        const secondView = arr2.map(question =>  <QuestionBtn key={question} color={"#ea4152"}> {question} </QuestionBtn>);
            
        content = (
            <View style={{width:"100%"}}>
                <View style={styles.questionContainer}> 
                    {firstView}
                
                </View>
                <View style={styles.questionContainer}> 
                {secondView}
            
                </View>
            </View>
        )
    }
    else{
        const uniqueView = props.array.map(question =>  <QuestionBtn key={question} color={"#ea4152"}> {question} </QuestionBtn>);
        content = (
            <View style={styles.container}>
                {uniqueView}
            </View>
        )
    }

    
    return (
        <View style={styles.container}>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:30,
      width:"100%",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "flex-start"
    },
    questionContainer:{
        width:"100%", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
        })

    export default QuestionList;