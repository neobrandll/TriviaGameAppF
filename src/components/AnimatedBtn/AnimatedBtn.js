import React , {Component} from "react";
import { View,  Text, TouchableOpacity, StyleSheet, Animated, Alert} from "react-native"
import {connect} from "react-redux"
import { setJson } from "../../store/actions/index";
import Auth from "../../screens/Auth/Auth"


class AnimatedBtn extends Component{
    state={
        removeAnim: new Animated.Value(1)
    }
    startHandler = ()=>{
        Animated.timing(this.state.removeAnim, {
            toValue: 0,
            duration:700,
            useNativeDriver:true
        }).start(()=>{
            this.initializeGame(this.props.category,this.props.difficulty )}
            );
    }

    initializeGame = (category, difficulty)=>{
        let catURL = (category ==="any") ? "" :  `&category=${category}`
        let url = `https://opentdb.com/api.php?amount=10${catURL}&difficulty=${difficulty}`
        console.log(url)
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                let questionsJson = responseJson;
                this.props.SetQuestionsJson(questionsJson)
                if(questionsJson.response_code !== 0){
                    Alert.alert("Error", "No existen las preguntas suficientes para la configuracion dada",
                    [{text: 'OK', onPress: () => {Auth.susLog()} }],
                    {onDismiss: ()=>{Auth.susLog();}
                })
                    
                }
             })
             .catch((e)=>{
                 Alert.alert("Error", "Ha ocurrido un error", [{text: 'OK', onPress: () => {Auth.susLog()} }],
                    {onDismiss: ()=>{Auth.susLog();}})
                console.log(e)})
          
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
          SetQuestionsJson: json => dispatch(setJson(json))
      }
  }

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedBtn)