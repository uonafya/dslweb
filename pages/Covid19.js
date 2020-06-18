import React from 'react'
import MapData from '../static/maps/counties.min.json'
import MapCenters from '../static/maps/county-centers-coordinates'
import Layout from '../components/Layout'
import Link from 'next/link';
import SidePanel from '../components/pandemic/map/SidePanel'
import {fetchCovidData} from '../components/utils/Helpers';

export default class extends React.Component {

  constructor () {
    super()
    this.state = {
      components: undefined,
      mapCentersData: MapCenters,
      covidData: null
    };
  }

  componentDidMount () {

    (async () => { //http://dsl.health.go.ke/dsl/api/pandemics/covid19?id=6074&start_date=2020-06-07
      let {covidData}=await fetchCovidData(null,null,null,null);
      this.setState({
        covidData: covidData
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

    })

  }

  geoJsonStyle = (feature)=>{
         return {
            fillColor: '#b1b1b3',
            weight: 2,
            opacity: 3,
            color: '#006400',
            dashArray: '3',
            fillOpacity: 0.5,
            fontWeight: 700
        };
    };

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


    return (
    <Layout>

      {
        <style jsx>
          {`
            .leaflet-container {
              width: 100%;
              height: 80% !important;
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


      <div style={{minWidth: 500 + 'px', minHeight: 500 + 'px', height: 900 + 'px'}}>

          <LeafletMap scrollWheelZoom={false} ref={node => {this.map = node }} center={center} zoom={6.5} maxZoom={18} >
            <SidePanel covidData={this.state.covidData}/>
             <GeoJSON data={MapData} key={MapData} style={this.geoJsonStyle} />
             <LayersControl collapsed={false} position="topright">
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

          </LeafletMap>

        </div>
    </Layout>
    );
  }
}
