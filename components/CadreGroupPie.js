import React, {
  PureComponent
} from 'react';
import { ConvertToCadreGroupPieChart } from './utils/converters/Charts'
import {FetchCadreGroupAllocation} from './utils/Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class CadreGroupPieChart extends PureComponent {

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
          text: "title"
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
        series: "series"
      }
    }

  }
  componentDidMount() {
    (async () => {
      let returnedData = await FetchCadreGroupAllocation(this.props.id, this.props.ouid, this.props.pe);
      let data=ConvertToCadreGroupPieChart(returnedData);
      this.setState({
       chartOptions: {
         series: data
       }
     });
    })()

    if(this.props.title!=null) this.setState({
      chartOptions: {
        title: {text: this.props.title}
      }
    });
  }


  componentWillReceiveProps(nextProps){
    (async () => {
      let returnedData = await FetchCadreGroupAllocation(nextProps.id, nextProps.ouid, nextProps.pe);
      let data=ConvertToCadreGroupPieChart(returnedData);
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

  render(){
    const { chartOptions } = this.state;
    return(
      < div >
        <HighchartsReact highcharts = { Highcharts } options = {chartOptions}/>
      </div>
    )
  }

}
