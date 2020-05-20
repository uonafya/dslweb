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
    };

  }

  componentDidMount(){
    let _data;
    let category=[];
    let sourceId=this.props.indicatorSource;
    let indicId=this.props.indicatorId;
    (async () => {

        let returnedData=await fetchSurveyData(sourceId,indicId);
        this.props.setReturnedData(returnedData.result); //callback fn
        let {convertdata, cat, indicName}=ConvertSurveyDataToGraph(returnedData.result);
        category=cat;
        _data=convertdata;

        //if period is not available, use data source for xaxisLabel
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
        //callback fn
        this.props.setIndicatorName(indicName);
     })();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.genderId  != prevProps.genderId ||
      this.props.categoryId  != prevProps.categoryId ||
      this.props.period  != prevProps.period ||
      this.props.ouid != prevProps.ouid
     ) {

       let _data;
       let category=[];
       let sourceId=this.props.indicatorSource;
       let indicId=this.props.indicatorId;
       let pe=this.props.period;
       let genderId= this.props.genderId;
       let categoryId= this.props.categoryId;
       let orgId=this.props.ouid;
       let catId;
       if(genderId != null && categoryId != null){
         catId=genderId+";"+categoryId;
       }else if(genderId != null){
         catId=genderId;
       }else if(categoryId != null){
         catId=categoryId;
       }else{}

       (async () => {

           let returnedData=await fetchSurveyData(sourceId,indicId,orgId,pe,catId);
           //this.props.setReturnedData(returnedData.result); //callback fn
           let {convertdata, cat, indicName}=ConvertSurveyDataToGraph(returnedData.result);
           category=cat;
           _data=convertdata;

           //if period is not available, use data source for xaxisLabel
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
           //callback fn
           this.props.setIndicatorName(indicName);
        })();

    }
  }


  render () {
    return (
      <div>
        <SurveyGraph data={this.state.data} xaxisLabel={this.state.xaxisLabel} chartType={this.state.chartType}/>
      </div>
    );
  }
}
