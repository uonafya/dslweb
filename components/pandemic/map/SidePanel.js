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
      dataDidChange: false
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


  componentDidMount(){
    console.log("data quality 1");
    console.log(this.props.covidData);
    this.createLineGraphsConfig(this.props.covidData);
  }

   createLineGraphsConfig = (deathCases)=>{
     if(deathCases!=null){
       let deathCases=getCummulativeCases(this.props.covidData,8901); //death cases
       const vxWidth = 155;
       const vxHeight = 50;

       const xSelector = d => new Date(d.date); // d.date is unix timestamps
       const ySelector = d => d.value;

       const xScale = scaleTime({
         range: [0, vxWidth],
         domain: extent(deathCases, xSelector), //get hightest and lowest date to point on scale
       });

       const yScale = scaleLinear({
         range: [vxHeight, 0],
         domain: [0,max(deathCases, ySelector)],
       });

       this.setState({
         deathCases: deathCases,
         xSelector: xSelector,
         ySelector: ySelector,
         xScale: xScale,
         yScale: yScale,
         vxWidth: vxWidth,
         vxHeight: vxHeight,
       });
     }

   }

  componentDidUpdate (prevProps, prevState) {
    console.log("data quality");
    console.log(this.props.covidData);
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


    let cummulativeCasesEl;
    if(this.state.deathCases==null){
      cummulativeCasesEl=null;
    }else{
      console.log("again");
      console.log(this.state.deathCases);
      cummulativeCasesEl = <svg width={this.state.vxWidth} height={this.state.vxHeight}>

         <LinePath
           data={this.state.deathCases}
           x={d => this.state.xScale(this.state.xSelector(d))}
           y={d => this.state.yScale(this.state.ySelector(d))}
           strokeWidth={1.5}
           stroke="rgb(0, 147, 213)"
           shapeRendering="geometricPrecision"
         />
       </svg>
    }


    return (


      <React.Fragment>
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
                .map-panel-content {
                  min-height: 0px;
                  min-width: 0px;
                  display: flex;
                  flex-direction: column;
                  flex: 0 0 auto;
                  -moz-box-pack: end;
                  padding: 4px;
                  padding: 4px;
                  justify-content: center;
                  align-items: center;
                  color: rgb(71, 71, 71);
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

          <div className="map-panel-wrapper">

               <div className="map-tab-parent">

                 <div className="map-tab-header">
                   <div className="map-panel-tab">
                     <span><i className="fas fa-globe-africa panel-head-icon"></i></span>
                     <span className="panel-head-text">Choropleth Map</span>
                  </div>

                   <div className="map-panel-tab">
                     <span><i className="fas fa-map-marked panel-head-icon"></i></span>
                     <span className="panel-head-text">Bubble Map</span>
                   </div>
                 </div>

                 <div className="map-tab-header">
                   <button className="map-panel-btn">Cases</button>
                   <button className="map-panel-btn">Death</button>
                 </div>

                 <div className="map-panel-content">

                  {cummulativeCasesEl}

                 </div>

             </div>
          </div>
      </React.Fragment>

      );
    }
}
