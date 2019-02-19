import React, {Component} from "react";
import {View, ImageBackground, Text, StyleSheet, TouchableOpacity} from "react-native"
import {connect} from "react-redux"
import {Navigation} from "react-native-navigation"
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons"
import {} from "../../store/actions/index"
import Gameinit from "../GameInit/Gameinit"
import backimg from "../../assets/bg.jpg";

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

//
    render(){
        return(
            <ImageBackground source={backimg} style={styles.backimg}>
                <View style={styles.container}>
                

                         <Text style={{color:"white"}}> {this.props.questions.results[this.state.i].question}</Text>
                    
            
                </View>
        </ImageBackground>
        )
    }
}

const mapStateToProps = state=> {
    return{
        difficulty: state.app.difficulty,
        questions: state.questions.questionsJson
    }
}

const styles = StyleSheet.create({
    backimg: {
    width: "100%",
    flex: 1
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
})

export default connect(mapStateToProps,null)(GameScreen)
