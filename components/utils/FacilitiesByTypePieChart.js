import React, { PureComponent } from 'react';
import { ConvertToLineBarGraph, ConvertToFacilityGroupPieChart } from './converters/Charts'
import { FetchFacilityCountByType } from './Helpers'
import {
  PieChart, Pie, Legend, Tooltip,Cell
} from 'recharts';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

let _convertedData=[{}]; 

const COLORS = ['#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE','#00C49F','#2f4b7c',
                '#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F', '#FF8042',
                '#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F',
                '#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F'
];

export default class FacilityPieGraph extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: true
        },
        //        tooltip: {
        //            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        //        }
        tooltip: {
          pointFormat: '<b>{point.percentage:.2f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        colors: [
          '#F2784B',
          '#1BA39C',
          '#913D88'
        ],
        series: "kenya"
      }
    }

  }

  componentDidMount() {
    (async () => {
      let returnedData=await FetchFacilityCountByType();
      var _data=ConvertToFacilityGroupPieChart(returnedData);     
      this.setState({
        chartOptions: {
          series: _data
        }
      })
      
    })()
    if(this.props.title!=null) this.setState({
      chartOptions: {
        title: {text: this.props.title}
      }
    });
  };

  componentWillReceiveProps(nextProps){
    (async () => {
      let returnedData = await FetchFacilityCountByType();
      let data=ConvertToFacilityGroupPieChart(returnedData);
      this.setState({ 
       chartOptions: {
         series: data
       }
     });
    })()

    if(nextProps.title!=null) this.setState({
      chartOptions: {
        title: {text: nextProps.title}
      }
    });
  }

  render() {
    return (
        <div>
          <HighchartsReact highcharts = { Highcharts } options = {this.state.chartOptions}/>
        </div>
    );
  }
}
