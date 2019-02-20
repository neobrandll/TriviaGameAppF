import React from "react"
import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import Auth from './src/screens/Auth/Auth';
import configureStore from "./src/store/configureStore";
import GameInitScreen from './src/screens/GameInit/Gameinit'
import SideMenu from "./src/screens/SideMenu/SideMenu";
import GameScreen from "./src/screens/GameScreen/GameScreen"
import GameOver from "./src/screens/GameOver/GameOver";


const store = configureStore();



  //registering screens

  Navigation.registerComponent("trivia-game.SideMenu", () => (props) => (
    <Provider store={store}>
      <SideMenu {...props} />
    </Provider>
  ), () => SideMenu);

  Navigation.registerComponent("trivia-game.AuthScreen", () => (props) => (
    <Provider store={store}>
      <Auth {...props} />
    </Provider>
  ), () => Auth);

  Navigation.registerComponent("trivia-game.GameScreen", () => (props) => (
    <Provider store={store}>
      <GameScreen {...props} />
    </Provider>
  ), () => GameScreen);


 

  Navigation.registerComponent("trivia-game.GameInitScreen", () => (props) => (
    <Provider store={store}>
      <GameInitScreen {...props} />
    </Provider>
  ), () => GameInitScreen);

  Navigation.registerComponent("trivia-game.GameOverScreen", () => (props) => (
    <Provider store={store}>
      <GameOver {...props} />
    </Provider>
  ), () => GameOver);


  
Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          component: {
            name: "trivia-game.AuthScreen",
          }
        },
        
      });
      
    });