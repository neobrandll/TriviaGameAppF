import React from "react";
import { StyleSheet, FlatList } from "react-native";

import {connect} from "react-redux"
import {Text, View} from "react-native"

const scoreList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.scores.data}
      renderItem={(info) => (
          <View style={styles.textContainer}>
                <Text style={styles.textStyles}> { `${info.item.users_email}: ${info.item.match_score}`} </Text>
        </View>
      )}
      keyExtractor={(info, index) => info.scoreboard_id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
  },
  textContainer:{
      width:"100%",
      paddingLeft: 10,
      paddingTop:10,
  },
  textStyles:{
      fontSize: 18,
      color:"rgb(92, 185, 230)"
  }
});


const mapStateToProps = state=> {
    return{
        scores : state.app.scores
    }
}

export default connect(mapStateToProps, null)(scoreList);