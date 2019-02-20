import React, {Component} from "react"
import {View,FlatList, Text, StyleSheet, ImageBackground} from "react-native";
import {connect} from "react-redux"
import {setRound, setTimer} from "../../store/actions/index"
import CustomBtn from "../../components/UI/CustomBtn/CustomBtn"
import backimg from "../../assets/bg.jpg";


class GameOver extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <ImageBackground source={backimg
            } style={{flex:1}}>
            <View style={{flex:1}}>
                <Text style={{color:"#fff"}}>{this.props.round>9 ? "You beat the game!!" : "GameOver" }</Text>
                <Text style={{color:"#fff"}}>{this.props.questions.results.difficulty }</Text>
                <View style={StyleSheet.scoreboardContainer}>
                {/* <FlatList></FlatList> */}
                    <View style={StyleSheet.userScore}>
                        <Text>{`${this.props.userData.user.users_email}: ${this.props.round} ` }</Text>
                    </View>
                </View>
                <CustomBtn color="#ea4152" >Go back!</CustomBtn>
            </View>
            </ImageBackground>
        )
    }
}









const mapStateToProps = state=> {
    return{
        round: state.app.round,
        userData: state.app.authData,
        scores : state.app.scores,
        questions: state.questions.questionsJson
    }
}

export default connect(mapStateToProps, null )(GameOver)