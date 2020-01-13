import React, {
  PureComponent
} from 'react';
import { ConvertToMonthlyLineGraph2 } from './converters/Charts'
import {ConvertTimeSeriesLineGraph} from './converters/Charts'
import { fetchTimeSeriesData } from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class TimeSeriesLineGraph extends PureComponent {

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
            type: 'datetime',
            dateTimeLabelFormats: {
                year: '%Y'
            }
        },
        credits: {
          enabled: false
        },
        series: []
      }
    }
  }


  componentDidMount() {
    console.log("testing ==========>1");
    (async () => {
      var is_error = false
      var err_msg = ''
      let indicatorData=await fetchTimeSeriesData(23185,18,null,null);
      console.log(indicatorData);
      let returnedSeriesData=ConvertTimeSeriesLineGraph(indicatorData.result);
      let data =returnedSeriesData.data
      let subtitle =returnedSeriesData.subtitle;
      let title =returnedSeriesData.title;
      console.log(subtitle);
      this.setState({
       chartOptions: {
         series: [data],
         subtitle: {
           text: subtitle
         },
         title: {
           text: title
         }
       }
     });
    })()
    console.log("testing ==========>2");
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
