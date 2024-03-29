import React from 'react'
import MapData from '../static/maps/counties.min.json'
import MapCenters from '../static/maps/county-centers-coordinates'
import Layout from '../components/Layout'
import Link from 'next/link';
import SidePanel from '../components/pandemic/map/SidePanel'
import CovidCases from '../components/pandemic/covid/covid-cases'
import ChoroPlethLegend from '../components/pandemic/map/choroPlethLegend'
import {fetchCovidData , insertCovidValues, convertRange} from '../components/utils/Helpers';
import EmergencyAirway from '../components/survey/charts/emergency-airway'
import InpatientBeds from '../components/survey/charts/inpatient-beds'
import ChronicRespiratory from '../components/survey/charts/chronic-respiratory'
import WorkforceDistribution from '../components/survey/charts/workforce-distribution'

export default class extends React.Component {

  constructor (props) {
    super(props);
        this.leafLetMap = React.createRef();

    this.state = {
      components: undefined,
      mapCentersData: MapCenters,
      covidData: null,
      defaultGeoJson: JSON.parse(JSON.stringify(MapData)),
      choroPlethData: null,
      geoJsonCurrentStyle: this.choroplethStyle,
      choroPleathPopUpdIndicator: "confirmed cases",
      currentViewType: "choropleth"
    };
  }

