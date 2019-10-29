import React, { PureComponent } from 'react';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'


export default class UhcIndicators extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      id: 61829,
      ouid: 18,
      pe: 2018,
      indicatorName: "Fresh still birth rate"
    };
  }

  render() {

    const handleClick = e => {
        e.preventDefault();
        this.setState({id: e.target.id,indicatorName: e.target.innerHTML});
      }

    return (
      <div className="column">
          <h5 className="title m-b-0 m-l-10 is-6">UHC</h5>
          <br/>
          <h4 className="title m-b-0 m-l-10 is-6">National {this.state.indicatorName} - 2018</h4>
          <div id="uhc-diplay-area">
            <IndicatorLineBarGraph  id={this.state.id} ouid={this.state.ouid} pe={this.state.pe}/>
          </div>
          <div className="p-l-15">
            <a href="#" id="31584" onClick={handleClick} className="is-link text-smaller">Facility Maternal Mortality Ratio</a> <br/>
            <a href="#" id="11965653" onClick={handleClick} className="is-link text-smaller">Malaria Deaths</a> <br/>
            <a href="#" id="93336" onClick={handleClick} className="is-link text-smaller">TB patients who have completed treatment Total</a> <br/>
            <a href="#" id="21030" onClick={handleClick} className="is-link text-smaller">Malaria confirmed cases ratio</a> <br/>

          </div>
      </div>
    )
  }
}
