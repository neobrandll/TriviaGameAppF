import React , {Component} from "react";
import { View, Picker, Text} from "react-native"
import MainText from "../../components/UI/MainText/MainText";
import { connect } from "react-redux";
import styles from "./ConfigGameStyles"

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
                    
                            <View style={[styles.pickerContainer, {marginRight:20}]}>
                                <Picker
                                        selectedValue={this.props.category}
                                        style={[styles.pickerStyle, ]}
                                        onValueChange={(itemValue) =>
                                            this.props.onCatChange(itemValue)
                                        }>
                                        <Picker.Item label="Any Category" value="any" />
                                        <Picker.Item label="General Knowledge" value="9" />
                                        <Picker.Item label="Sports" value="21" />
                                        <Picker.Item label="Animals" value="27" />
                                        <Picker.Item label="Films" value="11" />
                                        <Picker.Item label="Music" value="12" />
                                        <Picker.Item label="Geography " value="22" />
                                </Picker>
                            
                            </View>
                            
                    
                    
                            <View style={styles.pickerContainer}>
                                    <Picker
                                            selectedValue={this.props.difficulty}
                                            style={styles.pickerStyle}
                                            onValueChange={(itemValue) =>
                                                this.props.onDifChange(itemValue)
                                            }>
                                            <Picker.Item label="Easy" value="easy" />
                                            <Picker.Item label="Medium" value="medium" />
                                            <Picker.Item label="Hard" value="hard" />
                                    </Picker>
                            
                            </View>
                                    
                                    
                                    

                                    
                    
                 </View>
            </View>
        )
    }
}

                            



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