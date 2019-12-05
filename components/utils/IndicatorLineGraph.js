import React, {
  PureComponent
} from 'react';
import { ConvertToMonthlyLineGraph2 } from './converters/Charts'
import { FetchIndicatorData } from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class IndicatorLineGraph extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {
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

  componentDidMount() {
    (async () => {
      var is_error = false
      var err_msg = ''
      let {indicatorData}=await FetchIndicatorData(this.props.id,this.props.ouid,this.props.pe,this.props.level,null);
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

  componentWillReceiveProps(nextProps){
    (async () => {
      var is_error = false
      var err_msg = ''
      let {indicatorData}=await FetchIndicatorData(nextProps.id,nextProps.ouid,nextProps.pe,this.props.level,null);
      var _data;
      if(indicatorData.messageType != undefined){
        is_error = true
        err_msg = indicatorData.messageType + ' ' + indicatorData.mesageContent
      }else{
        _data=ConvertToMonthlyLineGraph2(indicatorData.result);
      }
      if(nextProps.type!=null){
        this.setState({
         chartOptions: {
           chart: {
             type: nextProps.type
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
     })();
  }

  render(){
    const { chartOptions } = this.state;
    return(
      <div >
        <HighchartsReact highcharts = { Highcharts } options = {chartOptions}/>
      </div>
    )
  }

}
