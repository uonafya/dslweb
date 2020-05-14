/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FetchCountyList} from './Helpers'

export default class Counties extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      period: 2019,
      ouid: 18,
      countyList: []
    };

  }

  componentDidMount(){
    //fetch counties
    (async () => {
      let returnedData = await FetchCountyList();
      let countyList=[];
      returnedData.forEach((county)=>{
        let countyMap={};
        countyMap['title']=county.name;
        countyMap['id']=county.id;
        countyList.push(countyMap);
      });
      this.setState({
       countyList: countyList
      });
    })()
  }

  render () {
    return (
      <Autocomplete
        id="combo-box-demo"
        size="small"
        options={this.state.countyList}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Counties" variant="outlined" />}
      />
    );
  }

}
