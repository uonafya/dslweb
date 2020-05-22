/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {FetchSubCountyList} from './Helpers'

export default class SubCounties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      period: 2019,
      subCountyList: [],
      displayCountyList: [],
      parentId: this.props.parentOrgId,
      selectedVal: null
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
        subCountyMap['parentid']=subCounty.parentid;
        subCountyMap['level']=subCounty.level;
        subCountyList.push(subCountyMap);
      });
      this.setState({
       subCountyList: subCountyList,
       displayCountyList: subCountyList
      });
    })()
  }

  componentDidUpdate(prevProps) {
    if (this.props.parentOrgId != prevProps.parentOrgId) {
      this.filterDisplayCountyList(this.props.parentOrgId);
    }
  }

  filterDisplayCountyList = (parentOrgId)=> {
    let updateDisplayCountyList=[];
    if(parentOrgId== 18){
      updateDisplayCountyList=this.state.subCountyList;
    }
    this.state.subCountyList.forEach( element => {
      if(element.parentid==parentOrgId && parentOrgId!= 18){
        updateDisplayCountyList.push(element);
      }
    });
    this.setState({
      displayCountyList:updateDisplayCountyList
    });
  }

  render () {
    return (
      <Autocomplete
        id="subcounties-combo-box"
        size="small"
        value={this.selectedVal}
        onChange={(event, newValue) => {
          if(newValue==null || newValue==undefined ) newValue=18;
          this.setState({
            selectedVal:newValue
          });
          this.props.callBackHandler(newValue.id);
        }}
        options={this.state.displayCountyList}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Sub Counties" variant="outlined" />}
      />
    );
  }

}
