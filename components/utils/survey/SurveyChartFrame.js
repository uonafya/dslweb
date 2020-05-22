import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import SurveyDataMiddleware from './SurveyDataMiddleware'
import SurveyFilterWrapper from '../../survey/SurveyFilterWrapper'

export default class SurveyChartFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      indicatorName: this.props.indicatorName,
      indicatorId: this.props.indicatorId,
      indicatorSource: this.props.indicatorSource,
      genderId: null,
      categoryId: null,
      period: null,
      ouid: null,
      chartType: 'column',
      initialReturnedData: null
    };

  }

  setIndicatorName = (indicName)=>{
    this.setState({
      indicatorName: indicName
    });
  }

  prepareGraphFilters= (apiJsonData)=>{

  }

  setInitialReturnedData =(returnedData)=>{
    this.setState({
      initialReturnedData: returnedData
    });
  }

  handleChangePeriod= (period)=> {
    console.log(period);
    this.setState({ period: period });
  }

  handleOrgUnitChange=(orgUnitObject) => {
    console.log(orgUnitObject);
    this.setState({ ouid: orgUnitObject });
  }

  handleGenderChange= (gerderObject) => {
    console.log(gerderObject);
    this.setState({ genderId: gerderObject });
  }

  handleCategoryChange=(categoryObject) => {
    console.log(categoryObject);
    this.setState({ categoryId: categoryObject });
  }

  componentDidUpdate(prevProps) {
    if (this.props.indicatorId != prevProps.indicatorId) {

    }
  }

  changeChartType=(type,event)=> {
    this.setState({
     chartType: type
   });
  }

  render () {
    let graphTyep=<div style={{display: "inline-block", float: "right"}}>

                      <button className="button is-small is-white" data_type onClick = {(e)=>this.changeChartType('line',e)}><i className="fas fa-chart-line"></i> &nbsp; Line</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('column',e)}><i className="fas fa-chart-bar"></i> &nbsp; Bar</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('bar',e)}><i class="fas fa-bars"></i> &nbsp; Vertical bar</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('area',e)}><i class="fas fa-chart-area"></i> &nbsp; Area</button>
                  </div>
    return (

        <div class="column ">
          <div>
            <SurveyFilterWrapper
              handleOrgUnitChange = {this.handleOrgUnitChange}
              handleGenderChange = {this.handleGenderChange}
              handleChangePeriod = {this.handleChangePeriod}
              handleCategoryChange = {this.handleCategoryChange}
              initialReturnedData = {this.state.initialReturnedData}/>
             {graphTyep}
          </div>
          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{this.state.indicatorName}</h5>
            <br/>
            <SurveyDataMiddleware
              setReturnedData={this.setInitialReturnedData}
              setIndicatorName={this.setIndicatorName}
              indicatorId={this.state.indicatorId}
              genderId={this.state.genderId}
              categoryId={this.state.categoryId}
              period={this.state.period}
              ouid={this.state.ouid}
              chartType={this.state.chartType}
              indicatorSource={this.state.indicatorSource}/>
          </div>
        </div>

    );
  }
}
