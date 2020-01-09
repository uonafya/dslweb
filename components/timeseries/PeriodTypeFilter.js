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
          <option value="yearly">2011</option>
          <option value="monthly">2012</option>
        </select>
      </div>
    );
  }
}
