import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import Auth from './src/screens/Auth/Auth';
import configureStore from "./src/store/configureStore";
import GameInitScreen from './src/screens/GameInit/Gameinit'
import ConfigGame from "./src/components/ConfigGame/ConfigGame"

const store = configureStore();


Navigation.registerComponentWithRedux(
    "trivia-game.AuthScreen",
    () => Auth,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "trivia-game.ConfigGame",
    () => ConfigGame,
    Provider,
    store
  );

  Navigation.registerComponent("trivia-game.GameInitScreen", () => GameInitScreen);

Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          component: {
            name: "trivia-game.AuthScreen",
          }
        },
        
      });
      
    });