import React from 'react';
import ReactDOM from 'react-dom';
import PivotTableUI from 'react-pivottable/PivotTableUI';
import 'react-pivottable/pivottable.css';

// see documentation for supported input formats
// const data = [['attribute', 'attribute2'], [987.00, 200.72]];

export default class PlotlyPivot extends React.Component {
    constructor({props}) {
        super(props);
        this.state = {
          props,
          pivotData: []
        }
    }

    componentDidMount() {
      this.setState({
        pivotData:  this.props.pivotData
      });
    }

    render() {
        return (
            <div>
              <PivotTableUI
                data={this.state.pivotData}
                onChange={s => this.setState(s)}
                {...this.state}
              />
            </div>
        );
    }
}