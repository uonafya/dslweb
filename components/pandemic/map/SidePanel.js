import React from 'react';
import Popover from '@material-ui/core/Popover';
import { LinePath } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale'
import {getCummulativeCases, isObjectEquivalent} from '../../utils/Helpers';
import { extent, max } from 'd3-array';

export default class SidePanel extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      deathCases: null,
      confirmedCases: null,
      recoveredCases: null,
      currentChoroplethData: null
    };
  }

  updateToChoropleth = (event) => {
    event.preventDefault();
    document.getElementById("choroplethEl").style.backgroundColor = '#0093d5';
    document.getElementById("bubbleEl").style.backgroundColor = 'white';
    this.props.setCurrenGeoJsonToDisplay(this.state.currentChoroplethData); //restore current chroropleth data

  };

  updateToBubble = (event) => {
    this.props.insertBubbleLayer();
    event.preventDefault();
    document.getElementById("choroplethEl").style.backgroundColor = 'white';
    document.getElementById("bubbleEl").style.backgroundColor = '#0093d5';
    this.setState({
      currentChoroplethData: JSON.parse(JSON.stringify(this.props.choroPlethData)) //backup current choropleth data to be restored
    });
    this.props.setCurrenGeoJsonToDisplay(this.props.defaultGeoJson);

  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };


  componentDidMount(){
    this.createLineGraphsConfig(this.props.covidData);
  }

   createLineGraphsConfig = (covidData)=>{

     const vxWidth = 155;
     const vxHeight = 50;

     const xSelector = d => new Date(d.date); // d.date is unix timestamps
     const ySelector = d => d.value;

     //death cases svg properties
     if(covidData!=null){

       let deathCases=getCummulativeCases(this.props.covidData,8901); //death cases

       const deathCasesxScale = scaleTime({
         range: [0, vxWidth],
         domain: extent(deathCases, xSelector), //get hightest and lowest date to point on scale
       });

       const deathCasesyScale = scaleLinear({
         range: [vxHeight, 0],
         domain: [0,max(deathCases, ySelector)],
       });

       this.setState({
         deathCases: deathCases,
         xSelector: xSelector,
         ySelector: ySelector,
         deathCasesxScale: deathCasesxScale,
         deathCasesyScale: deathCasesyScale,
         vxWidth: vxWidth,
         vxHeight: vxHeight,
       });

     //confirmed cases svg properties

       let confirmedCases=getCummulativeCases(this.props.covidData,8023); //confirmed cases

       const confirmedCasesxScale = scaleTime({
         range: [0, vxWidth],
         domain: extent(confirmedCases, xSelector), //get hightest and lowest date to point on scale
       });

       const confirmedCasesyScale = scaleLinear({
         range: [vxHeight, 0],
         domain: [0,max(confirmedCases, ySelector)],
       });

       this.setState({
         confirmedCases: confirmedCases,
         xSelector: xSelector,
         ySelector: ySelector,
         confirmedCasesxScale: confirmedCasesxScale,
         confirmedCasesyScale: confirmedCasesyScale,
         vxWidth: vxWidth,
         vxHeight: vxHeight,
       });

     //recovered cases svg properties

       let recoveredCases=getCummulativeCases(this.props.covidData,9085); //recovered cases

       const recoveredCasesxScale = scaleTime({
         range: [0, vxWidth],
         domain: extent(recoveredCases, xSelector), //get hightest and lowest date to point on scale
       });

       const recoveredCasesyScale = scaleLinear({
         range: [vxHeight, 0],
         domain: [0,max(recoveredCases, ySelector)],
       });

       this.setState({
         recoveredCases: recoveredCases,
         xSelector: xSelector,
         ySelector: ySelector,
         recoveredCasesxScale: recoveredCasesxScale,
         recoveredCasesyScale: recoveredCasesyScale,
         vxWidth: vxWidth,
         vxHeight: vxHeight,
       });
     }

   }

  componentDidUpdate (prevProps, prevState) {
      if (this.props.covidData!=prevProps.covidData) {
        this.createLineGraphsConfig(this.props.covidData);
      }
  }

  render() {

    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80,
    };

    const casesValue ={
      fontWeight: 'bold',
      fontSize: '26px',
      float: 'right'
    };
    const casesText ={
      fontSize: '12px',
      textAlign: 'right',
      float: 'right',
      clear: 'both'
    };
    const mapPanelContent = {
      marginBottom: '20px'
    };

    let cummulativeConfirmedCasesEl;
    let cummulativeRecoveredCasesEl;
    let cummulativeDeathCasesEl;
    let totalActiveCasesEl=0;

    let totalConfirmedCases=0;
    let totalRecoveredCases=0;
    let totalDeathCases=0;


    if(this.state.deathCases==null){
      cummulativeDeathCasesEl=null;
    }else{

      let length=this.state.deathCases.length;
      let topMostData=this.state.deathCases[length-1]; //this is orderd list with last object carryling total cases;
      totalDeathCases=topMostData['value'];

      cummulativeDeathCasesEl =[<div style={mapPanelContent}>
        <div>  <span style={casesValue}>{totalDeathCases} </span> <br/> <span style={casesText}>deaths</span>  </div>
        <svg width={this.state.vxWidth} height={this.state.vxHeight}>
          <LinePath
            data={this.state.deathCases}
            x={d => this.state.deathCasesxScale(this.state.xSelector(d))}
            y={d => this.state.deathCasesyScale(this.state.ySelector(d))}
            strokeWidth={1.5}
            stroke="#ff0000"
            shapeRendering="geometricPrecision"
          />
        </svg>
      </div>];

    }

    //recovered
    if(this.state.recoveredCases==null){
      cummulativeRecoveredCasesEl=null;
    }else{

      let length=this.state.recoveredCases.length;
      let topMostData=this.state.recoveredCases[length-1]; //this is orderd list with last object carryling total cases;
      totalRecoveredCases=topMostData['value'];

      cummulativeRecoveredCasesEl =[<div style={mapPanelContent}>
        <div>  <span style={casesValue}>{totalRecoveredCases} </span> <br/> <span style={casesText}>recovered cases</span>  </div>
        <svg width={this.state.vxWidth} height={this.state.vxHeight}>
          <LinePath
            data={this.state.recoveredCases}
            x={d => this.state.recoveredCasesxScale(this.state.xSelector(d))}
            y={d => this.state.recoveredCasesyScale(this.state.ySelector(d))}
            strokeWidth={1.5}
            stroke="#00ff73"
            shapeRendering="geometricPrecision"
          />
        </svg>
      </div>];
    }

    //confirmed
    if(this.state.confirmedCases==null){
      cummulativeConfirmedCasesEl=null;
    }else{
      let length=this.state.confirmedCases.length;
      let topMostData=this.state.confirmedCases[length-1]; //this is orderd list with last object carryling total cases;
      totalConfirmedCases=topMostData['value'];

      cummulativeConfirmedCasesEl =[<div style={mapPanelContent}>
        <div>  <span style={casesValue}>{totalConfirmedCases} </span> <br/> <span style={casesText}>confirmed cases</span>  </div>
        <svg width={this.state.vxWidth} height={this.state.vxHeight}>
           <LinePath
             data={this.state.confirmedCases}
             x={d => this.state.confirmedCasesxScale(this.state.xSelector(d))}
             y={d => this.state.confirmedCasesyScale(this.state.ySelector(d))}
             strokeWidth={1.5}
             stroke="#003cff"
             shapeRendering="geometricPrecision"
           />
         </svg>
      </div>];

    }

    //Active cases
    let totalActiveCases=totalConfirmedCases-(totalRecoveredCases+totalDeathCases);
    totalActiveCasesEl =<div style={mapPanelContent}>
        <div>
          <span style={casesValue}>{totalActiveCases} </span>
            <br/>
          <span style={casesText} >Active cases</span>
        </div>
      </div>

    return (

      <React.Fragment>

          <div className="map-panel-wrapper">

               <div className="map-tab-parent">

                 <div  className="map-tab-header">
                   <div className="map-panel-tab" id="choroplethEl" onClick={this.updateToChoropleth} style={{backgroundColor: '#0093d5'}}>
                     <span><i className="fas fa-globe-africa panel-head-icon"></i></span>
                     <span className="panel-head-text"  >Choropleth Map</span>
                  </div>

                   <div id="bubbleEl" onClick={this.updateToBubble} className="map-panel-tab">
                     <span><i className="fas fa-map-marked panel-head-icon"></i></span>
                     <span className="panel-head-text">Bubble Map</span>
                   </div>
                 </div>

                 <div className="map-tab-header margin-down">
                   <span style={{marginTop: '4px', textAlign: 'center', padding: '10px 0', backgroundColor: '#0093d5'}} className="map-panel-btn">Cases</span>
                 </div>

                  {totalActiveCasesEl}

                  {cummulativeConfirmedCasesEl}

                  {cummulativeRecoveredCasesEl}

                  {cummulativeDeathCasesEl}

             </div>
          </div>

          <style jsx>
            {`

              .map-panel-wrapper {
                min-height: 0px;
                min-width: 0px;
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
                -moz-box-pack: initial;
                justify-content: initial;
                -moz-box-align: initial;
                align-items: initial;
                padding: 9px;
                position: absolute;
                bottom: 20px;
                left: 10px;
                z-index: 10;
                background: rgb(255, 255, 255) none repeat scroll 0% 0%;
                gap: 20px;
                border-radius: 5px;
                width: 175px;
                border: 1px solid rgb(204, 204, 204);
              }

              .map-panel-tab{
                min-height: 0px;
                min-width: 0px;
                display: flex;
                color: blue;
                flex-direction: column;
                flex: 1;
                -moz-box-pack: center;
                justify-content: center;
                -moz-box-align: center;
                align-items: center;
                cursor: pointer;
                border: 1px solid rgb(204, 204, 204);
                border-radius: 4px;
                padding: 5px;
                background: rgb(249, 249, 249) none repeat scroll 0% 0%;
              }

              .map-tab-header {
                min-height: 0px;
                min-width: 0px;
                display: flex;
                flex-direction: row;
                flex: 1 1 auto;
                -moz-box-pack: initial;
                justify-content: initial;
                -moz-box-align: initial;
                align-items: initial;
                z-index: 1;
              }
              .map-tab-parent {
                min-height: 0px;
                min-width: 0px;
                display: flex;
                flex-direction: column;
                flex: 1 1 auto;
                -moz-box-pack: initial;
                justify-content: initial;
                -moz-box-align: initial;
                align-items: initial;
              }
              .map-panel-btn {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                border-right: 0px none;
                height: 38px;
                border: 1px solid rgb(204, 204, 204);
                cursor: pointer;
                outline: currentcolor none medium;
                font-size: 12px;
                flex: 1 1 auto;
                background: rgb(255, 255, 255) none repeat scroll 0% 0%;
                color: rgb(71, 71, 71);
              }
              .margin-down {
                margin-bottom: 9px;
              }
              .panel-head-icon {
                font-size: 20px
              }
              .panel-head-text {
                color: black;
                text-align: center;
              }

            `}
          </style>

      </React.Fragment>

      );
    }
}
