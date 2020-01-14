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
    return (
      <div>
        <select onChange={event =>this.props.handler(event.target.value)}>
          <option selected disabled hidden>yearly</option>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    );
  }
}
