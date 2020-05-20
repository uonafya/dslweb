import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SurveyOrganisationUnitFilter from './OrganisationUnitFilter'
import SurveyGenderFilter from './SurveyGenderFilter'
import SurveyPeriodFilter from './SurveyPeriodFilter'
import CategoryFilter from './CategoryFilter'

export default class SurveyFilterWrapper extends React.Component {

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
    let peridoFilter;
    let categoryFilter;

    if(this.props.initialReturnedData!=null){
      orgFilter=<SurveyOrganisationUnitFilter handleOrgUnitChange={this.props.handleOrgUnitChange} orgList={this.props.initialReturnedData.dictionary.available.orgunits}/>
      //gender filter
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
          genderFilter=<SurveyGenderFilter handleGenderChange={this.props.handleGenderChange}  genderList={genderArray}/>
      }

      //period
      let periodsL=this.props.initialReturnedData.dictionary.available.periods;
      if(periodsL.length>0)
        peridoFilter=<SurveyPeriodFilter handleChangePeriod={this.props.handleChangePeriod} peList={periodsL}/>

      //other categories filter.
      let categoriesL=this.props.initialReturnedData.dictionary.available.categories;
      if(categoriesL.length>0)
        categoryFilter=<CategoryFilter handleCategoryChange={this.props.handleCategoryChange} catList={categoriesL}/>

    }

    return (
        <div>
          <div style={{display: "inline-block"}}>
            {orgFilter}
          </div>
          <div style={{display: "inline-block", marginLeft: "2px"}}>
            {genderFilter}
          </div>
          <div style={{display: "inline-block", marginLeft: "2px"}}>
            {peridoFilter}
          </div>
          <div style={{display: "inline-block", marginLeft: "2px"}}>
            {categoryFilter}
          </div>
        </div>
      );
    }
}
