import React from 'react';
import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

// see documentation for supported input formats
// const data = [['attribute', 'attribute2'], [987.00, 200.72]];

export default class ReactPivot extends React.Component {
    constructor({props}) {
        super(props);
        this.state = {
          props,
          pivotData: [],
          pivotState: {},
          fileName: '',
        }
    }

    onUpdateContent(content) {
      this.content = content;
    }

    componentDidMount() {
      let pivot_state = {
        fileName: this.props.title,
        data: this.props.pivotData,
        cols: ['Period'],
        rows: ['Organisation Unit'],
        aggregatorName: 'List Unique Values',
        vals: ['Value'],
        rendererName: 'Table Heatmap'
        // sorters: {
        //     Ounit: sortAs(['National', 'County']),
        //     'Periodicity': sortAs([ 'Daily', 'Weekly', 'Monthly', 'Annually',]),
        // }
      }
      this.setState({
        pivotData:  this.props.pivotData,
        title:  this.props.title,
        pivotState:  pivot_state
      });
    }

    render() {
        return (
            <div>
              <PivotTableUI
                data={this.state.pivotData}
                onChange={s => this.setState({pivotState: s})}
                {...this.state.pivotState}
              />
            </div>
        );
    }
}