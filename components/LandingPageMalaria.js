import React, { PureComponent } from 'react';
import  IndicatorLineGraph from './utils/IndicatorLineGraph'

export default class MalariaIndicators extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      id: 93323,
      ouid: 18,
      pe: 2018,
      indicatorName: "Total number of patients over 5 years treated for Malaria"
    };
  }

  render() {

    const handleClick = e => {
        e.preventDefault();
        this.setState({id: e.target.id,indicatorName: e.target.innerHTML});
      }

    return (
      <div className="column">
          <h5 className="title m-b-0 m-l-10 is-6 graph-head">Malaria</h5>
          <br/>
          <h4 className="title m-b-0 m-l-10 is-6">National {this.state.indicatorName} - 2018</h4>
          <div id="uhc-diplay-area">
            <IndicatorLineGraph  id={this.state.id} ouid={this.state.ouid} pe={this.state.pe}/>
          </div>
          <div className="p-l-15">
            <a href="#" id="93323" onClick={handleClick} className="is-link text-smaller">Total number of patients over 5 years treated for Malaria</a> <br/>
            <a href="#" id="27885992" onClick={handleClick} className="is-link text-smaller">Total Number of Confirmed Malaria cases</a> <br/>
            <a href="#" id="27915183" onClick={handleClick} className="is-link text-smaller">Total number of malaria tests (RDT + BS)</a> <br/>
            <a href="#" id="59033708" onClick={handleClick} className="is-link text-smaller">Malaria test uptake</a> <br/>

          </div>
      </div>
    )
  }
}
