import React, {Component} from "react"
import {View,FlatList, Text, StyleSheet, ImageBackground} from "react-native";
import {connect} from "react-redux"
import {setRound, setTimer} from "../../store/actions/index"
import CustomBtn from "../../components/UI/CustomBtn/CustomBtn"
import backimg from "../../assets/bg.jpg";
import {Navigation} from "react-native-navigation";
import ScoreList from "../../components/ScoreList/ScoreList"
import {newGame} from "../../store/actions/index"
import Auth from "../Auth/Auth"


class GameOver extends Component{
    constructor(props){
        super(props)
    }

    //try again method
    gobackHandler= () =>{
        this.props.tryAgain();
        Auth.susLog()
    }
     
    //methods for the side menu
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
    render(){
        return(
            <ImageBackground source={backimg
            } style={styles.backimg}>
            <View style={styles.container}>
                <Text style={styles.headingStyles}>{this.props.round>9 ? "You beat the game!!" : "GameOver" }</Text>
                <Text style={styles.modeStyles}>MODE: {this.props.difficulty }</Text>
                <View style={styles.scoreboardContainer}>

                    <View style={[styles.userScoreContainer, {marginRight:50}]}>
                        <Text style={styles.alltheScores}>All the scores </Text>
                        <ScoreList/>
                    </View>
                    
                    <View style={styles.userScoreContainer}>
                        <Text style={styles.userScore}>Your score </Text>
                        <Text style={styles.userScore}>{`${this.props.userData.user.users_email}: ${this.props.round + 1} ` }</Text>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <CustomBtn color="#ea4152" onPress={this.gobackHandler} >Go back!</CustomBtn>
                </View>
                
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      },
      backimg
    : {
        width: "100%",
        flex: 1
      },
      headingStyles:{
        color:"#fff",
        fontWeight: "bold",
        fontSize: 50
      },
      modeStyles:{
          marginTop:10,
          marginBottom:20,
        color:"#fff",
        fontWeight: "bold",
        fontSize: 30
      },
      userScoreContainer:{
          backgroundColor:"#eee",
          width:"35%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius:3
      },
      scoreboardContainer:{
          flexDirection:"row",
          justifyContent: "center",
          alignItems: "center",
          width:"100%",
          height:"30%"

      },
      userScore:{
        fontWeight: "bold",
        fontSize: 20,
        color:"rgb(92, 185, 230)"
      },
      alltheScores:{
        paddingLeft:5,
        fontWeight: "bold",
        fontSize: 18,
        color:"rgb(92, 185, 230)"
      },
      btnContainer:{
          marginTop:20
      }

})



const mapDispatchToProps = dispatch =>{
    return {
        tryAgain: ()=> dispatch(newGame())
      };
}



const mapStateToProps = state=> {
    return{
        round: state.app.round,
        userData: state.app.authData,
        scores : state.app.scores,
        difficulty: state.app.difficulty
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(GameOver)