import React, {
  PureComponent
} from 'react';
import { ConvertToMonthlyLineGraph2 } from './converters/Charts'
import { FetchIndicatorData } from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import OrgUnitNestedMenu from './OrgUnitNestedMenu'
import GenericYearDropDown from './GenericYearDropDown'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class IndicatorLineGraph extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {
        period: 2019,
        ouid: 18,
        countyList: [],
        id: this.props.id,
        title: null,
        chart: {
                type: 'line'  // can be line, bar or column
                },
        title: {
          text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Indicator Value'
            }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
            },
          column: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
            },
          bar: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
            },
          area: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: true
            }
        },

        series:  [{}]
      }
    }
  }

  fetchAndUpdateData= (id,ouid,pe,level)=>{
    (async () => {
      var is_error = false
      var err_msg = ''
      console.log(id,ouid,pe);
      let {indicatorData}=await FetchIndicatorData(id,ouid,pe,level,null);
      var _data;
      if(indicatorData.messageType != undefined){
        is_error = true
        err_msg = indicatorData.messageType + ' ' + indicatorData.mesageContent
      }else{
        _data=ConvertToMonthlyLineGraph2(indicatorData.result);
        console.log(_data);
        if(_data==undefined){
          _data=[];
          this.setState({
            title: "No data for selected parameter" // for components calling this component without inner filters
          });
        }

        else{
          if(_data.length==1){
            this.setState({
              title:_data[0]['name']
            });
          }
        }
      }
      if(this.props.type!=null){
        this.setState({
         chartOptions: {
           chart: {
             type: this.props.type
           }
         }
       });
      }
      this.setState({
       chartOptions: {
         series: _data,
         is_error: is_error,
         err_msg: err_msg
       }
     });
    })()
  }

  componentDidMount() {
    this.fetchAndUpdateData(this.props.id,this.props.ouid,this.props.pe,this.props.level);
  }

  componentWillReceiveProps(nextProps){
    console.log("called");
    this.fetchAndUpdateData(nextProps.id,nextProps.ouid,nextProps.pe,this.props.level);
    this.setState({
      title: null // for components calling this component without inner filters
    });
  }

  handleChangePeriod =(year)=> {
    this.setState({ period: year });
    this.fetchAndUpdateData(this.props.id,this.state.ouid,year);
  }

  handleOrgUnitChange=(orgUnitId)=> {
    console.log(orgUnitId);
    this.setState({ ouid: orgUnitId });
    this.fetchAndUpdateData(this.props.id,orgUnitId,this.state.period);
  }

  changeChartType=(type,event)=> {
    this.setState({
     chartOptions: {
       chart: {
         type: type
       }
     }
   });
  }

  render(){
    const { chartOptions } = this.state;

    let graphTyep=<div style={{display: "inline-block", float: "right"}}>

                      <button className="button is-small is-white" data_type onClick = {(e)=>this.changeChartType('line',e)}><i className="fas fa-chart-line"></i> &nbsp; Line</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('column',e)}><i className="fas fa-chart-bar"></i> &nbsp; Bar</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('bar',e)}><i class="fas fa-bars"></i> &nbsp; Vertical bar</button>
                      &nbsp;
                      <button className="button is-small is-white" onClick = {(e)=>this.changeChartType('area',e)}><i class="fas fa-chart-area"></i> &nbsp; Area</button>
                  </div>

    const renderFrag = ()=> {
      if(this.props.selfContained){
        return <div className="column ">
            <div>
              <div style={{display: "inline-block"}}>
                <GenericYearDropDown handleChangePeriod={this.handleChangePeriod}/>
              </div>
              <div style={{display: "inline-block", marginLeft: "2px"}}>
                <OrgUnitNestedMenu name={this.props.label} level={['1','2','3']} callBackHandler={this.handleOrgUnitChange} elId={`${this.state.ouid} indicatorChart`}/>
              </div>
              {graphTyep}
            </div>

            <div className="box m-5">
              <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center"> {this.state.title}</h5>
              <br/>
                 <div>
                  <HighchartsReact highcharts = { Highcharts } options = {chartOptions}/>
                </div>
            </div>
          </div>
      }else{
        return <div >
          <HighchartsReact highcharts = { Highcharts } options = {chartOptions}/>
        </div>
      }

    }
    return(
      <React.Fragment>
        {renderFrag()}
      </React.Fragment>
    )
  }

}