  componentDidMount () {

    (async () => { //http://dsl.health.go.ke/dsl/api/pandemics/covid19?id=6074&start_date=2020-06-07
      let {covidData}=await fetchCovidData(null,null,null,null, 2);
      let choroPlethData=insertCovidValues(covidData,MapData,8023, "cumulative confirmed cases"); //cumulative confirmed cases
      this.setState({
        covidData: covidData,
        choroPlethData: choroPlethData
      });

    })()

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

  setCurrenGeoJsonToDisplay =(gJsonData)=>{
    this.refs.coviGgeojson.leafletElement.clearLayers();
    this.refs.coviGgeojson.leafletElement.addData(gJsonData);
    this.setState({
      choroPlethData: gJsonData,
    });
  }

  choroplethStyle= (feature)=> {
    return {
      fillColor: this.getChoroplethColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  getChoroplethColor =(d)=>{
     return d==undefined ? '#ccdaee':
            d==null ?  '#ccdaee':
            d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                       '#FFEDA0';
     }

    bubbleStyle= (feature)=> {
      return {
        fillColor: '#ccdaee',
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
      };
    }

    //on mouse hover
   choroplethHighlightFeature= (e)=> {
        //add toot tip to county
        this.refs.coviGgeojson.leafletElement.bindTooltip(`
            <div>${e.target.feature.properties.AREA_NAME}</div>
            <div style='float: left'>${this.state.choroPleathPopUpdIndicator}:
             ${e.target.feature.properties.density}</div>
           `);

          let layer = e.target;
          layer.setStyle({
              weight: 5,
              color: '#666',
              dashArray: '',
              fillOpacity: 0.7
          });
          if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront(); // do not highlight county if these browsers used
          }
    }

    //on mouse out
    choroplethResetHighlight= (e)=> {
      if(this.state.currentViewType == 'choropleth'){
        this.refs.coviGgeojson.leafletElement.resetStyle(e.target);
      }else{
        let layer = e.target;
        layer.setStyle({ //same style as this.bubbleStyle
          weight: 2,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToBack(); // do not highlight county if this browsers used
        }
      }
    }

    choroplethOnEachFeatureAddListener =(feature, layer)=> {
      layer.on({
        mouseover: this.choroplethHighlightFeature.bind(this),
        mouseout: this.choroplethResetHighlight.bind(this)
      });
    }

    updateCovidData = (id, indicatorName)=>{
        (async () => { //http://dsl.health.go.ke/dsl/api/pandemics/covid19?id=6074&start_date=2020-06-07
          //let {covidData}=await fetchCovidData(null,null,null,null);
          let choroPlethData=insertCovidValues(this.state.covidData,MapData,id,indicatorName); //confirmed cases
          this.setState({
            choroPlethData: choroPlethData
          });
        })()
    }

    addMarkersOnMap = (feature, layer)=>{
      layer.on({
        mouseover: this.choroplethHighlightFeature2.bind(this),
      });
    }

    getMinMaxValuesOfCases =()=>{
      let countyCasesDensity=[]; //cases number
      this.state.choroPlethData.features.forEach(countyData =>{
        let val=countyData.properties.density;
        if(val!=undefined)
          countyCasesDensity.push(val);
      });
      let maxDesity=Math.max(...countyCasesDensity);
      let minDensity=Math.min(...countyCasesDensity);
      return {maxDesity,minDensity};
    }

    insertBubbleLayer=()=>{
      //  console.log(this.refs.layersControl);
      document.getElementById("choroPlethLegend").style.visibility="hidden";
        this.setState({
          currentViewType: "bubble",
          geoJsonCurrentStyle: this.bubbleStyle
        });
        var countiesWithCovidMarkers = [];
        let countiesMap = {};
        let indicatorName="";
        MapCenters.forEach(county=>{
          let countyName=county.name.toLowerCase().trim();
          countiesMap[countyName]={};
          countiesMap[countyName]['dsl_id']=county.dsl_id;
          countiesMap[countyName]['longitude']=county.longitude;
          countiesMap[countyName]['latitude']=county.latitude;
        });

        let rangeToScaleToA=[1000,6500]; //0-10
        let rangeToScaleToB=[7000,12000]; //10-20
        let rangeToScaleToC=[12000,16000]; //20-50
        let rangeToScaleToD=[16300,18500]; //50-100
        let rangeToScaleToE=[18600,20600]; //100-200
        let rangeToScaleToF=[20900,22300]; //200-500
        let rangeToScaleToG=[22500,23700]; //500+
        let {maxDesity,minDensity} = this.getMinMaxValuesOfCases();

        this.state.choroPlethData.features.forEach(countyData =>{
          if(countyData.properties.density !=null){
            indicatorName=countyData.properties['indicatorName'];
            let countyName=countyData.properties.AREA_NAME.toLowerCase().trim();
            let lat=countiesMap[countyName]['latitude'];
            let long=countiesMap[countyName]['longitude'];
            let covidNumbers = countyData.properties.density;
            let caseValue;
            if(covidNumbers<10)
              caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToA);
            if(covidNumbers >=10 && covidNumbers< 20)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToB);
            if(covidNumbers >=20 && covidNumbers< 50)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToC);
            if(covidNumbers >=50 && covidNumbers< 100)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToD);
            if(covidNumbers >=100 && covidNumbers< 200)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToE);
            if(covidNumbers >=200 && covidNumbers< 500)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToF);
            if(covidNumbers >=500)
               caseValue=convertRange(covidNumbers,[minDensity,maxDesity],rangeToScaleToG);
            let countyMarker = L.circle([lat, long], {radius: caseValue});
            countiesWithCovidMarkers.push(countyMarker);
          }
        });
        let countiesWithCovid = L.layerGroup(countiesWithCovidMarkers,indicatorName);
        countiesWithCovid.addTo(this.refs.covMap.leafletElement);
        this.refs.layersControl.leafletElement.addOverlay(countiesWithCovid,indicatorName);

        this.setState({
          bubbleIndicatorLayer: countiesWithCovid
        });

    }

    insertChoroplethLayer=()=>{
      this.refs.coviGgeojson.leafletElement.setStyle(this.getChoroplethColor);
      document.getElementById("choroPlethLegend").style.visibility="visible";

      this.state.bubbleIndicatorLayer.remove(); //remove layer added by bubble map action
      this.refs.layersControl.leafletElement.removeLayer(this.state.bubbleIndicatorLayer); //remove it from overlay control

      this.setState({
        currentViewType: "choropleth",
        geoJsonCurrentStyle: this.choroplethStyle
      });

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
    const rectangle = [
      [0.16, 37.76],
      [0.18, 37.79],
    ]

    const rectangle2 = [
      [51.49, -0.08],
      [51.5, -0.06],
    ]

    const geoJsnLayer=<GeoJSON
                        ref="coviGgeojson"
                        data={this.state.choroPlethData} key={this.state.choroPlethData}
                        style={this.state.geoJsonCurrentStyle} onEachFeature= {this.choroplethOnEachFeatureAddListener.bind(this)} />


    return (
    <Layout>

      {
        <style jsx>
          {`
            .leaflet-container {
              width: 100%;
              height: 100% !important;
            }
            .leaflet-control-layers-toggle {
	               background-image: url(../static/images/layers.png);
            }

            .leaflet-retina .leaflet-control-layers-toggle {
            	background-image: url(../static/images/layers-2x.png);
            	}

          `}
        </style>
      }

      {/* Breadcrumb */}
      <section className="section m-t-20 m-b-5 bcclear p-b-15">
        <div className="container">
          <div className="columns">
              <div className="column is-one-third">
                <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                  <ul>
                      <li><Link href="/"><a className="m-t-3">Home</a></Link></li><li className="is-active">
                        <a aria-current="page">
                          Covid 19
                        </a>
                      </li>
                  </ul>
                </nav>
              </div>
          </div>
        </div>
      </section>
      {/* Breadcrumb */}

          <div style={{minWidth: 500 + 'px', minHeight: 500 + 'px', height: 800 + 'px', marginBottom: 25 +'px'}}>
              <LeafletMap ref="covMap" scrollWheelZoom={false} center={center} zoom={6.5} maxZoom={18} >
                {geoJsnLayer}
                <SidePanel insertBubbleLayer={this.insertBubbleLayer}
                           insertChoroplethLayer={this.insertChoroplethLayer}
                           choroPlethData={this.state.choroPlethData}
                           setCurrenGeoJsonToDisplay={this.setCurrenGeoJsonToDisplay}
                           defaultGeoJson={this.state.defaultGeoJson}
                           covidData={this.state.covidData}/>

                <ChoroPlethLegend  getChoroplethColor={this.getChoroplethColor}/>

                 <LayersControl ref='layersControl' collapsed={true} position="topright">
                   <BaseLayer checked name="OpenStreetMap">
                     <TileLayer
                       attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                     />
                   </BaseLayer>
                   <BaseLayer  name="OSM plain">
                     <TileLayer
                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                       url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
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

                 </LayersControl>
              </LeafletMap>
            </div>

        <section className="section m-t-5 p-t-10">
          <div className="container is-fluid">
            <CovidCases covidData={this.state.covidData}/>


             <div className="columns">
                 <div className="column">
                   <EmergencyAirway/>
                 </div>
                 <div className="column">
                   <InpatientBeds/>
                 </div>
             </div>

             <div className="columns">
                 <div className="column">
                   <ChronicRespiratory/>
                 </div>
                 <div className="column">
                   <WorkforceDistribution/>
                 </div>
             </div>

         </div>
      </section>

    </Layout>
    );
  }
}
