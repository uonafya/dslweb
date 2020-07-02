import React from 'react'
import MapData from '../../../static/maps/counties.min.json'
import MapCenters from '../../../static/maps/county-centers-coordinates'
import Link from 'next/link';
import SurveyChoroplethLegend from './survey-choropleth-legend'

import {insertSurveyValuesToGeoJson , insertCovidValues, convertRange} from '../../utils/Helpers';


export default class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      components: undefined,
      mapCentersData: MapCenters,
      covidData: null,
      defaultGeoJson: JSON.parse(JSON.stringify(MapData)),
      choroPlethData: null,
      choroPleathPopUpdIndicator: "Number of inpatient beds per 10,000 population",
      currentViewType: "choropleth"
    };
  }

  componentDidMount () {
      let {countiesData,geoJson,categories}=   insertSurveyValuesToGeoJson(6,10331, MapData,null,"Number of inpatient beds per 10,000 population");

      this.setState({
        choroPlethData: geoJson,
        surveyData: countiesData
      });

      let {
        Map: LeafletMap,
        Marker,
        TileLayer,
        Tooltip,
        Popup,
        FeatureGroup,
        GeoJSON,
        LayersControl,
        LayerGroup, Circle, Rectangle
      } = require('react-leaflet')
      const { Marker: LeafletMarker } = require('leaflet')
      const { BaseLayer, Overlay } = LayersControl;
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
          GeoJSON,
          LayersControl,
          LayerGroup, Circle, Rectangle, BaseLayer, Overlay
        }
      });
  }

  componentDidUpdate(prevProps, prevState) {
      if(prevState.choroPlethData != this.state.choroPlethData ){
        let geoJsonLayer=L.geoJSON(this.state.choroPlethData, {
            style: this.choroplethStyle,
            onEachFeature: this.choroplethOnEachFeatureAddListener
          } ).addTo(this.refs.emegencyAirwayMap.leafletElement);

        this.setState({
          geoJsonLayer:geoJsonLayer
        });
      }
  }

  choroplethStyle= (feature)=> {
    //console.log(JSON.parse(JSON.stringify(feature.properties)));
    //
    // console.log(feature.properties.INDICATORNAME);
    return {
      fillColor: this.getChoroplethColor(feature.properties.DENSITY),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '5',
      fillOpacity: 0.7
    };
  }

  getChoroplethColor =(d)=>{
     return d==undefined ? '#ccdaee':
            d > 14 ? '#800026' :
            d > 12  ? '#BD0026' :
            d > 10  ? '#E31A1C' :
            d > 8  ? '#FC4E2A' :
            d > 6   ? '#FD8D3C' :
            d > 4   ? '#FEB24C' :
            d > 0   ? '#FED976' :
                       '#FFEDA0';
  }

  //on mouse out
  choroplethResetHighlight= (e)=> {
    this.state.geoJsonLayer.resetStyle(e.target);
  }

  choroplethOnEachFeatureAddListener =(feature, layer)=> {
    layer.on({
      mouseover: this.choroplethHighlightFeature(feature, layer),
      mouseout: this.choroplethResetHighlight.bind(this)
    });
  }

    //on mouse hover
   choroplethHighlightFeature= (feature, layer)=> {
        //add toot tip to county
      layer.bindTooltip(`
          <div>${feature.properties.AREA_NAME}</div>
          <div style='float: left, color: red'>${this.state.choroPleathPopUpdIndicator}</div>
          <div> Total No: ${feature.properties.DENSITY}</div>
         `);
    }

  render() {

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
      GeoJSON,
      LayersControl,
     LayerGroup, Circle, Rectangle, BaseLayer, Overlay
    } = this.state.components

    const center = [0.166779241, 37.764037054]

    return (
        <React.Fragment>

          {
            <style jsx>
              {`
                .leaflet-container {
                  width: 100%;
                  height: 100% !important;
                  background-color: #eeeeff
                }
                .leaflet-control-layers-toggle {
    	               background-image: url(../static/images/layers.png);
                }

                .leaflet-retina .leaflet-control-layers-toggle {
                	background-image: url(../static/images/layers-2x.png);
                	}

                 .catgeory-select {
                   position: absolute;
                   top: 20px;
                   right: 120px;
                   z-index: 10;
                 }

                 }
              `}
            </style>
          }

            <p style={{textAlign: 'center', fontWeight: 'bold'}}>Number of inpatient beds per 10,000 population</p>
            <div id="emegencyAirwayMapId"  style={{minWidth: 200 + 'px', width: 800 + 'px', minHeight: 200 + 'px', height: 700 + 'px', position: 'relative'}}>

                <LeafletMap ref="emegencyAirwayMap" scrollWheelZoom={false} center={center} zoomControl={false} minZoom={6.4} zoom={6.4} maxZoom={6.4} />

                <SurveyChoroplethLegend elId={'inpatientBedChroplethLegend'} grades ={ [0, 4, 6, 8, 10, 12, 14] } getChoroplethColor={this.getChoroplethColor}/>
            </div>
            <p style={{fontStyle: 'italic'}}>source: HFA 2018/2019</p>
        </React.Fragment>

    );
  }
}
