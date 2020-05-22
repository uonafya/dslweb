import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class GenericYearDropDown extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      pe: 2019,
      periods: [
          {title:"2011",id:"2011"},
          {title:"2012",id:"2012"},
          {title:"2013",id:"2013"},
          {title:"2014",id:"2014"},
          {title:"2015",id:"2015"},
          {title:"2016",id:"2016"},
          {title:"2017",id:"2017"},
          {title:"2018",id:"2018"},
          {title:"2019",id:"2019"}
    ]
  }
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

  open = ()=> Boolean(this.state.anchorEl);

  render() {

  let objDrill=
      <Autocomplete
        id="generic-year-drop-down-combo-box"
        size="small"
        value={this.state.selectedVal}
        onChange={(event, newValue) => {
          if(newValue==null || newValue==undefined ) newValue=2019;
          this.setState({
            pe:newValue.id,
            selectedVal:newValue
          });
          this.props.handleChangePeriod(newValue.id);
        }}
        options={this.state.periods}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Period" variant="outlined" />}
      />

    return (
          <div>
          <Button aria-describedby={this.props.elId} variant="contained" color="primary" onClick={this.handleClick}>
            Period &#9662;
          </Button>
          <Popover id={this.props.elId} open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} onClose={this.handleClose} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }} transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}>
            <div className="p-20">
                {objDrill}
            </div>
          </Popover>
        </div>
      );
    }
}
