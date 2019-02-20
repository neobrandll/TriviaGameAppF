import React, {Component} from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  View,
  StyleSheet,
  Alert
  
} from "react-native";
import QuestionBtn from "../QuestionBtn/QuestionBtn"
import {connect} from "react-redux"
import {setRound, setTimer} from "../../store/actions/index"
import Timer  from "../../components/Timer/Timer"



class QuestionList extends Component{
    constructor(props){
        super(props)
    }

    correctAnswerHandler = ()=>{
        Alert.alert("correct", "la acertaste",
                        [{text: 'OK', onPress: () => {this.props.nextRound(this.props.round+1)} }],
                        {onDismiss: ()=>{this.props.nextRound(this.props.round+1)} })
    }
    
    incorrectAnswerHandler = ()=>{
        Alert.alert("incorrect", "la pelaste",
                        [{text: 'OK', onPress: () => {this.props.nextRound(this.props.round+1)} }],
                        {onDismiss: ()=>{this.props.nextRound(this.props.round+1)} })
        
    }

    render(){

        let content;
    let info = this.props.questionInfo;
    if(this.props.array.length>2){
        let originalArr = this.props.array
        let arr1 = originalArr.splice(0,(originalArr.length/2));
        let arr2 = originalArr.splice(0,originalArr.length);
        const firstView = arr1.map(question =>  {
            return (<QuestionBtn 
            onPress={question === info.correct_answer ? this.correctAnswerHandler : this.incorrectAnswerHandler} 
            key={question} 
            color={"#ea4152"}> {question} </QuestionBtn>)}
            );
        const secondView = arr2.map(question =>  { 
            return (<QuestionBtn 
            onPress={question === info.correct_answer ? this.correctAnswerHandler : this.incorrectAnswerHandler}
             key={question} color={"#ea4152"}> {question} </QuestionBtn>)}
             );
            
        content = (
            <View style={{width:"100%"}}>
                <View style={styles.questionContainer}> 
                    {firstView}
                
                </View>
                <View style={styles.questionContainer}> 
                {secondView}
            
                </View>
                <View>
                    <Timer onTimeE={this.incorrectAnswerHandler}/>
                </View>
            </View>
        )
    }
    else{
        const uniqueView = this.props.array.map(question =>  {
            return(<QuestionBtn
                onPress={question === info.correct_answer ? this.correctAnswerHandler : this.incorrectAnswerHandler}
                 key={question} 
                 color={"#ea4152"}> {question} </QuestionBtn>)}
        );
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


        const mapDispatchToProps = dispatch =>{
            return {
                nextRound: round => dispatch(setRound(round)),
                setTimer: timer => dispatch(setTimer(timer))
              };
        }

        const mapStateToProps = state=> {
            return{
                round: state.app.round
            }
        }

    export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)