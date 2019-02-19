import React, {Component} from "react";
import {View, ImageBackground, Text, StyleSheet, TouchableOpacity} from "react-native"
import {connect} from "react-redux"
import {Navigation} from "react-native-navigation"
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons"
import {} from "../../store/actions/index"
import Gameinit from "../GameInit/Gameinit"
import backimg from "../../assets/bg.jpg";

import QuestionList from "../../components/QuestionList/QuestionList"

class GameScreen extends Component{
    state={
        i:0
    }

    componentDidMount() {
        this.navigationEventListener = Navigation.events().bindComponent(this);
      }
    
      componentWillUnmount() {
        if (this.navigationEventListener) {
          this.navigationEventListener.remove();
        }
      }
    
      navigationButtonPressed({ buttonId }) {
        if (buttonId === "sideDrawerToggle"){
            this.openSideMenu();
        }
      }

      openSideMenu = () => {
        Navigation.mergeOptions(this.props.componentId, {
          sideMenu: {
            left: {
              visible: true
            }
          }
        });
      }

      replaceSpecial = (string)=>{
        let text = string
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&#039;/g, "'");
        text = text.replace(/&rsquo;/g, "'");
        return text
       }


    render(){
    
        let questionArr = []
        questionArr = questionArr.concat(this.props.questions.results[this.props.round].correct_answer,
            this.props.questions.results[this.props.round].incorrect_answers)

        questionArr = questionArr.sort()


        return(
            <ImageBackground source={backimg} style={styles.backimg}>
                <View style={styles.container}>
                
                        <View style={styles.textContainer}>
                            <Text style={styles.textStyles}> {this.replaceSpecial(this.props.questions.results[this.props.round].question)}</Text>
                        </View>
                         
                         <QuestionList  questionInfo={this.props.questions.results[this.props.round]} array={questionArr}></QuestionList>
                    
            
                </View>
        </ImageBackground>
        )
    }
}

const mapStateToProps = state=> {
    return{
        difficulty: state.app.difficulty,
        questions: state.questions.questionsJson,
        round: state.app.round
    }
}



const styles = StyleSheet.create({
    backimg: {
    width: "100%",
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  textStyles:{
      padding:20,
      fontSize:25,
    fontWeight:"bold",
    color:"white"
  },
  textContainer:{
      marginTop: 50,
      width:"90%",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"rgba(92, 185, 230, 0.95)",
      borderRadius: 5
  }
})

export default connect(mapStateToProps,null)(GameScreen)
