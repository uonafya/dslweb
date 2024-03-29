import React from 'react';
import Counties from './CountiesDropDown'
import SubCounties from '../utils/SubCountiesDropDown'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default class OrgUnitNestedMenu extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      countyId: null
    };
  }

  handleClick = (event) => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  updateCountyId = (countyID)=>{
    this.setState ({
      countyId:countyID
    });
  }

  open = ()=> Boolean(this.state.anchorEl);

  render() {

    let orgDrill=null;
    let labelName;
    labelName= (this.props.name!=null)? this.props.name : "Organisation Unit";
    if(this.props.level.includes('3')){
      orgDrill=
        <React.Fragment>
          <Counties updateCountyIdHandler={this.updateCountyId} callBackHandler={this.props.callBackHandler}/>
          <br/>
          <SubCounties parentOrgId={this.state.countyId} callBackHandler={this.props.callBackHandler}/>
        </React.Fragment>
    }else{
      orgDrill=
        <React.Fragment>
          <Counties/>
        </React.Fragment>
    }

    return (
          <div>
          <Button aria-describedby={this.props.elId} variant="contained" color="primary" onClick={this.handleClick}>
            {labelName} &#9662;
          </Button>
          <Popover id={this.props.elId} open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} onClose={this.handleClose} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }} transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="p-20">
              <label>Filter:</label><br className="m-b-10"/>
                {orgDrill}
            </div>
          </Popover>
        </div>
      );
    }
}
