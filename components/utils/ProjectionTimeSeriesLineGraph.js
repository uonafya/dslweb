import React, {
  PureComponent
} from 'react';
import { ConvertToMonthlyLineGraph2 } from './converters/Charts'
import {ConvertTimeSeriesLineGraph,ConvertIndicToIndicMultiVarForecastLineGraph} from './converters/Charts'
import { fetchTimeSeriesData } from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class ProjectionTimeSeriesLineGraph extends PureComponent {

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
            labels: {
        // formatter: function() {
        //   return Highcharts.dateFormat('%b %Y', this.value);
        // }
      },
            title: {
                text: 'Period'
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
    if(this.props.data){

      let returnedSeriesData;

      if(this.props.indicBivariate == true){
        returnedSeriesData=ConvertIndicToIndicMultiVarForecastLineGraph(this.props.data, this.props.indicatorId);
      }else{
        returnedSeriesData=ConvertTimeSeriesLineGraph(this.props.data);
       }

      let data =returnedSeriesData.data
      let subtitle =returnedSeriesData.subtitle;
      let title =returnedSeriesData.title;
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
    }
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.data){
      let returnedSeriesData;
      if(this.props.indicBivariate == true){
        returnedSeriesData=ConvertIndicToIndicMultiVarForecastLineGraph(nextProps.data, this.props.indicatorId);
      }else{
        returnedSeriesData=ConvertTimeSeriesLineGraph(nextProps.data);
       }

      let data =returnedSeriesData.data
      let subtitle =returnedSeriesData.subtitle;
      let title =returnedSeriesData.title;
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
    }
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
