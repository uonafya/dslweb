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
      countyList: [],
      selectedVal:null
    };

  }

  componentDidMount(){
    //fetch counties
    (async () => {
      let returnedData = await FetchCountyList();
      let countyList=[];
      let nationalOrg={
        'title':"Kenya (National)",
        'id': 18,
        'parentid': null,
        'level':0
      };
      countyList.push(nationalOrg);
      returnedData.forEach((county)=>{
        let countyMap={};
        countyMap['title']=county.name;
        countyMap['id']=county.id;
        countyMap['parentid']=county.parentid;
        countyMap['level']=county.level;
        countyList.push(countyMap);
      });
      this.setState({
       countyList: countyList
      });
    })()
  }

  filterDisplayCountyList

  render () {
    return (
      <Autocomplete
        id="counties-combo-box"
        size="small"
        value={this.selectedVal}
        onChange={(event, newValue) => {
          if(newValue==null || newValue==undefined ) newValue=18;
          this.setState({
            selectedVal:newValue
          });
          if(newValue==18){
            this.props.updateCountyIdHandler(18);
          }else{
            this.props.updateCountyIdHandler(newValue.id);
          }

        }}
        options={this.state.countyList}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Counties" variant="outlined" />}
      />
    );
  }

}
