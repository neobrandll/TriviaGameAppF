import React , {Component} from "react";
import {StyleSheet, View,ImageBackground, Picker, Text} from "react-native"
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import backimg from "../../assets/bg.jpg";


class Gameinit extends Component{
    state={
        category: "any",
        difficulty: "medium"
    }

    render(){
        return(
            <ImageBackground source={backimg } style={styles.backimg}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <MainText>
                            <HeadingText style={styles.header}>Prepare your</HeadingText>
                        </MainText>
                        <MainText>
                            <HeadingText style={styles.header}>game!</HeadingText>
                        </MainText>
                    </View>
                    <View style={styles.pickertext}>
                        <Text style={[styles.categoryText, {color:"#fff"}]}>Category:</Text> 
                        <MainText >Difficulty:</MainText> 
                    </View>
                    
                    
                <View style={styles.drawerItem}>
                    
                            
                            <Picker
                                    selectedValue={this.state.category}
                                    style={[styles.pickerStyle, {marginRight:20}]}
                                    onValueChange={(itemValue) =>
                                        this.setState({category: itemValue})
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
                                            selectedValue={this.state.difficulty}
                                            style={styles.pickerStyle}
                                            onValueChange={(itemValue) =>
                                                this.setState({difficulty: itemValue})
                                            }>
                                            <Picker.Item label="Medium" value="medium" />
                                            <Picker.Item label="Easy" value="easy" />
                                            <Picker.Item label="Hard" value="hard" />
                                    </Picker>
                    
                 </View>
                            
    
                    


                  

                </View>
            </ImageBackground>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer:{
        paddingTop: 30,
        justifyContent: "flex-start",
        alignItems:"center"
    },
    header:{
        color: "#fff",
        
      },
      backimg: {
        width: "100%",
        flex: 1
  },
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

export default Gameinit;