import React, { Component } from 'react';
import IndicatorLineBarGraph from './utils/IndicatorBarGraph';
import IndicatorLineGraph from './utils/IndicatorLineGraph';

class Displayline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayLine: true,
            displayBar: true,
            displayArea: false,
            displayInvertedBar: false,
        };

        this.showLineGraph = this.showLineGraph.bind(this)
        this.showBarGraph = this.showBarGraph.bind(this)
        this.showAreaGraph = this.showAreaGraph.bind(this)
        this.showInvertedBarGraph = this.showInvertedBarGraph.bind(this)

        // this.ouid = this.props.ouid[0]
        this.ouid = this.props.ouid
        this.id = this.props.id
        // this.pe = this.props.pe[0]
        this.pe = this.props.pe
        this.level = this.props.level

      }

      showLineGraph() {
        this.setState({
            displayLine: true,
            displayBar: false,
            displayArea: false,
            displayInvertedBar: false
        })
      }

      showBarGraph() {
        this.setState({
            displayBar: true,
            displayLine:false,
            displayArea: false,
            displayInvertedBar: false
        });
      }

      showAreaGraph() {
        this.setState({
            displayBar: false,
            displayLine:false,
            displayArea: true,
            displayInvertedBar: false
        });
      }

      showInvertedBarGraph() {
        this.setState({
            displayBar: false,
            displayLine:false,
            displayArea: false,
            displayInvertedBar: true
        });
      }

    render() {
         const showLine = this.state.displayLine;
         const showBar = this.state.displayBar;
         const showArea = this.state.displayArea;
         const showVeritcalBar = this.state.displayInvertedBar;

        let display;

        if (showLine){
            display =
             <div className="w-100-pc">
                <div className="box m-5">
                 <IndicatorLineGraph type={'line'} level={this.level} id={this.id} ouid = {this.ouid} pe={this.pe} />
                </div>
             </div>
        }else if(showBar){
            display =
             <div className="w-100-pc">
                <div className="box m-5">
                  <IndicatorLineGraph type={'column'} level={this.level} id={this.id} ouid = {this.ouid} pe={this.pe} />
                </div>
             </div>
        }else if(showArea){
            display =
             <div className="w-100-pc">
                <div className="box m-5">
                  <IndicatorLineGraph type={'area'} level={this.level} id={this.id} ouid = {this.ouid} pe={this.pe} />
                </div>
             </div>
        }else if(showVeritcalBar){
            display =
             <div className="w-100-pc">
                <div className="box m-5">
                  <IndicatorLineGraph type={'bar'} level={this.level} id={this.id} ouid = {this.ouid} pe={this.pe} />
                </div>
             </div>
        }else{

        }

        return (
            <div className="w-100-pc">
                <div className="w-100-pc">
                    <button className="button is-small is-black" onClick = {this.showLineGraph}><i className="fas fa-chart-line"></i> &nbsp; Line</button>
                    &nbsp; &nbsp;
                    <button className="button is-small is-black" onClick = {this.showBarGraph}><i className="fas fa-chart-bar"></i> &nbsp; Bar</button>
                    &nbsp; &nbsp;
                    <button className="button is-small is-black" onClick = {this.showInvertedBarGraph}><i class="fas fa-bars"></i> &nbsp; Vertical bar</button>
                    &nbsp; &nbsp;
                    <button className="button is-small is-black" onClick = {this.showAreaGraph}><i class="fas fa-chart-area"></i> &nbsp; Area</button>

                </div>
                <div className="w-100-pc">
                    {display}
                </div>
            </div>
        )
    }
}

export default Displayline
