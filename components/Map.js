import React from 'react'
import MapData from '../static/maps/counties.min.json'
import MapCenters from '../static/maps/county-centers-coordinates'
import { FetchIndicatorData } from './utils/Helpers'
import Loading from './Loading'
import {friendlyDate} from './utils/converters/Date2Friendly'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      components: undefined,
      pe: 2019,
      indicator: '',
      mapCentersData: MapCenters,
      indicatorId: ''
    };
    this.markers = new WeakMap()
    this.handleMapIndicator = this.handleMapIndicator.bind(this);
    this.periodChangeHandler = this.periodChangeHandler.bind(this);
    this.populateMapData = this.populateMapData.bind(this);
  }


  populateMapData(mapIndicatorData){
    console.log(" logging ===>");
    document.getElementById("map").classList.remove("opaque-20");
    document.getElementById("loading").classList.add("hidden");
    console.log(this.state.mapCentersData);
    let newMapData = {};
    var countyMap = [];
    MapCenters.map( one_county =>{
      let newMapData = {}
      for (var key in mapIndicatorData){
        let count = 0;
        mapIndicatorData[key].map( data => {

          if(one_county.dsl_id == data.ou){

            newMapData['name']=one_county.name;
            newMapData['longitude']=one_county.longitude;
            newMapData['latitude']=one_county.latitude;
            newMapData['ou']=one_county.dsl_id;
            if(count==0){
              newMapData['value']={};
              count=count+1;
            }
            newMapData['value'][data.period]=data.value;

          }

        })

      }
      if(Object.keys(newMapData).length != 0)
        countyMap.push(newMapData);
    })
    console.log(countyMap);
    this.setState({mapCentersData: countyMap});
  }

  componentDidMount () {
    let {
      Map: LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
      Popup,
      FeatureGroup,
      GeoJSON
    } = require('react-leaflet')
    const { Marker: LeafletMarker } = require('leaflet')
    this.setState({
      leaflet: {
        LeafletMarker
      },
      components: {
        LeafletMap,
        Marker,
        TileLayer,
        Tooltip,
        Popup,
        FeatureGroup,
        GeoJSON
      },
      thedata: {
        center: [31.698956, 76.732407],
        data: [ {id: 0, coordinates: {longitude: 0, latitude: 0}} ],
        selectedPlaceId: 0,
        onMarkerClick: false
      }
    })

  }

  componentDidUpdate (prevProps, prevState) {
    this.onUpdateTimeout = setTimeout(() => {
      if ( prevProps.selectedPlaceId && !this.props.selectedPlaceId && this.featureGroup && this.map ) {
        let bounds = this.featureGroup.leafletElement.getBounds()
        this.map.leafletElement.fitBounds(bounds)
      }

      if (!prevState.components && this.state.components) {
        this.map.leafletElement.on('zoomend', this.handleZoomEnd)
      }
    }, 100)
  }


  componentWillUnmount () {
    if (this.map && this.map.leafletElement) {
      this.map.leafletElement.off('zoomend', this.handleZoomEnd)
    }

    window.clearTimeout(this.onUpdateTimeout)
  }

  handleZoomEnd = ({ target }) => {
    const contained = []
    Object.keys(target._layers).forEach(id => {
      let layer = target._layers[id]
      if (layer instanceof this.state.leaflet.LeafletMarker) {
        if (target.getBounds().contains(layer.getLatLng())) {
          contained.push(layer)
        }
      }
    })

    if (this.props.onZoomEnd) this.props.onZoomEnd(contained, target.getZoom())
  }


 periodChangeHandler(year){
    this.setState({
     pe: year
   });
   (async () => {
     if(this.state.indicatorId != null && this.state.indicatorId != undefined && this.state.indicatorId !== ''){
       let {indicatorData}=await FetchIndicatorData(this.state.indicatorId,'18',year,2,null);
       let mapIndicatorData=indicatorData.result.data;
       this.populateMapData(mapIndicatorData);
     }
   })()

   var elems = document.querySelectorAll(".maplink");
   [].forEach.call(elems, function(el) {
       el.className = el.className.replace(/\btext-bold fcsecondary\b/, "");
   });
  }

  handleMapIndicator(indicator) {
    //console.info("<<<<<<<<< "+JSON.stringify(indicator)+" >>>>>>>>>>");
    document.getElementById("map").classList.add("opaque-20");
    document.getElementById("loading").classList.remove("hidden");
    console.log(indicator);
     this.setState({
      indicator: indicator.name,
      indicatorId: indicator.id
    });
    (async () => {
      let {indicatorData}=await FetchIndicatorData(indicator.id,'18',this.state.pe,2,null);
      let mapIndicatorData=indicatorData.result.data;
      this.populateMapData(mapIndicatorData);
    })()

    var elems = document.querySelectorAll(".maplink");
    [].forEach.call(elems, function(el) {
        el.className = el.className.replace(/\btext-bold fcsecondary\b/, "");
    });
    
  }


  createPopUpValues = (values) => {
    let list = []
     for (var k in values) {
       let k_r = friendlyDate(k)
       list.push(
        <tr>
         <td><b>{k_r}</b> </td> 
         <td>{values[k]}</td>
        </tr>
       );
      }
    return list;
   }


  render () {
    if (!this.state.components) {
      return null
    }

    const {
      LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
      Popup,
      FeatureGroup,
      GeoJSON
    } = this.state.components
    const { center, data, selectedPlaceId, onMarkerClick } = this.props

    let zoom = 13
    let mapCenter = center
    let selectedPlace
    let tdt = this.state.components.thedata
    if (selectedPlaceId) {
      const { longitude, latitude } = {longitude: 76.732407, latitude: 31.698956}
      mapCenter = [36.90458259248316, -1.160707895679255]
      zoom = 13
      const passdata = [selectedPlace]
    }else{
        const passdata = tdt
    }


    function getCounties() {
        return {MapData}
    }

    function handleMapIndicator(indicator) {
      let yrr = document.getElementById("mapyr").value
      console.info("MAPINDICATOR "+JSON.stringify(indicator));
      console.info("MAPYEAR "+yrr);
      document.getElementById("maptitle").innerHTML = indicator.name+" - "+yrr;

      var elems = document.querySelectorAll(".maplink");
      [].forEach.call(elems, function(el) {
          el.className = el.className.replace(/\btext-bold fcsecondary\b/, "");
      });

      getMapData(indicator.id,yrr)

      let lsId = indicator.id+'-'+yrr
      let mapIndicatorsData = window.localStorage.getItem(lsId)
      console.log('mapIndicatorsData --> '+mapIndicatorsData)

    }


    return (
     <div>

        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="box min-h-650-px">
                <div className="content">
                  {/* <h4 className="title is-5 text-bold">GIS Map Viewer</h4> */}
                  <div className="columns">
                    <div className="column is-one-quarter">
                        {/* MAP Datepicker */}
                        <h4 className="title is-5 m-b-5">Period:</h4>
                        <hr className="m-t-5 m-b-5"/>
                        <div className="select is-fullwidth">
                          <select id="mapyr" onChange={event => this.periodChangeHandler(event.target.value)}>
                            {this.props.error ? "" : this.props.years.map( oneyr => (<option value={oneyr}>{oneyr}</option>) )}
                          </select>
                        </div>
                        {/* end MAP Datepicker */}

                        {/* MAP IndiPicker */}
                        <h4 className="title is-5 m-b-5">Indicators:</h4>
                        <hr className="m-t-5 m-b-5"/>
                        <div className="gis-indicator-list max-h-650-px auto-overflow-y">
                          <ul className="text-left">
                            {this.props.dslIndicators.map( one_indicator => (
                              <li><a key={one_indicator.id} id={`clink-${one_indicator.id}`} className="is-link fcsecondary-dark maplink"
                              onClick={
                                (elem) => {
                                  const mapData = null
                                  this.handleMapIndicator(one_indicator)
                                  let eles = document.getElementsByClassName('maplink');for(var i=0; i<eles.length; i++) {eles[i].classList.remove("text-bold");}document.getElementById(`clink-${one_indicator.id}`).classList.add("text-bold")
                                }
                              }
                               >{one_indicator.name}</a></li>
                            ))}
                          </ul>
                        </div>
                        {/* end MAP IndiPicker */}
                    </div>
                    <div className="column">
                        <h4 className="title is-5 m-b-5">Kenya: <span id="maptitle" className="fcgrey-light-1"> {this.state.indicator} - {this.state.pe} - (47 counties)</span></h4>
                        <hr className="m-t-5 m-b-5"/>
                        <div className="columns p-l-10 p-r-10">
                          <div className="column min-h-500-px">
                            {/* <h1 className="title">Map goes here</h1> */}
                            <div className="map-house hide-overflow min-h-100-pc is-fullwidth" style={{minWidth: 500 + 'px', minHeight: 500 + 'px', height: 700 + 'px'}}>
                                <div className="m-t-50 p-t-50 is-fullwidth hidden map-loading" id="loading">
                                  <Loading isBig={true} showImage={true}/>
                                </div>
                                <div className="is-fullwidth" id="map">
                                  <LeafletMap scrollWheelZoom={false} ref={node => {this.map = node }} center={[-0.818389, 36.817222]} zoom={7.48} maxZoom={9.00} >
                                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' style={`display: none;`}/>
                                    <GeoJSON data={MapData} key={MapData} style={`color: '#006400'; weight: 5; opacity: 0.65;`} />
                                    {this.state.mapCentersData.map( one_county =>(
                                      <Marker position={[one_county.latitude, one_county.longitude]}>
                                        <Popup>
                                          <div>
                                            <h4 className="subtitle">{one_county.name}</h4>
                                            {one_county.value === undefined ? "" : (
                                            <table className="table slimtable is-bordered">
                                              <thead>
                                                <tr>
                                                  <th style={{color: 'gray'}}>PERIOD</th>
                                                  <th style={{color: 'gray'}}>VALUE</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {this.createPopUpValues(one_county.value)}
                                              </tbody>
                                            </table>
                                            )}
                                            <br/>
                                          </div>
                                        </Popup>
                                        <Tooltip>{one_county.name}</Tooltip>
                                      </Marker>
                                    ))}
                                  </LeafletMap>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }

}
