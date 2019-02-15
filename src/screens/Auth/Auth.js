import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from "react-redux";
import Icon from "../../../node_modules/react-native-vector-icons/Ionicons";

const myIcon = <Icon name="md-log-out" size={30} color="#900" />;


 class Auth extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {myIcon}
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(null, null)(Auth);