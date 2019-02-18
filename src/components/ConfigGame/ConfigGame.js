import React , {Component} from "react";
import {StyleSheet, View, Picker, Text} from "react-native"
import MainText from "../../components/UI/MainText/MainText";
import { connect } from "react-redux";

import { setCategory, setDifficulty } from "../../store/actions/index";


class configGame extends Component{
    render(){

        return(
            <View>
                <View style={styles.pickertext}>
                            <Text style={[styles.categoryText, {color:"#fff"}]}>Category:</Text> 
                            <MainText >Difficulty:</MainText> 
                            </View>
                            <View style={styles.drawerItem}>
                    
                            
                            <Picker
                                    selectedValue={this.props.category}
                                    style={[styles.pickerStyle, {marginRight:20}]}
                                    onValueChange={(itemValue) =>
                                        this.props.onCatChange(itemValue)
                                    }>
                                    <Picker.Item label="Any Category" value="any" />
                                    <Picker.Item label="General Knowledge" value="loco" />
                                    <Picker.Item label="Sports" value="java" />
                                    <Picker.Item label="Animals" value="java" />
                                    <Picker.Item label="Films" value="java" />
                                    <Picker.Item label="Music" value="mario" />
                                    <Picker.Item label="Geography " value="carla" />
                            </Picker>
                    
                    
                    
                                    
                                    
                                    <Picker
                                            selectedValue={this.props.difficulty}
                                            style={styles.pickerStyle}
                                            onValueChange={(itemValue) =>
                                                this.props.onDifChange(itemValue)
                                            }>
                                            <Picker.Item label="Medium" value="medium" />
                                            <Picker.Item label="Easy" value="easy" />
                                            <Picker.Item label="Hard" value="hard" />
                                    </Picker>
                    
                 </View>
            </View>
        )
    }
}

                            

const styles = StyleSheet.create({
   
        pickerStyle:{height: 50, width: "40%", backgroundColor:"white"},
        drawerItem: {
            flexDirection: "row",
        width:"100%",
        justifyContent: "center",
        
        },
        pickertext:{
            paddingTop:20,
            flexDirection: "row",
            width:"100%",
        },
        categoryText:{
            paddingLeft:28,
            marginRight:100

        }
  
})

const mapDispatchToProps = dispatch => {
    return {
      onCatChange: category => dispatch(setCategory(category)),
      onDifChange: difficulty => dispatch(setDifficulty(difficulty))
    };
  };

  const mapStateToProps = state => {
    return {
      category: state.app.category,
      difficulty: state.app.difficulty
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(configGame);