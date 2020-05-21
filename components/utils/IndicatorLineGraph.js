import React, {
  PureComponent
} from 'react';
import { ConvertToMonthlyLineGraph2 } from './converters/Charts'
import { FetchIndicatorData } from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import CountyDropDown from './CountyDropDown'
import YearDropDown from './YearDropDown'

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

  render(){
    const { chartOptions } = this.state;
    const renderFrag = ()=> {
      if(this.props.selfContained){
        return <div className="column ">
            <div>
              <div style={{display: "inline-block"}}>
                <YearDropDown handler={this.handleChangePeriod} />
              </div>
              <div style={{display: "inline-block", marginLeft: "2px"}}>
                <CountyDropDown handler={this.handleOrgUnitChange}/>
              </div>
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
