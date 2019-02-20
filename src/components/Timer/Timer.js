import React ,{Component} from "react";
import {connect} from "react-redux"
import {setTimer} from "../../store/actions/index"
import {Alert, View, Text, StyleSheet} from "react-native"



 
class TimerComponent extends Component {
    
    constructor(props){
        super(props)
        
    }
    timeHolder;
  oneSec= ()=>{
               console.log(this.props.timer)
               if(this.props.timer == 0){
                    this.props.onTimeE();
                    clearInterval(this._interval);
                       } 
        else{
            this.timeHolder= this.props.timer - 1
            this.props.setTime(this.timeHolder)
            }
     }
    componentDidMount() {
        this._interval = setInterval(()=>{this.oneSec()}, 1000);
      }
      
      componentWillUnmount() {
        clearInterval(this._interval);
      }

      static clearI = ()=>{
        clearInterval(this._interval);
      }

    
    render() {
        return (
            
                <Text style={styles.textStyles}>{this.props.timer}</Text>
            
            
        )
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        setTime: timer => dispatch(setTimer(timer))
      };
}

const mapStateToProps = state=> {
    return{
        timer: state.app.timer
    }
}

const styles = StyleSheet.create({
    textStyles:{
        fontWeight:"bold", 
        fontSize:35,
        paddingLeft:20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TimerComponent);
