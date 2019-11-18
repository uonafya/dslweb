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
        this.ouid = this.props.ouid
        this.id = this.props.id
        this.pe = this.props.pe

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
            display = <div className="w-100-pc"> <IndicatorLineGraph id={this.id} ouid = {this.ouid} pe={this.pe} /></div>
        }else{
            display = <div className="w-100-pc">  <IndicatorLineBarGraph id={this.id} ouid = {this.ouid} pe={this.pe}  /> </div>
        }

        return (
            <div className="w-100-pc">
                <div className="w-100-pc">
                    <button className="button is-small is-black" onClick = {this.showLineGraph}><i className="fas fa-chart-line"></i> &nbsp; Line</button>
                    &nbsp; &nbsp;
                    <button className="button is-small is-black" onClick = {this.showBarGraph}><i className="fas fa-chart-bar"></i> &nbsp; Bar</button>
                </div>
                <div className="w-100-pc">
                    {display}
                </div>
            </div>
        )
    }
}

export default Displayline
