import React from 'react';
import ReactEcharts from 'echarts-for-react';


export default class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      options: {
          xAxis: {},
          yAxis: {},
          series: [{
              symbolSize: 20,
              data: [

              ],
              type: 'scatter'
          }]
      }
    }
  }

  componentDidMount(){
    this.setState({
      options:{
        series: [{
          data: this.props.data,
        }]
      }
    });
  }

  componentDidUpdate(prevProps){
    if(this.props.data != prevProps.data){
        this.setState({
          options:{
            series: [{
              data: this.props.data,
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
