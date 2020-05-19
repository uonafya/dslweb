import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {FetchCountyList,fetchSurveyData, fetchSurveySources} from '../Helpers'
import { ConvertSurveyDataToGraph } from '../converters/Charts'
import SurveyGraph from '../SurveyGraph'
import OrgUnitNestedMenu from '../OrgUnitNestedMenu'

export default class SurveyDataMiddleware extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      ouid: 18,
      xaxisLabel: null,
      indicName: null,
      data: null,
      chartType: 'column',
      countyList: []
    };

    this.handleOrgUnitChange = this.handleOrgUnitChange.bind(this);
    this.handleChangePeriod = this.handleChangePeriod.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  componentDidMount(){

    //<LifeExpectancyAtBirth indicatorId={key} indicatorSource={indicatorMap[key]['sourceId']}/>
    let _data;
    let category=[];
    let sourceId=this.props.indicatorSource;
    let indicId=this.props.indicatorId;
    (async () => {

        let returnedData=await fetchSurveyData(sourceId,indicId);

        let {convertdata, cat, indicName}=ConvertSurveyDataToGraph(returnedData.result);
        category=cat;
        _data=convertdata;

        if(category.length==0){
          let surveySourcs=await fetchSurveySources();
          surveySourcs.forEach( source =>{
            if(source['id']==sourceId) category.push(source['name']);
          });
        }

        this.setState({
          data: _data,
          xaxisLabel: category,
          indicName: indicName
        });
        this.props.setIndicatorName(indicName);
     })();
  }

  handleChangePeriod(year) {
    this.setState({ period: year });
  }

  handleOrgUnitChange(orgUnitObject) {
    this.setState({ ouid: orgUnitObject });
  }

  handleCategoryChange(category) {
    this.setState({ ouid: orgUnitObject });
  }

  render () {
    return (
      <div>
        <SurveyGraph data={this.state.data} xaxisLabel={this.state.xaxisLabel} chartType={this.state.chartType}/>
      </div>
    );
  }
}
