import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Alert
} from "react-native";
import { connect } from "react-redux";
import CustomInput from "../../components/UI/CustomInput/CustomInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import CustomBtn from "../../components/UI/CustomBtn/CustomBtn";
import backimg from "../../assets/bg.jpg";
import validate from "../../utility/validation";
import { tryAuth, logOut } from "../../store/actions/index";
import {Navigation} from "react-native-navigation";
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons"


class Auth extends Component {
  state = {
    viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
    authMode: "login",
    

    controls: {
      name:{
        value:"",
        valid: false,
        validationRules:{
          notEmpty: true
        },
        touched: false
      },
      // email: {
      //   value: "",
      //   valid: true,
      //   validationRules: {
      //     isEmail: true
      //   },
      //   touched: false
      // },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      }
    }
  };

  componentDidMount(){
    this.props.LoggingOut("hi")
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles);
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        authMode: prevState.authMode === "login" ? "signup" : "login"
      };
    });
  };

  updateStyles = dims => {
    this.setState({
      viewMode: dims.window.height > 500 ? "portrait" : "landscape"
    });
  };

  loginHandler = () => {
    
    // fetch('http://localhost:3001/session/logout', {
    //   method: "GET"}).then(res => console.log("al menos esto funciona"))
    // return 

    const inputsData = {
      email: this.state.controls.name.value,
      password: this.state.controls.password.value
    };
    let config = {
      method: "POST",
      withCredentials:true,
      credentials:'same-origin',
      headers:{
        'Content-Type': 'application/json'
      },
      body:  JSON.stringify(inputsData)
    }

      if(this.state.authMode === "signup"){
              fetch('http://localhost:3001/register/createUser', config).then(res => res.json())
              .then(data =>{
                     if(data.status === 200){
                      Alert.alert("Register complete!")
                  }
                  else{
                    Alert.alert("error", "An error has ocurred, verify your data")
                  }
                })
                
                .catch(e =>{
                  Alert.alert("error", "An error has ocurred, verify your data")
                  console.log(e)
                })
            }
            else{
              fetch('http://localhost:3001/session/login', config).then(res => res.json())
              .then(data =>{
                if(data.status === 200){
                 this.props.onLogin(data)
                 Auth.susLog()
              }else{
                Alert.alert("error", "An error has ocurred, verify your data")
              }
              })
              .catch(e =>{
                Alert.alert("error", "An error has ocurred, verify your data")
                console.log(e)
              })
            }
    
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                    prevState.controls.confirmPassword.value,
                    prevState.controls.confirmPassword.validationRules,
                    connectedValue
                  )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  


  static susLog = ()=> {
    Promise.all([
      Icon.getImageSource("md-menu", 30),
  ]).then(sources =>{
    Navigation.setRoot({
      root: {
        sideMenu:{
            id: "sideMenu",
        left: {
          component: {
            id: "Drawer",
            name: "trivia-game.SideMenu"
          }
        },
        center: {
        stack: {
          children: [{
            component: {
              name: "trivia-game.GameInitScreen",
            }
          }],
          options: {
            topBar: {
              title: {
                alignment: "center",
                text: 'Trivia Game'
              },
                leftButtons: [
                    { 
                        icon: sources[0],
                        id: "sideDrawerToggle"
                    }
                ]
            }
          }
        }//stack
        }//center
        }//sideMenu
      }//root
    });

  })

    
   
  }

  render() {
    let headingText = null;
    let confirmPasswordControl = null;

    if (this.state.viewMode === "portrait") {
      headingText = (
        <MainText>
          <HeadingText style={styles.white}>Trivia Game!</HeadingText>
        </MainText>
      );
    }
    if (this.state.authMode === "signup") {
      confirmPasswordControl = (
        <View
          style={
            this.state.viewMode === "portrait"
              ? styles.portraitPasswordWrapper
              : styles.landscapePasswordWrapper
          }
        >
          <CustomInput
            placeholder="Confirm Password"
            style={styles.input}
            value={this.state.controls.confirmPassword.value}
            onChangeText={val => this.updateInputState("confirmPassword", val)}
            valid={this.state.controls.confirmPassword.valid}
            touched={this.state.controls.confirmPassword.touched}
            secureTextEntry
          />
        </View>
      );
    }
    return (
      <ImageBackground source={backimg
    } style={styles.backimg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <KeyboardAvoidingView style={styles.container} behavior="height">
          {headingText}
          
          
            <View style={styles.inputContainer}>
              <CustomInput
                placeholder="Username"
                style={styles.input}
                value={this.state.controls.name.value}
                onChangeText={val => this.updateInputState("name", val)}
                valid={this.state.controls.name.valid}
                touched={this.state.controls.name.touched}
                autoCapitalize="none"
                autoCorrect={false}
                
              />
              <View
                style={
                  this.state.viewMode === "portrait" ||
                  this.state.authMode === "login"
                    ? styles.portraitPasswordContainer
                    : styles.landscapePasswordContainer
                }
              >
                <View
                  style={
                    this.state.viewMode === "portrait" ||
                    this.state.authMode === "login"
                      ? styles.portraitPasswordWrapper
                      : styles.landscapePasswordWrapper
                  }
                >
                  <CustomInput
                    placeholder="Password"
                    style={styles.input}
                    value={this.state.controls.password.value}
                    onChangeText={val => this.updateInputState("password", val)}
                    valid={this.state.controls.password.valid}
                    touched={this.state.controls.password.touched}
                    secureTextEntry
                  />
                </View>
                {confirmPasswordControl}
              </View>
            </View>
          <View style={styles.containerbtn}>
          <CustomBtn
            color="#ea4152"
            onPress={this.loginHandler}
            disabled={
              !this.state.controls.confirmPassword.valid && this.state.authMode === "signup" ||
              !this.state.controls.name.valid ||
              !this.state.controls.password.valid
            }
          >
            Submit
          </CustomBtn>
          <CustomBtn
              color="#ea4152"
              onPress={this.switchAuthModeHandler}
            >
              Switch to {this.state.authMode === "login" ? "Sign Up" : "Login"}
          </CustomBtn>
          </View>
          
        </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </ImageBackground>
    );
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
  inputContainer: {
    width: "80%"
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  landscapePasswordContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  portraitPasswordContainer: {
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  landscapePasswordWrapper: {
    width: "45%"
  },
  portraitPasswordWrapper: {
    width: "100%"
  },
  white:{
    color: "#fff"
  },
  containerbtn:{
    width:"100%" ,
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onLogin: authData => dispatch(tryAuth(authData)),
    LoggingOut: any => dispatch(logOut(any))
  };
};





export default connect(null, mapDispatchToProps)(Auth);