import React, {
  PureComponent
} from 'react';
import { ConvertToCadreGroupPieChart } from './converters/Charts'
import {FetchCadreGroupAllocation} from './Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class IndicatorLineGraph2 extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {
        chart: {
                  zoomType: 'xy'
                },
        title: {
            text: ""
        },
//        subtitle: {
//            text: 'Source: WorldClimate.com'
//        },
        xAxis: [{
                categories: "",
                crosshair: true
            }],
        yAxis: [{// Primary yAxis
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'commodity units',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: false

            }, {// Secondary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'indicator value', //text on the y or x axis
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                }

            }, {// Tertiary yAxis
                gridLineWidth: 0,
                title: {
                    text: 'cadre count',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                labels: {
                    format: '{value}',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                opposite: true
            }],
        credits: {
            enabled: false
        },
        exporting: {
            enabled: true
        },
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || 'rgba(255,255,255,0.25)'
        },
        series: [{
                    name: 'Installation',
                    data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                }, {
                    name: 'Manufacturing',
                    data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                }, {
                    name: 'Sales & Distribution',
                    data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                }, {
                    name: 'Project Development',
                    data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                }, {
                    name: 'Other',
                    data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                }]
      }
    }

  }
  componentDidMount() {

  }


  componentWillReceiveProps(nextProps){

  }

  render(){
    const { chartOptions } = this.state;
    return(
      < div >
        <HighchartsReact highcharts = { Highcharts } options = {chartOptions}/>
      </div>
    )
  }

}
