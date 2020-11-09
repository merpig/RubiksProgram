import React,{Component} from "react";
import MobileView from "../MobileView/MobileView";
import View from "../View";
import SideView from "../SideView/SideView";
class Menu extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        
        if(this.props.state.resized===true){
            this.props.setState({resized:false});
            return true;
        }

        if(this.props.state.upDateCp!==nextProps.state.upDateCp){
            return true;
        }
        if(this.props.state.solvedSet!==nextProps.state.solvedSet) {
            //console.log(nextProps.state.solvedSet);
            return true;
        }

        if(this.props.state.currentFunc==="Scrambling") return true;

        if(this.props.state.activeMenu===nextProps.state.activeMenu&&this.props.state.activeMenu==="none") return false;

        if(
            (this.props.state.currentFunc==="Algorithms"||this.props.state.currentFunc==="Solving")&&
            this.props.state.moveSet===nextProps.state.moveSet&&
            this.props.state.playOne===false&&
            this.props.state.autoPlay===false&&
            this.props.state.autoRewind===false&&
            nextProps.state.autoRewind===false
            ) 
            return false;
        return true;
    }
    render(){
        const props = this.props;
        return (window.innerWidth > 900&&window.innerHeight>580)? 
            <SideView {...props}/> 
                : window.innerWidth > 600?
            <View {...props}/>:
            <MobileView {...props}/>;  
    } 
}

export default React.memo(Menu);