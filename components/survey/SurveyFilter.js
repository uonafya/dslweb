import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SurveyOrganisationUnit from './OrganisationUnit'
import SurveyGender from './SurveyGender'

export default class SurveyFilter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }

  componentDidUpdate(){
    //console.log(this.props.initialReturnedData);
  }

  render() {
    let orgFilter;
    let genderFilter;
    if(this.props.initialReturnedData!=null){
      orgFilter=<SurveyOrganisationUnit handleOrgUnitChange={this.props.handleOrgUnitChange} orgList={this.props.initialReturnedData.dictionary.available.orgunits}/>
      if(this.props.initialReturnedData.dictionary.available.categories.length!=0){
        let addedGender=[];
        let genderArray=this.props.initialReturnedData.dictionary.available.categories.map( catObj =>{
          if((catObj[0].id==65 || catObj[0].id==69) && !addedGender.includes(catObj[0].id)){ // 65 & 69 are male and female ids
            addedGender.push(catObj[0].id);

            return {id: catObj[0].id, name: catObj[0].name}
          }
        });
        genderArray=genderArray.filter(function(x) {
          return x != undefined;
        });
        if(genderArray.length>0)
          genderFilter=<SurveyGender handleGenderChange={this.props.handleGenderChange}  genderList={genderArray}/>
      }

    }

    return (
        <div>
          <div style={{display: "inline-block"}}>
            {orgFilter}
          </div>
          <div style={{display: "inline-block"}}>
            {genderFilter}
          </div>
        </div>
      );
    }
}
