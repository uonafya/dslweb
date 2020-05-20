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

  handleChangePeriod= (year)=> {
    this.setState({ period: year });
  }

  handleOrgUnitChange=(orgUnitObject) => {
    this.setState({ ouid: orgUnitObject });
  }

  handleGenderChange= (gerderObject) => {
    console.log(gerderObject);
    this.setState({ genderId: gerderObject });
  }

  handleCategoryChange=(categoryObject) => {
    this.setState({ categoryId: categoryObject });
  }

  componentDidUpdate(prevProps) {
    if (this.props.indicatorId != prevProps.indicatorId) {

    }
  }

  render () {
    return (

        <div class="column ">
          <SurveyFilterWrapper
            handleOrgUnitChange = {this.handleOrgUnitChange}
            handleGenderChange = {this.handleGenderChange}
            handleChangePeriod = {this.handleChangePeriod}
            handleCategoryChange = {this.handleCategoryChange}
            initialReturnedData = {this.state.initialReturnedData}/>
          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{this.state.indicatorName}</h5>
            <br/>
            <SurveyDataMiddleware
              setReturnedData={this.setInitialReturnedData}
              setIndicatorName={this.setIndicatorName}
              indicatorId={this.state.indicatorId}
              indicatorSource={this.state.indicatorSource}/>
          </div>
        </div>

    );
  }
}
