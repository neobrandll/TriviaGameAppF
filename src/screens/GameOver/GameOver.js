import React, {Component} from "react"
import {View,FlatList, Text, StyleSheet} from "react-native";
import {connect} from "react-redux"
import {setRound, setTimer} from "../../store/actions/index"
import CustomBtn from "../../components/UI/CustomBtn"

class GameOver extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{flex:1}}>
                <Text style={{color="#fff"}}>{this.props.round>9 ? "You beat the game!!" : "GameOver" }</Text>
                <Text style={{color="#fff"}}>{this.props.questions.results.difficulty }</Text>
                <View style={StyleSheet.scoreboardContainer}>
                {/* <FlatList></FlatList> */}
                    <View style={StyleSheet.userScore}>
                        <Text>{`${this.propsauthData.user.users_email}: ${this.props.round} ` }</Text>
                    </View>
                </View>
                <CustomBtn>Go back!</CustomBtn>
            </View>
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