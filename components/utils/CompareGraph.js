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
    console.log("will receive ====>");
    console.log(nextProps.indicatorData);
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
