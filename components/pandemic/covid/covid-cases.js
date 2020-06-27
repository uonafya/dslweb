import React from 'react';
import Popover from '@material-ui/core/Popover';
import { LinePath, Bar } from '@vx/shape';
import { scaleTime, scaleLinear } from '@vx/scale'
import ReactEcharts from 'echarts-for-react';
import {getCummulativeCases, isObjectEquivalent} from '../../utils/Helpers';
import XAxisChart from '../../utils/charts/XAxisChart';
import { extent, max } from 'd3-array';

export default class extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      deathCases: null,
      confirmedCases: null,
      recoveredCases: null,
    };
  }

   componentDidMount(){
     this.createLineGraphsConfig(this.props.covidData);
   }

   componentDidUpdate (prevProps, prevState) {
       if (this.props.covidData!=prevProps.covidData) {
         this.createLineGraphsConfig(this.props.covidData);
       }
   }

   createLineGraphsConfig = (covidData)=>{

     if(covidData!=null){

       let deathCases=getCummulativeCases(this.props.covidData,8901); //death cases

       this.setState({
         deathCases: deathCases,
       });

       let confirmedCases=getCummulativeCases(this.props.covidData,8023); //confirmed cases

       this.setState({
         confirmedCases: confirmedCases,
       });

       let recoveredCases=getCummulativeCases(this.props.covidData,9085); //recovered cases

       this.setState({
         recoveredCases: recoveredCases,
       });
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
      float: 'left'
    };
    const casesText ={
      fontSize: '12px',
      textAlign: 'left',
      float: 'left',
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

    //death cases
    if(this.state.deathCases==null){
      cummulativeDeathCasesEl=null;
    }else{
      let length=this.state.deathCases.length;
      let topMostData=this.state.deathCases[length-1]; //this is orderd list with last object carryling total cases;
      totalDeathCases=topMostData['value'];
      cummulativeDeathCasesEl =[<div style={mapPanelContent}>
        <div>  <span style={casesValue}>{totalDeathCases} </span> <br/> <span style={casesText}>deaths</span>  </div>
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
      </div>];
    }

    //confirmed
    if(this.state.confirmedCases==null){
      cummulativeConfirmedCasesEl=null;
    }else{
      let length=this.state.confirmedCases.length;
      let topMostData=this.state.confirmedCases[length-1]; //this is orderd list with last object carrying total cases;
      totalConfirmedCases=topMostData['value'];
      cummulativeConfirmedCasesEl =[<div style={mapPanelContent}>
          <div>  <span style={casesValue}>{totalConfirmedCases} </span> <br/> <span style={casesText}>confirmed cases</span>  </div>
      </div>];
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ];

      //death cases
      let deathCat=[];
      let deathVals=[];
      if(this.state.deathCases!=null){
        deathCat= this.state.confirmedCases.map(dt => {
          const d = new Date(dt.date);
          let mnth=monthNames[d.getMonth()];
          let day =d.getDate();
          return `${mnth} ${day}`
        });
        deathVals = this.state.deathCases.map(val => val.value)
      }

      //recovered cases
      let recoveredCat=[];
      let recoveredVals=[];
      if(this.state.recoveredCases!=null){
        recoveredCat= this.state.confirmedCases.map(dt => {
          const d = new Date(dt.date);
          let mnth=monthNames[d.getMonth()];
          let day =d.getDate();
          return `${mnth} ${day}`
        });
        recoveredVals = this.state.recoveredCases.map(val => val.value)
      }

    //confirmed cases
    let confirmedCat=[];
    let confirmedVals=[];

    if(this.state.confirmedCases!=null){
      confirmedCat= this.state.confirmedCases.map(dt => {
        const d = new Date(dt.date);
        let mnth=monthNames[d.getMonth()];
        let day =d.getDate();
        return `${mnth} ${day}`
      });
      confirmedVals = this.state.confirmedCases.map(val => val.value)
    }

    return (

      <React.Fragment>

        <section class="section">

          <div class="columns">
            <div class="column">
              {cummulativeConfirmedCasesEl}
              <XAxisChart vals={confirmedVals} cat={confirmedCat} chartType={'bar'} color={'#7d7979'}/>
            </div>
            <div class="column">
              {cummulativeRecoveredCasesEl}
              <XAxisChart vals={recoveredVals} cat={recoveredCat} chartType={'bar'} color={'#00ff73'}/>
            </div>
          </div>

          <div class="columns">
            <div class="column">
              {cummulativeDeathCasesEl}
              <XAxisChart vals={deathVals} cat={deathCat} chartType={'bar'} color={'#ff0000'}/>
            </div>
            <div class="column">

            </div>
          </div>

        </section>

      </React.Fragment>

      );
    }
}
