import React from 'react';
import "./Controls.css";


let centerButtons=[];
let singleButtons=[];
let multiButtons=[];
let singleCols=[];
let multiCols=[];
let key=0;

function namesToColors(face){
    switch(face){
        case 'F':
            return {
                bgc: 'white',
                color: 'black',
            }
        case 'U':
            return {
                bgc: 'blue',
                color: 'white',
            }
        case 'R':
            return {
                bgc: 'red',
                color: 'white',
            }
        case 'B':
            return {
                bgc: 'yellow',
                color: 'black',
            }
        case 'L':
            return {
                bgc: 'orange',
                color: 'black',
            }
        case 'D':
            return {
                bgc: 'green',
                color: 'white',
            }
        default:
    }

}

//generate data for buttons and pass down to props. Better than trying to do in here
const Controls = props => {
    centerButtons=[];
    singleButtons=[];
    multiButtons=[];
    singleCols=[];
    multiCols=[];

    return (
        <div id="controlsDiv">
            {
                props.size%2 ? 
                <div className="centerMoves" style={{marginRight: "5px"}}>
                    <div className='centerLayerColumns'>
                    {
                        props.generatedButtons.center.forEach(element => {
                            centerButtons.push(
                                <div className="moveBtn" 
                                        key={key} 
                                        onMouseDown={() => props.rotateOneFace(element.clockwise.name,element.clockwise.data)} 
                                        style={{position:"relative", left: "0px",backgroundColor: "magenta",width:"45px"}}
                                        onMouseEnter={(e)=>props.mouseEnter(element.clockwise.name,element.clockwise.data,e)}
                                        onMouseLeave={()=>props.mouseLeave()}
                                        >
                                        
                                    {element.clockwise.name}
                                </div>
                            );
                            key+=1
                            centerButtons.push(
                                <div className="moveBtn" 
                                        key={key} 
                                        onMouseDown={() => props.rotateOneFace(element.counter.name,element.counter.data)} 
                                        style={{position:"relative", left: "0px",backgroundColor: "magenta",width:"45px"}}
                                        onMouseEnter={()=>props.mouseEnter(element.counter.name,element.counter.data)}
                                        onMouseLeave={()=>props.mouseLeave()}
                                        >
                                    {element.counter.name}
                                </div>
                            );
                            key+=1
                        })
                    }
                    {centerButtons}
                    </div>
                </div> : ""
            }
            <div className="singleLayerMoves" style={{marginRight: "5px"}}>
                {
                    props.generatedButtons.single.forEach(element => {
                        let colors = namesToColors(element.counter.face);
                        if(element.counter.face === 'F') singleButtons.push([],[]);
                        let lengthBtns = singleButtons.length-2;
                        let lengthBtns1 = singleButtons.length-1;
                        singleButtons[lengthBtns].push(
                            <div className="moveBtn" 
                                    key={key} 
                                    onMouseDown={() => props.rotateOneFace(element.counter.name,element.counter.data)} 
                                    style={{position:"relative", left: "0px",backgroundColor: colors.bgc,color: colors.color,width:"45px"}}
                                    onMouseEnter={()=>props.mouseEnter(element.counter.name,element.counter.data)}
                                    onMouseLeave={()=>props.mouseLeave()}
                                    >
                                {element.counter.name}
                            </div>
                        )
                        key+=1;
                        singleButtons[lengthBtns1].push(
                            <div className="moveBtn" 
                                key={key} 
                                onMouseDown={() => props.rotateOneFace(element.clockwise.name,element.clockwise.data)} 
                                style={{position:"relative", left: "0px",backgroundColor: colors.bgc,color: colors.color,width:"45px"}}
                                onMouseEnter={()=>props.mouseEnter(element.clockwise.name,element.clockwise.data)}
                                onMouseLeave={()=>props.mouseLeave()}
                                >
                                {element.clockwise.name}
                            </div>
                        )
                        key+=1;
                    })

                }
                {
                    singleButtons.forEach(element =>{
                        key+=1;
                        singleCols.push(
                            <div key={key} className='singleLayerColumns'>
                                {element}
                            </div>
                        )
                    })
                }
                {
                    singleCols
                }
            </div>
            <div className="multiLayerMoves">
            {
                    props.generatedButtons.multi.forEach(element => {
                        let colors = namesToColors(element.counter.face);
                        if(element.counter.face === 'F') multiButtons.push([],[]);
                        let lengthBtns = multiButtons.length-2;
                        let lengthBtns1 = multiButtons.length-1;
                        multiButtons[lengthBtns].push(
                            <div className="moveBtn" 
                                key={key} 
                                onMouseDown={() => props.rotateOneFace(element.counter.name,element.counter.data)} 
                                style={{position:"relative", left: "0px",backgroundColor: colors.bgc,color: colors.color,width:"45px"}}
                                onMouseEnter={()=>props.mouseEnter(element.counter.name,element.counter.data)}
                                onMouseLeave={()=>props.mouseLeave()}
                                >
                                {element.counter.name}
                            </div>
                        )
                        key+=1;
                        multiButtons[lengthBtns1].push(
                            <div className="moveBtn" 
                                key={key} 
                                onMouseDown={() => props.rotateOneFace(element.clockwise.name,element.clockwise.data)} 
                                style={{position:"relative", left: "0px",backgroundColor: colors.bgc,color: colors.color,width:"45px"}}
                                onMouseEnter={()=>props.mouseEnter(element.clockwise.name,element.clockwise.data)}
                                onMouseLeave={()=>props.mouseLeave()}
                                >
                                {element.clockwise.name}
                            </div>
                        )
                        key+=1;
                    })

                }
                {
                    multiButtons.forEach(element =>{
                        key+=1;
                        multiCols.push(
                            <div key={key} className='multiLayerColumns'>
                                {element}
                            </div>
                        )
                    })
                }
                {
                    multiCols
                }
            </div>
        </div>
    )
}

export default Controls;