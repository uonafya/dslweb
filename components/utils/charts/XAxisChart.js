import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      options: {
          xAxis: {
            type: 'category',
            data: null
          },
          yAxis: {
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'line'
              }
          },
          color: 'black',
          series: [{
            data: null,
            type: 'bar'
          }]
        }
    }
  }

  componentDidMount(){
    console.log("mounting component")
    this.setState({
      options:{
        xAxis: {
          data: this.props.cat
        },
        color: this.props.color,
        series: [{
          data: this.props.vals,
          type: this.props.chartType
        }]
      }
    });
  }

  componentDidUpdate(prevProps){
    if(
      this.props.cat != prevProps.cat ||
      this.props.vals  != prevProps.vals ||
      this.props.chartType  != prevProps.chartType)
    {
      this.setState({
        options:{
          xAxis: {
            data: this.props.cat
          },
          color: this.props.color,
          series: [{
            data: this.props.vals,
            type: this.props.chartType
          }]
        }
      });
    }

  }

  render() {
    return (

        <ReactEcharts
          option={this.state.options}
        />

      );
    }
}
