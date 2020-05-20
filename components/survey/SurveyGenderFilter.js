import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class SurveyGenderFilter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null
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

  open = ()=> Boolean(this.state.anchorEl);

  render() {

  let objDrill=
      <Autocomplete
        id="counties-combo-box"
        size="small"
        value={this.state.selectedVal}
        onChange={(event, newValue) => {
          if(newValue==null || newValue==undefined ) newValue="";
          this.setState({
            selectedVal:newValue
          });
          this.props.handleGenderChange(newValue.id);
        }}
        options={this.props.genderList.map((obj)=>{
           return {title: obj.name, id: obj.id};
        })}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Gender" variant="outlined" />}
      />

    return (
          <div>
          <Button aria-describedby={this.props.elId} variant="contained" color="primary" onClick={this.handleClick}>
            Gender &#9662;
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
