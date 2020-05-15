/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FetchSubCountyList} from './Helpers'

export default class SubCounties extends React.Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      period: 2019,
      subCountyList: []
    };

  }

  componentDidMount(){
    //fetch counties
    (async () => {
      let returnedData = await FetchSubCountyList();
      let subCountyList=[];
      returnedData.forEach((subCounty)=>{
        let subCountyMap={};
        subCountyMap['title']=subCounty.name;
        subCountyMap['id']=subCounty.id;
        subCountyList.push(subCountyMap);
      });
      this.setState({
       subCountyList: subCountyList
      });
    })()
  }

  render () {
    return (
      <Autocomplete
        id="subcounties-combo-box"
        size="small"
        options={this.state.subCountyList}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Counties" variant="outlined" />}
      />
    );
  }

}
