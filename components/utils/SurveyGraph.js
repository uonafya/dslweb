import React, {
  PureComponent
} from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class SurveyGraph extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {
        chart: {
                type: null  // can be line, bar or column
        },
        title: {
          text: ''
        },

        subtitle: {
            text: ''
        },

        yAxis: {
            title: {
                text: 'Value'
            }
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          borderWidth: 0
        },
        xAxis: {
            categories: null,
            title: {
              text: 'Period'
            },
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
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
              enableMouseTracking: false
            },
          area: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
            }
        },
        series:  null
      }
    }
  }

  componentDidMount(){
  }

  componentDidUpdate(prevProps) {
    if (this.props.data != prevProps.data) {
      this.setState({
        chartOptions: {
           series:  this.props.data,
           xAxis: {
               categories: this.props.xaxisLabel
           },
           chart: {
                type: this.props.chartType
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
