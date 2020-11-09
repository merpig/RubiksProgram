import "../SideView/SideView.css";
import React, { Component } from "react";
import "./SideSolverUI.css";
import "../SolverUI/SolverUI.css";

class SideSolverControls extends Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.state.autoRewind === true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            if (nextProps.state.moveSet[0] === "stop'") {
                nextProps.setState({ autoRewind: false });
            }
            nextProps.rewindOne();
        }
        else if (nextProps.state.autoRewind === true && nextProps.state.solvedSetIndex <= nextProps.state.targetSolveIndex) {
            //console.log("ending rewind");
            nextProps.setState({ autoRewind: false });
        }

        if (nextProps.state.autoPlay === true && nextProps.state.solvedSetIndex < nextProps.state.targetSolveIndex) {
            //console.log("attempting rewind");
            if (nextProps.state.moveSet[0] === "stop'") {
                nextProps.setState({ autoPlay: false });
            }
            nextProps.playOne(nextProps);
        }
        else if (nextProps.state.autoPlay === true && nextProps.state.solvedSetIndex >= nextProps.state.targetSolveIndex) {
            //console.log("ending rewind");
            nextProps.setState({ autoPlay: false });
        }
        // if(nextProps.state.jumpToEnd){
        //     nextProps.setState({jumpToEnd:false},setTarget({target:{id:nextProps.state.moveSet.length}},nextProps));
        // }
    }

    componentDidUpdate() {
        if (document.querySelector(".nextSolveIndex") && this.props.state.autoScroll) {
            document.querySelector(".nextSolveIndex").scrollIntoView(true);
            this.props.setState({ autoScroll: false });
        }
    }

    render() {
        let prevSet = this.props.state.prevSet;
        let moveSet = this.props.state.moveSet;

        let previousMove =
            <div className="previousMove">
                {prevSet.length - 1 >= 0 ?
                    prevSet[prevSet.length - 1] === "stop'" ?
                        prevSet[prevSet.length - 2] ?
                            prevSet[prevSet.length - 2] === prevSet[prevSet.length - 3] ?
                                prevSet[prevSet.length - 2].replace(`0`+prevSet[prevSet.length-2][1],prevSet[prevSet.length-2][1]).replace("'", "") + 2
                                :
                                prevSet[prevSet.length - 2].replace(`0`+prevSet[prevSet.length-2][1],prevSet[prevSet.length-2][1])
                            :
                            "-"
                        :
                        prevSet[prevSet.length - 1] === prevSet[prevSet.length - 2] ?
                            prevSet[prevSet.length - 1].replace(`0`+prevSet[prevSet.length-1][1],prevSet[prevSet.length-1][1]).replace("'", "") + 2
                            :
                            prevSet[prevSet.length - 1].replace(`0`+prevSet[prevSet.length-1][1],prevSet[prevSet.length-1][1])
                    :
                    "-"}
            </div>

        let nextMove =
            <div className="nextMove">
                {moveSet[0] && typeof (moveSet[0][0]) === 'string' && moveSet[0] !== "'" ?
                    moveSet[0] === "stop'" ?
                        moveSet[1] ?
                            moveSet[1] === moveSet[2] ?
                                moveSet[1].replace(`0`+moveSet[1][1],moveSet[1][1]).replace("'", "") + 2
                                :
                                moveSet[1].replace(`0`+moveSet[1][1],moveSet[1][1])
                            :
                            "-"
                        :
                        moveSet[0] === moveSet[1] ?
                            moveSet[0].replace(`0`+moveSet[0][1],moveSet[0][1]).replace("'", "") + 2
                            :
                            moveSet[0].replace(`0`+moveSet[0][1],moveSet[0][1])
                    :
                    "-"
                }
            </div>;


        function fastforward(props) {
            if (!props.state.moveSet.length) return;
            props.state.moveSet.length === 1 ?
                props.playOne(props) :
                props.setState({
                    autoPlay: true,
                    autoRewind: false,
                    targetSolveIndex: props.state.solvedSet.length
                });
        }

        function fastrewind(props) {
            props.setState({ autoPlay: false, autoRewind: true, targetSolveIndex: 0 });
        }

        function pauseSolver(props) {
            props.setState({ autoPlay: false, autoRewind: false });
        }


        return <div className="controllerBox" style={{ width: `30vw` }}>
            <div className="buttonWrapper">

            <div className="solverButtonDiv rewindOne">
                <button
                    className={`solverButton`}
                    onClick={() => this.props.rewindOne(this.props)}>
                    Previous {previousMove}
                </button>
            </div>
            <div className="solverButtonDiv playOne">
                <button
                    className={`solverButton`}
                    onClick={() => this.props.playOne(this.props)}>
                    Next {nextMove}
                </button>
            </div>
            <div className="solverButtonDiv rewindAll">
                {this.props.state.autoRewind ?
                    <button
                        className={`solverButton`}
                        onClick={() => pauseSolver(this.props)}>
                        <div style={{ width: "100%" }}>Pause</div> Solver
                    </button>
                    :
                    <button
                        className={`solverButton`}
                        onClick={() => fastrewind(this.props)}>
                        <div style={{ width: "100%" }}>Auto</div> Rewind
                    </button>
                }
            </div>
            <div className="solverButtonDiv fastforward">
                {this.props.state.autoPlay ?
                    <button
                        className={`solverButton`}
                        onClick={() => pauseSolver(this.props)}>
                        <div style={{ width: "100%" }}>Pause</div> Solver
                    </button>
                    :
                    <button
                        className={`solverButton`}
                        onClick={() => fastforward(this.props)}>
                        <div style={{ width: "100%" }}>Auto</div> Forward
                    </button>
                }
            </div>
                
            </div>

        </div>
    }
}

export default React.memo(SideSolverControls);