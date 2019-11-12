import React, { Component } from 'react';
import IndicatorLineBarGraph from './utils/IndicatorBarGraph';
import IndicatorLineGraph from './utils/IndicatorLineGraph';

class Displayline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLine: false,
            displayBar: true
        };

        this.showLineGraph = this.showLineGraph.bind(this)
        this.showBarGraph = this.showBarGraph.bind(this)
        this.ouid = this.props.ouid[0]
        this.id = this.props.id
        this.pe = this.props.pe[0]
       
      }
    
      showLineGraph() {
        this.setState({
            displayLine: true,
            displayBar: false
        })
      }
  
      showBarGraph() {
        this.setState({
            displayBar: true,
            displayLine:false
        });
      }
  
    render() {
         const showLine = this.state.displayLine;
         const showBar = this.state.displayBar;
        let display;
      
        if (showLine){
            display = <div> <IndicatorLineGraph id={this.id} ouid = {this.ouid} pe={this.pe} /></div>
        }else{
            display = <div> <IndicatorLineBarGraph id={this.id} ouid = {this.ouid} pe={this.pe}  /> </div>
        }

        return (
            <div>
                <div>
                    <div><button onClick = {this.showLineGraph}>Linegraph</button>
                    <button onClick = {this.showBarGraph}>Bargraph</button> </div>
                    {display}
                </div>
            
            </div>
        )
    }
}

export default Displayline
