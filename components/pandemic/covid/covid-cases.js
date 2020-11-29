import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {getCummulativeCases, isObjectEquivalent, getCummulativeCasesV2API} from '../../utils/Helpers';
import XAxisChart from '../../utils/charts/XAxisChart';

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

       let deathCases=getCummulativeCasesV2API(this.props.covidData,8901); //death cases

       this.setState({
         deathCases: deathCases,
       });

       let confirmedCases=getCummulativeCasesV2API(this.props.covidData,8023); //confirmed cases

       this.setState({
         confirmedCases: confirmedCases,
       });

       let recoveredCases=getCummulativeCasesV2API(this.props.covidData,9085); //recovered cases

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
    let totalActiveCases=0;

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

    //Active cases
    if(this.state.confirmedCases!=null && this.state.recoveredCases!=null && this.state.deathCases!=null){
      totalActiveCases=  totalConfirmedCases - (totalRecoveredCases+totalDeathCases);
      totalActiveCasesEl =[<div style={mapPanelContent}>
          <div>  <span style={casesValue}>{totalActiveCases} </span> <br/> <span style={casesText}>active cases</span>  </div>
      </div>];
    }

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                      ];

      //death cases
      let deathCat=[];
      let deathVals=[];
      let deathCasesObj ={}
      if(this.state.deathCases!=null){
        deathCat= this.state.deathCases.map(dt => {
          const d = new Date(dt.date);
          deathCasesObj[dt.date]=dt.value;
          let mnth=monthNames[d.getMonth()];
          let day =d.getDate();
          return `${mnth} ${day}`
        });
        deathVals = this.state.deathCases.map(val => val.value)
      }

      //recovered cases
      let recoveredCat=[];
      let recoveredVals=[];
      let recoveredCasesObj = {}
      if(this.state.recoveredCases!=null){
        recoveredCat= this.state.recoveredCases.map(dt => {
          const d = new Date(dt.date);
          recoveredCasesObj[dt.date] = dt.value;
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


    //active cases
    let activeCat=[];
    let activeVals=[];

    if(this.state.confirmedCases!=null && this.state.recoveredCases!=null && this.state.deathCases!=null){
      console.log(deathCasesObj);
      this.state.confirmedCases.forEach(entry => {
        let confirmDate = new Date(entry.date);
        let activeVal = 0;
        let deathVal=0;
        let recoveredVal=0;

        try{
          deathVal=Number(deathCasesObj[entry.date]);
        }catch(err) {

        }
        try{
          recoveredVal=Number(recoveredCasesObj[entry.date]);
        }catch(err) {

        }
        activeVal = Number(entry.value) - (deathVal+recoveredVal);
        let mnth=monthNames[confirmDate.getMonth()];
        let day =confirmDate.getDate();
        activeVals.push(activeVal);
        activeCat.push(`${mnth} ${day}`);

      });

    }

    return (

      <React.Fragment>

            <div class="columns">
              <div class="column" >
                <div style={{width: '800px'}}>
                  {cummulativeConfirmedCasesEl}
                  <XAxisChart vals={confirmedVals} cat={confirmedCat} chartType={'bar'} color={'#7d7979'}/>
                </div>
              </div>
              <div class="column">
                <div style={{width: '800px'}}>
                  {cummulativeRecoveredCasesEl}
                  <XAxisChart vals={recoveredVals} cat={recoveredCat} chartType={'bar'} color={'#00ff73'}/>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">
                <div style={{width: '800px'}}>
                  {cummulativeDeathCasesEl}
                  <XAxisChart vals={deathVals} cat={deathCat} chartType={'bar'} color={'#ff0000'}/>
                </div>
              </div>
              <div class="column">
                <div style={{width: '800px'}}>
                  {totalActiveCasesEl}
                  <XAxisChart vals={activeVals} cat={activeCat} chartType={'bar'} color={'#6e5075'}/>
                </div>
              </div>
            </div>

      </React.Fragment>

      );
    }
}
