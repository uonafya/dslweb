import React, {
  PureComponent
} from 'react';
import { ConvertToCadreGroupPieChart } from './utils/converters/Charts'
import {FetchCadreGroupAllocation} from './utils/Helpers'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

export default class CadreGroupPieChart extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      period: 2019,
      ouid: 18,
      countyList: [],
      title: "",
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
        series: "series"
      }
    }

  }

  componentDidMount() {
    this.handleStateChange(this.state.ouid, this.state.pe);
    if(this.state.title!=null) this.setState({
      chartOptions: {
        title: {text: this.state.title}
      }
    });
  }

  componentWillReceiveProps(nextProps){
    this.handleStateChange(nextProps.ouid, nextProps.pe);

    if(nextProps.title!=null) this.setState({
      chartOptions: {
        title: {text: nextProps.title}
      }
    });
  }

  handleStateChange=(ouid,year)=>{
    if(year == null || year ==undefined){
      year=this.state.period;
    }
    if(ouid == null || ouid ==undefined){
      ouid=this.state.ouid;
    }
    (async () => {
      let groupId=null;
      let returnedData = await FetchCadreGroupAllocation(groupId, ouid, year);
      let data=ConvertToCadreGroupPieChart(returnedData);
      this.setState({
        chartOptions: {
          series: data
        }
     });
    })()
  }

  handleChangePeriod=(year)=> {
    this.handleStateChange(null,year);
    this.setState({ period: year });
  }

  handleOrgUnitChange=(orgUnitId)=> {
    this.handleStateChange(orgUnitId,null);
    this.setState({ ouid: orgUnitId });
  }

  render(){
    const { chartOptions } = this.state;

    const renderFrag = ()=> {
      if(this.props.selfContained){
        return   <div class="column ">
              <div>
                <div style={{display: "inline-block"}}>
                  <YearDropDown handler={this.handleChangePeriod} />
                </div>
                <div style={{display: "inline-block", marginLeft: "2px"}}>
                  <CountyDropDown handler={this.handleOrgUnitChange}/>
                </div>
              </div>

              <div className="box m-5">
                <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{this.props.title}</h5>
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
