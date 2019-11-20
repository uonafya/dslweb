import React from 'react';
import ReactDOM from 'react-dom';
import {FetchCountyList} from './Helpers'

export default class CountyDropDown extends React.Component {

  constructor () {
    super();
    this.state = {
      countyId: 18,
      countyList: [],
    };
  }

  componentDidMount(){
    //fetch counties
    (async () => {
      let returnedData = await FetchCountyList();
      this.setState({
       countyList: returnedData
      });
    })()
  }

  render () {
    return (
      <div>
        <select selected="Kenya" onChange={event =>this.props.handler(event.target.value)}>
          <option selected disabled hidden>Kenya</option>
          {this.state.countyList.map(entry =>
            <option key={entry.id} value={entry.id}>{entry.name}</option>
          )};
        </select>
      </div>
    );
  }
}
