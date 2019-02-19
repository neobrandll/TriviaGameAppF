import React , {Component} from "react";
import {StyleSheet, View,ImageBackground, Picker, Text, Button} from "react-native"
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import backimg from "../../assets/bg.jpg";
import ConfigGame from "../../components/ConfigGame/ConfigGame"
import AnimatedBtn from "../../components/AnimatedBtn/AnimatedBtn"
import {Navigation} from "react-native-navigation";




class Gameinit extends Component{

    
    state={
        
    }

    constructor(props) {
        super(props);

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
                    
                    <ConfigGame/>
                    <AnimatedBtn />
                    
                
                            
    
                    

                  

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