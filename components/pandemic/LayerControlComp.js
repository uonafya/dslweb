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
         if(cat[0].name.trim()!="male" && cat[0].name.trim()!="female" && !addedId.includes(cat[0].id)){
           addedId.push(cat[0].id!=69);
           cateList.push({title: cat[0].name, id: cat[0].id});
         }
       }else if(cat.length>1){
         for(let x=0; x<cat.length; x++){
           if(cat[x].name.trim()!="male" && cat[x].name.trim()!="female" && !addedId.includes(cat[x].id)){
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
    
    return (
        <LayersControl collapsed={false} position="topright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="OSM BlackWhite">
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Google streets">
            <TileLayer
              attribution='&copy; Google Maps'
              url="https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0"
            />
          </BaseLayer>
          <BaseLayer name="Google Hybrid">
            <TileLayer
              attribution='&copy; Google Maps'
              url="http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&s=Ga"
            />
          </BaseLayer>
          <Overlay name="Marker with popup">
            <Marker position={center}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </Overlay>
          <Overlay checked name="Layer group with circles">
            <LayerGroup>
              <Circle center={center} fillColor="blue" radius={8200} />
              <Circle
                center={center}
                fillColor="red"
                radius={100}
                stroke={false}
              />
              <LayerGroup>
                <Circle
                  center={[51.51, -0.08]}
                  color="green"
                  fillColor="green"
                  radius={100}
                />
              </LayerGroup>
            </LayerGroup>
          </Overlay>
          <Overlay name="Feature group">
            <FeatureGroup color="purple">
              <Popup>Popup in FeatureGroup</Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      );
    }
}
