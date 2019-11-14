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

    // const markers = ( [{id: 0, coordinates: {longitude: 76.732407, latitude: 31.698956} }] ).map(d => {
    //   const { latitude, longitude } = d.coordinates
    //   return (
    //     <Marker ref={node => { if (!node) return this.markers.set(node.leafletElement, d.id) }} key={d.id} position={[latitude, longitude]} onClick={() => { if (onMarkerClick) { onMarkerClick(d) } }} >
    //       <Tooltip> <span> {d.name} </span> </Tooltip>
    //     </Marker>
    //   )
    // })

    return (
        <LeafletMap scrollWheelZoom={false} ref={node => {this.map = node }} center={[-0.818389, 36.817222]} zoom={6.48} maxZoom={9.00} >
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' style={`display: none;`}/>
            <GeoJSON data={MapData} key={MapData} style={`color: '#006400'; weight: 5; opacity: 0.65;`} />
      </LeafletMap>
    )
  }
}