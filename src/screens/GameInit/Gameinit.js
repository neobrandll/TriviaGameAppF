import React , {Component} from "react";
import {StyleSheet, View,ImageBackground, Picker, Text} from "react-native"
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import backimg from "../../assets/bg.jpg";
import ConfigGame from "../../components/ConfigGame/ConfigGame"
import { Provider } from "react-redux";
import configureStore from "../../store/configureStore"
const store = configureStore();


class Gameinit extends Component{
    state={
        
    }

    render(){
        return(
            <ImageBackground source={backimg } style={styles.backimg}>
            <Provider store={store}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        <MainText>
                            <HeadingText style={styles.header}>Prepare your</HeadingText>
                        </MainText>
                        <MainText>
                            <HeadingText style={styles.header}>game!</HeadingText>
                        </MainText>
                    </View>
                    
                    <ConfigGame/>
                    
                
                            
    
                    


                  

                </View>
                </Provider>
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