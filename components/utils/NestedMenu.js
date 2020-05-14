import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Counties from './CountiesDropDown'
import SubCounties from '../utils/SubCounties'

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function NestedMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open
    ? 'simple-popover'
    : undefined;

  return (<div>
    <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      Open Popover
    </Button>
    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center'
      }} transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}>
      <div className="p-20">
        <label>Filter:</label><br className="m-b-10"/>
        <Counties/>
        <br/>
        <SubCounties/>
      </div>
    </Popover>
  </div>);
}
