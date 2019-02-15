import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";
import Auth from './src/screens/Auth/Auth';
import configureStore from "./src/store/configureStore";

const store = configureStore();


Navigation.registerComponentWithRedux(
    "awesome-places.AuthScreen",
    () => Auth,
    Provider,
    store
  );

Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setRoot({
        root: {
          component: {
            name: "awesome-places.AuthScreen"
          }
        }
      });
    });