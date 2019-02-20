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
import {setRound, setTimer, setScores} from "../../store/actions/index"
import Timer  from "../../components/Timer/Timer"
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons"
import {Navigation} from "react-native-navigation";



class QuestionList extends Component{
    constructor(props){
        super(props)
    }

    goGameOverScreen = ()=> {
        Promise.all([
          Icon.getImageSource("md-menu", 30),
      ]).then(sources =>{
        Navigation.setRoot({
          root: {
            sideMenu:{
                id: "sideMenu",
            left: {
              component: {
                id: "Drawer",
                name: "trivia-game.SideMenu"
              }
            },
            center: {
            stack: {
              children: [{
                component: {
                  name: "trivia-game.GameOverScreen",
                }
              }],
              options: {
                topBar: {
                  title: {
                    alignment: "center",
                    text: 'Trivia Game'
                  },
                    leftButtons: [
                        { 
                            icon: sources[0],
                            id: "sideDrawerToggle"
                        }
                    ]
                }
              }
            }//stack
            }//center
            }//sideMenu
          }//root
        });
      })
      }

      gameOverHandler = ()=>{
        
          let gameKey;
        let difficulty = this.props.difficulty
           switch(difficulty){
            case "easy": 
             gameKey = 1
             break;
             case "medium":
             gameKey = 2
             break;
             case "hard":
             gameKey = 3
             break;
        }

          let token = this.props.userData.token
          const fetchData= {
            gameType: gameKey,
            matchScore: this.props.round + 1
          }
          const myHeaders = new Headers();

            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', "Bearer " + token);
          

          let config = {
            method: "POST",
            withCredentials:true,
            credentials:'same-origin',
            headers: myHeaders,
            body:  JSON.stringify(fetchData)
          }
      
                    fetch('http://localhost:3001/scoreboard/setScore', config).then(res => res.json())
                    .then(answ => {
                          
                
                          let configScore = {
                            method: 'GET',
                            withCredentials:true,
                            credentials:'same-origin',
                            headers:{
                              "Content-type":"application/x-www-form-urlencoded",
                              "Authorization": "Bearer " + token
                            }}
                            fetch(`http://localhost:3001/scoreboard/getScores?gametype=${gameKey}`, configScore).then(res => res.json())
                            .then(scores =>{
                                this.props.setScoresGlobal(scores)
                                this.goGameOverScreen()
                            })
                            .catch(e=>{
                                console.log(e)
                                Alert.alert("error", "an error has ocurred in the second fetch")
                            })

                    
      })
      .catch(e=>{
        console.log(e)
        Alert.alert("error", "an error has ocurred in the first fetch")
    })
    
    }







    correctAnswerHandler = ()=>{
        Alert.alert("correct", "U got it right!",
                        [{text: 'OK', onPress: () => {
                            if(this.props.round<9){
                            this.props.nextRound(this.props.round+1)
                            this.props.setTime(10)
                        }else{
                            this.gameOverHandler()
                        }
                        
                        
                        } }],
                        {onDismiss: ()=>{ 
                            if(this.props.round<9){
                            this.props.nextRound(this.props.round+1)
                            this.props.setTime(10)
                        }else{
                            this.gameOverHandler()
                        }
                        
                        
                        
                        } })
    }
    
    incorrectAnswerHandler = ()=>{
        this.gameOverHandler()
        
    }

    replaceSpecial = (string)=>{
        let text = string
        text = text.replace(/&quot;/g, '"');
        text = text.replace(/&#039;/g, "'");
        text = text.replace(/&rsquo;/g, "'");
        return text
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
            color={"#ea4152"}> {this.replaceSpecial(question)} </QuestionBtn>)}
            );
        const secondView = arr2.map(question =>  { 
            return (<QuestionBtn 
            onPress={question === info.correct_answer ? this.correctAnswerHandler : this.incorrectAnswerHandler}
             key={question} color={"#ea4152"}> {this.replaceSpecial(question)} </QuestionBtn>)}
             );
            
        content = (
            <View style={{width:"100%"}}>
                <View style={styles.questionContainer}> 
                    {firstView}
                
                </View>
                <View style={styles.questionContainer}> 
                {secondView}
            
                </View>
                <View style={styles.timerNroundtContainer}>
                    <View style={styles.timerStyles}>
                    <Icon name= "ios-time" size={50} color="rgb(153, 51, 255)"/>
                        <Timer onTimeE={this.incorrectAnswerHandler}/>
                    </View>
                    <View style={[styles.timerStyles, {marginLeft:25}]}>
                        <Text style={styles.roundStyles}>Round:{(this.props.round+1)} </Text>
                    </View>
                            
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
            <View style={{width:"100%"}}>
                    <View style={styles.questionContainer}>
                        {uniqueView}
                        
                    </View>

                    <View style={styles.timerNroundtContainer}>
                    <View style={styles.timerStyles}>
                    <Icon name= "ios-time" size={50} color="rgb(153, 51, 255)"/>
                        <Timer onTimeE={this.incorrectAnswerHandler}/>
                    </View>
                    <View style={[styles.timerStyles, {marginLeft:25}]}>
                        <Text style={styles.roundStyles}>Round:{(this.props.round+1)} </Text>
                    </View>
                            
                    </View>
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
    },
        timerNroundtContainer:{
        paddingTop:35,
        width:"100%", 
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
        },
        timerStyles:{
            flexDirection: "row",
            backgroundColor:"rgba(204, 153, 255, 0.95)",
            width:"40%", 
            borderRadius:30, 
            height:80,
            justifyContent: "center",
            alignItems: "center"
        },
        roundStyles:{
                fontWeight:"bold", 
                fontSize:25,
            
        },
        })


        const mapDispatchToProps = dispatch =>{
            return {
                nextRound: round => dispatch(setRound(round)),
                setTime: timer => dispatch(setTimer(timer)),
                setScoresGlobal: scores => dispatch(setScores(scores))
              };
        }

        const mapStateToProps = state=> {
            return{
                round: state.app.round,
                userData: state.app.authData,
                questions: state.questions.questionsJson,
                difficulty: state.app.difficulty
            }
        }

    export default connect(mapStateToProps, mapDispatchToProps)(QuestionList)