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

export default class CompareGraph extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      chartOptions: {

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
        colors: [
                '#F2784B',
                '#1BA39C',
                '#913D88',
                '#4d79ff',
                '#80ff00',
                '#ff8000',
                '#00ffff',
                '#ff4000'
            ], 
        series:   []
      }
    }
  }

  componentDidMount() {
    console.log("dump json");
    console.log(this.props.indicatorData);
    this.setState({
     chartOptions: {
       series: this.props.indicatorData
     }
   });

  }

  componentWillReceiveProps(nextProps){
    this.setState({
     chartOptions: {
       series: nextProps.indicatorData
       }
    });

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
