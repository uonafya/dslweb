import React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default class CategoryFilter extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      categoryList: null
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

  componentDidMount(){
    let cateList=[];
    let addedId=[];
    this.props.catList.forEach((cat)=>{
       if(cat.length==1){
         if(cat[0].id!=69 && cat[0].id!=65 && !addedId.includes(cat[0].id)){
           addedId.push(cat[0].id!=69);
           cateList.push({title: cat[0].name, id: cat[0].id});
         }
       }else if(cat.length>1){
         for(let x=0; x<cat.length; x++){
           if(cat[x].id!=65 && cat[x].id!=69 && !addedId.includes(cat[x].id)){
             addedId.push(cat[x].id);
             cateList.push({title: cat[x].name, id: cat[x].id});
           }
         }
       }
    });
    this.setState({
      categoryList:cateList
    });
  }

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
          this.props.handleCategoryChange(newValue.id);
        }}
        options={this.state.categoryList}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
      />

    return (
          <div>
          <Button aria-describedby={this.props.elId} variant="contained" color="primary" onClick={this.handleClick}>
            Category &#9662;
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
