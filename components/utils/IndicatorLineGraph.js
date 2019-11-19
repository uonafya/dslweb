import React, { PureComponent } from 'react';
import { ConvertToMonthlyLineGraph } from './converters/Charts'
import { FetchIndicatorData } from './Helpers'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ReferenceArea,ResponsiveContainer
} from 'recharts';

class CustomizedLabel extends PureComponent {
  render() {
    const {
      x, y, stroke, value,
    } = this.props;

    return <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>;
  }
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={5} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-90)">{payload.value}</text>
      </g>
    );
  }
}


export default class IndicatorLineGraph extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {data: ''};
  }

  componentWillReceiveProps(nextProps){
    this.setState({id:nextProps.pe});
    let didPropsChange=false;

    if(nextProps.id!=this.props.id || nextProps.ouid!=this.props.ouid || nextProps.pe!=this.props.pe){
      (async () => {
        let {indicatorData}=await FetchIndicatorData(nextProps.id,nextProps.ouid,nextProps.pe,this.props.level,null);
        var _data=ConvertToMonthlyLineGraph(indicatorData.result.data);
         this.setState({data: _data,id: nextProps.id, ouid: nextProps.ouid, pe: nextProps.pe});
       })();
    }else{

      }
    }

  componentDidMount() {
    (async () => {
      var is_error = false
      var err_msg = ''
      let {indicatorData}=await FetchIndicatorData(this.props.id,this.props.ouid,this.props.pe,this.props.level,null);
      var _data
      if(indicatorData.messageType != undefined){
        is_error = true
        err_msg = indicatorData.messageType + ' ' + indicatorData.mesageContent
      }else{
        _data=ConvertToMonthlyLineGraph(indicatorData.result.data);
      }
      this.setState({data: _data, is_error: is_error, err_msg: err_msg});
    })()
  };

  render() {
    return (
        <div>
          <span className={this.state.is_error == true ? "hidden" : "is-error is-fullwidth p-4 br-3 is-6 text-left" }>
            {this.state.is_error == true ? this.state.err_msg : "" }
          </span>

          <LineChart width={970} height={500} data={this.state.data} margin={{ top: 10, right: 20, left: 0, bottom: 5,}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={<CustomizedAxisTick />}/>
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" label={<CustomizedLabel />} activeDot={{ r: 8 }} />
          </LineChart>
        </div>
    );
  }
}
