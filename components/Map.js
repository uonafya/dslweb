import React from 'react'
import MapData from '../static/maps/counties.min.json'

export default class extends React.Component {
  constructor () {
    super()
    this.state = { components: undefined }
    this.markers = new WeakMap()
  }

  componentDidMount () {
    let {
      Map: LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
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

  render () {
    if (!this.state.components) {
      return null
    }

    const {
      LeafletMap,
      Marker,
      TileLayer,
      Tooltip,
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
        console.log("mapdata== "+JSON.stringify(MapData));
        return {MapData}
    }

    function handleMapIndicator(indicator) {
      //console.info("<<<<<<<<< "+JSON.stringify(indicator)+" >>>>>>>>>>");
      let yrr = document.getElementById("mapyr").value
      document.getElementById("maptitle").innerHTML = indicator.name+" - "+yrr;

      var elems = document.querySelectorAll(".maplink");
      [].forEach.call(elems, function(el) {
          el.className = el.className.replace(/\btext-bold fcsecondary\b/, "");
      });
    }


    // const markers = ( [{id: 0, coordinates: {longitude: 76.732407, latitude: 31.698956} }] ).map(d => {
    //   const { latitude, longitude } = d.coordinates
    //   return (
    //     <Marker ref={node => { if (!node) return this.markers.set(node.leafletElement, d.id) }} key={d.id} position={[latitude, longitude]} onClick={() => { if (onMarkerClick) { onMarkerClick(d) } }} >
    //       <Tooltip> <span> {d.name} </span> </Tooltip>
    //     </Marker>
    //   )
    // })

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
                          <select id="mapyr">
                            {this.props.error ? "" : this.props.years.map( oneyr => (<option value={oneyr}>{oneyr}</option>) )}
                          </select>
                        </div>
                        {/* end MAP Datepicker */}

                        {/* MAP IndiPicker */}
                        <h4 className="title is-5 m-b-5">Indicators:</h4>
                        <hr className="m-t-5 m-b-5"/>
                        <div className="gis-indicator-list max-h-650-px auto-overflow-y">
                          <ul>
                            {this.props.dslIndicators.map( one_indicator => (
                              <li><a key={one_indicator.id} className="is-link fcsecondary-dark maplink"
                              onClick={
                                () => {
                                  const mapData = null
                                  handleMapIndicator(one_indicator)
                                  console.log('Kenyatta', mapData)
                                }
                              }
                               >{one_indicator.name}</a></li>
                            ))}
                          </ul>
                        </div>
                        {/* end MAP IndiPicker */}
                    </div>
                    <div className="column">
                        <h4 className="title is-5 m-b-5">Kenya - <span id="maptitle" className="fcgrey-light-1">(47 counties)</span></h4>
                        <hr className="m-t-5 m-b-5"/>
                        <div className="columns p-l-10 p-r-10">
                          <div className="column min-h-500-px">
                            {/* <h1 className="title">Map goes here</h1> */}
                            <div className="hide-overflow min-h-100-pc is-fullwidth" style={{minWidth: 500 + 'px', minHeight: 500 + 'px', height: 700 + 'px'}}>
                                <LeafletMap scrollWheelZoom={false} ref={node => {this.map = node }} center={[-0.818389, 36.817222]} zoom={6.48} maxZoom={9.00} >
                                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' style={`display: none;`}/>
                                <GeoJSON data={MapData} key={MapData} style={`color: '#006400'; weight: 5; opacity: 0.65;`} />
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
    )
  }

}
