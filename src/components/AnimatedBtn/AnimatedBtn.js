import React , {Component} from "react";
import { View,  Text, TouchableOpacity, StyleSheet, Animated, Alert, Button} from "react-native"
import {connect} from "react-redux"
import { setJson } from "../../store/actions/index";
import Auth from "../../screens/Auth/Auth"
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons"
import {Navigation} from "react-native-navigation"


class AnimatedBtn extends Component{
    state={
        removeAnim: new Animated.Value(1)
    }
    startHandler = ()=>{
        Promise.all([this.initializeGame(this.props.category,this.props.difficulty )])
        .then(()=>{
                this.goLoginScreen();
        })
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration:700,
            useNativeDriver:true
        }).start()
            

    }

   goLoginScreen = ()=> {
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
                  name: "trivia-game.GameScreen",
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

    initializeGame = (category, difficulty)=>
    {
        return new Promise((resolve, reject)=>
        {
            let catURL = (category ==="any") ? "" :  `&category=${category}`
        let url = `https://opentdb.com/api.php?amount=10${catURL}&difficulty=${difficulty}`

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let questionsJson = responseJson;
                this.props.SetQuestionsJson(questionsJson)
                if(questionsJson.response_code !== 0){
                    Alert.alert("Error", "There are not enough questions for that configuration",
                    [{text: 'OK', onPress: () => {Auth.susLog()} }],
                    {onDismiss: ()=>{Auth.susLog();} })
                reject();
                }
                else{
                    resolve(); 
                }
             })
             .catch((e)=>{
                 Alert.alert("Error", "An error has ocurred", [{text: 'OK', onPress: () => {Auth.susLog()} }],
                    {onDismiss: ()=>{Auth.susLog();}})
                    reject();
            })
        })
        
          
    }

    
    render(){
        
        return(
            <Animated.View
            style={[styles.buttonContainer, {
              opacity: this.state.removeAnim,
              transform: [
                {
                  scale: this.state.removeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 1]
                  })
                }
              ]
            }]}>
                    <TouchableOpacity onPress={this.startHandler}>
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Start!</Text>
                        </View>
                    </TouchableOpacity>
            </Animated.View>
          )
    }
}

    

const styles = StyleSheet.create({
    buttonContainer: {
                flex:1,
                paddingTop:30,
                justifyContent:"flex-start",
                alignItems: "center"
    },
    btn:{
                padding:20,
                borderColor:"transparent",
                borderWidth:3,
                borderRadius:50,
                backgroundColor:"#ea4152"
            },
    btnText:{
                color:"#fff",
                fontSize: 26,
                fontWeight:"bold"
            }
  });


  const mapStateToProps = state => {
      return{
          category: state.app.category,
          difficulty: state.app.difficulty
      }
  }

  const mapDispatchToProps = dispatch =>{
      return{
          SetQuestionsJson: QuestionsJson => dispatch(setJson(QuestionsJson))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBtn)