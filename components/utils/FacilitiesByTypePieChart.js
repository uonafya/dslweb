import React, { PureComponent } from 'react';
import { ConvertToLineBarGraph } from './converters/Charts'
import { FetchFacilityCountByType } from './Helpers'
import {
  PieChart, Pie, Legend, Tooltip,Cell
} from 'recharts';

let _convertedData=[{}];

const COLORS = ['#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE','#00C49F','#2f4b7c',
                '#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F', '#FF8042',
                '#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F',
                '#003f5c','#2f4b7c','#665191','#a05195','#d45087','#f95d6a','#ff7c43','#ffa600','#0088FE', '#00C49F'
];

export default class FacilityPieGraph extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {data: ''};
  }

  componentDidMount() {
    (async () => {
      let returnedData=await FetchFacilityCountByType();
      var _data=ConvertToLineBarGraph(returnedData);
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
