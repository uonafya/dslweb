import React, { PureComponent } from 'react';
import { ConvertToCadreSimplePieChart } from './converters/Charts'
import { FetchCadreGroupData } from './Helpers'
import {
  PieChart, Pie, Legend, Tooltip,Cell
} from 'recharts';

let _convertedData=[{}];

const COLORS = ['#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F', '#FF8042'
                ,'#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F',
                '#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F'
];

export default class CadreTwoPieGraph extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {data: ''};
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.ouid!=this.props.ouid || nextProps.pe!=this.props.pe){
      (async () => {
        let returnedData=await FetchCadreGroupData(nextProps.ouid,nextProps.pe);
        var _data=ConvertToCadreSimplePieChart(returnedData);
        _convertedData=_data;
         this.setState({data: _data, ouid: nextProps.ouid, pe: nextProps.pe});
       })();
    }else{

      }
    }

  componentDidMount() {
    (async () => {
      let returnedData=await FetchCadreGroupData(this.props.ouid,this.props.pe);
      var _data=ConvertToCadreSimplePieChart(returnedData);
      _convertedData=_data;
       this.setState({data: _data});
    })();
  };

  render() {
    return (
        <PieChart width={670} height={300} margin={{ top: 10, right: 0, left: 0, bottom: 5,}}>
          <Pie dataKey="value" isAnimationActive={false} data={this.state.data} label >
            {
              _convertedData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
          <Tooltip />
        </PieChart>
    );
  }
}
