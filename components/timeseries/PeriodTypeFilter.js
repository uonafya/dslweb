import React from 'react';
import ReactDOM from 'react-dom';

export default class PeriodType extends React.Component {

  constructor () {
    super();
    this.state = {
      type: 'yearly'
    };
  }

  render () {
    let periodSelection;
    if(this.props.hideYearly){
      periodSelection = <select onChange={event =>this.props.handler(event.target.value)}>
                      <option selected disabled hidden>Monthly</option>
                      <option value="monthly">Monthly</option>
                    </select>

    }else{
      periodSelection = <select onChange={event =>this.props.handler(event.target.value)}>
                      <option selected disabled hidden>yearly</option>
                      <option value="yearly">Yearly</option>
                      <option value="monthly">Monthly</option>
                    </select>
    }
    return (
      <div>
        {periodSelection}
      </div>
    );
  }
}
