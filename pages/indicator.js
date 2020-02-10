import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import {settings} from '../components/utils/Settings';
import fetch from 'isomorphic-unfetch';
import Pivot from '../components/Table';
import DTable from '../components/DataTable';
import Displayline from '../components/Displayline';


const Page = withRouter(props => (
  <Layout>
    {/* Breadcrumb */}
    <section className="section m-t-20 m-b-5 bcclear p-b-15">
      <div className="container">
        <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
          <ul>
            <li><Link href="/"><a className="m-t-3">Home</a></Link></li>
            <li><Link href="/indicators"><a>All indicators</a></Link></li>
            <li className="is-active">
              <a aria-current="page">
                {props.error ? "" :
                  props.indicatorData.result.dictionary.indicators.map(one_indi => (
                    one_indi.id
                  ))
                } &nbsp;
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
    {/* Breadcrumb */}

    {/* Main Body */}
    <section className="section m-t-5 p-t-10">
      <div className="section-heading m-b-5">
        <div className="container">
        {props.loading == true
            ? <div className="columns"><div className="column"> <Loading showImage={false} isBig={false}/></div> </div>
            : ""
          }
          <div className={props.loading == true ? "columns hidden" : "columns"}>
            <div className="column is-one-third">
              <h3 className="title text-left fcsecondary-dark text-bold m-b-10">
                {props.error ? <div><small className="is-error is-fullwidth p-4 br-3 is-6">No data found </small></div> :
                  props.indicatorData.result.dictionary.indicators.map(one_ind => (
                  one_ind.name
                ))}
              </h3>
              <hr className="m-t-10 m-b-10"/>
            </div>
            <div className="column">
              <h4 className="title m-b-5 m-l-10 text-right is-6">
                {/* <!-- daterangepicker --> */}
                <label className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Time: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link m-l-0 p-l-0">
                      {
                        props.error ? props.years[0]: props.indicatorData.result.dictionary.parameters.period.map(prd => ""+prd+" ")
                      }
                    </a>
                    <div className="navbar-dropdown is-boxed p-5 min-w-100-px">
                      <div className="select is-fullwidth">
                        <select onChange={
                          (e) => {
                            const newRoute = `/indicator/${props.id}?pe=${e.target.value}&ouid=${props.ouid ? props.ouid : 18}`;
                            // console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value);
                            Router.push(newRoute)
                          }
                        }>
                          <option value="" disabled>Year</option>
                          {props.years.map(
                            oneyr => (
                              <option value={oneyr} disabled={oneyr==props.pe?'"true"':''} selected={oneyr==props.pe?'"true"':''}>{oneyr}</option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>
                </span> &nbsp;
                {/* <!-- daterangepicker --> */}

                {/* <!-- geopicker --> */}
                <label className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Location: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link m-l-0 p-l-0">
                        {props.error ? "No Data":
                          props.indicatorData.result.dictionary.parameters.location[0].name
                        }
                      </a>
                      <div className="navbar-dropdown is-boxed p-5 min-w-200-px">
                          <div className="select is-fullwidth">
                            <select  onChange={
                              (e) => {
                                const newOUroute = `/indicator/${props.id}?pe=${props.pe}&ouid=${e.target.value}`
                                // console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value)
                                Router.push(newOUroute);
                              }
                            }>
                              <option disabled value="">Pick a county</option>
                              <option value="18">NATIONAL (Kenya)</option>
                              {
                                props.counties.map(
                                  onecty => (
                                    <option value={onecty.id} disabled={onecty.id==props.ouid?'"true"':''} selected={onecty.id==props.ouid?'"true"':''}>{onecty.name}</option>
                                  )
                              )}
                            </select>
                          </div>
                      </div>
                    </div>
                </span> &nbsp;
                {/* <!-- geopicker --> */}


                {/* <!-- level --> */}
                <label className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Show data for: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link m-l-0 p-l-0">
                        {/* Organisation Unit Level  */}
                        {props.error ? "No Data":
                          props.level != undefined ? ""+getLEVELname(props.level)+"" : 'No level defined'
                          // props.level
                        }
                      </a>
                      <div className="navbar-dropdown is-boxed p-5 min-w-200-px">
                          <div className="select is-fullwidth">
                            <select  onChange={
                              (e) => {
                                const newLEVroute = `/indicator/${props.id}?pe=${props.pe}&ouid=${props.ouid}&level=${e.target.value}`
                                // console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value)
                                Router.push(newLEVroute);
                              }
                            }>
                              <option disabled value="">Pick a level</option>
                              <option value="1">National level (Kenya)</option>
                              <option value="2">County level</option>
                              <option value="3">Sub-county level</option>
                              <option value="4">Ward level</option>
                              <option value="5">Facility level</option>
                            </select>
                          </div>
                      </div>
                    </div>
                </span> &nbsp;
                {/* <!-- level --> */}

              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="columns">

          {/* Content */}
          {props.loading == true
            ? <div className="column bcwhite br-5"> <Loading showImage={false} isBig={false}/> </div>
            : ""
          }
          <div className={props.loading == true ? "column bcwhite br-5 hidden" : "column bcwhite br-5"}>
              <div className="text-left p-5 m-b-30">
                  {/* Description */}
                  <div className="columns is-centered">
                    <div className="column p-20">
                      {props.error? <span className="is-error is-fullwidth p-4 br-3 text-center">There was no data found for this period and indicator (ID: <strong><u>{props.id}</u></strong>). <br/><small>Try refreshing this page again. If this persists, notify the admin <a href="mailto:dndiithi@healthit.uonbi.ac.ke">here</a></small></span> :
                        props.indicatorData.result.dictionary.indicators.map(one_ind => (
                        <p>
                          <strong> {one_ind.name} &nbsp; </strong> <br/> {one_ind.description}
                          <hr className="m-t-10 m-b-10"/>
                        </p>
                      ))}
                    </div>
                  </div>
                  {/* Description */}
                </div>

                <div className="container">
                    {/* <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">At a glance</h4> */}
                    <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Indicator data</h4>
                    <div className="columns has-same-height is-gapless">
                      <div className="column">
                        {/* Tabs */}
                          <div className="tabs is-boxed" id="nav">
                            <ul>
                                <li data-target="pane-1" id="1" className="is-active">
                                  <a><span>Charts &amp; Graphs</span></a>
                                </li>
                                <li data-target="pane-2" id="2">
                                  <a><span>Table</span></a>
                                </li>
                                <li data-target="pane-3" id="3">
                                  <a><span>Analysis</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            {/* Tab 1 */}
                            <div className="tab-pane is-active" id="pane-1">
                                <div className="columns">
                                  <div className="column text-left">
                                    {/* {console.log( ' && ID:'+props.id+' && OU:'+props.ouid+' && PE:'+props.pe+' && LVL:'+props.level )} */}
                                    <Displayline id={props.id} ouid={props.ouid} pe={props.pe} level={props.level} hoo="toot"></Displayline>
                                </div>
                              </div>
                            </div>
                            {/* end Tab 1 */}

                            {/* Tab 2  */}
                            <div className="tab-pane" id="pane-2">
                              <div className="columns">
                                <div className="column text-center">
                                  {/* <h1>Pivot</h1> */}
                                  {/* <Pivot pivotData={getTableData(props.indicatorData.result.dictionary, props.indicatorData.result.data[props.id] )} /> */}
                                  {props.error
                                    ? <span className="is-error is-fullwidth p-4 br-3">!!!</span>
                                    : <DTable pivotData={getTableData(props.indicatorData.result.dictionary, props.indicatorData.result.data[props.id] )}/>
                                  }
                                </div>
                              </div>
                            </div>
                            {/* end Tab 2 */}

                            {/* Tab 3 - Compare*/}
                            <div className="tab-pane" id="pane-3">
                              <div className="columns m-t-20">
                                <div className="column notification shadow-heavy-light text-center is-vcentered">
                                  <p><a href="login.html" className="is-link fcsecondary-dark">Log in</a> or <a href="#" className="is-link fcsecondary-dark">request for an account</a> to analyse indicators</p>
                                  <br/>
                                  <button  className="button is-secondary" onClick={
                                    ()=>{
                                      goToAnalysisPage(props.id,props.pe,props.ouid,props.level)
                                    }
                                  }>Pivot</button>
                                  &nbsp; &nbsp;

                                  <Link href={"/timeseries?id="+props.id+"&ouid="+props.ouid+"&level="+props.level+"&pe="+props.pe}><a className="button is-secondary">Timeseries</a></Link>

                                  &nbsp; &nbsp;
                                  <Link href={"/compare?id="+props.id+"&ouid="+props.ouid+"&level="+props.level+"&pe="+props.pe}><a className="button is-secondary">Compare</a></Link>

                                </div>
                              </div>
                            </div>
                            {/* end Tab 3 */}
                        </div>
                        {/* Tabs */}

                      </div>
                    </div>
                </div>
          </div>
          {/* end Content   */}

          {/* Sidebar */}
          <div className="column is-one-fifth p-20 bcdefault br-5">
              <div className="divs m-l-10">
                  <div className="div m-b-30">
                    <h4 className="subtitle fcsecondary-dark text-left text-bold m-b-10">Tags:</h4>
                    <div className="tags p-l-15 p-r-10">
                      {/* <a href="#"><span className="tag is-secondary">Tuberculosis</span></a> &nbsp; &nbsp; */}
                    </div>
                  </div>
                  <div className="div m-b-20">
                      <div className="section-heading m-0 p-0 m-b-15">
                          <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">About this indicator:</h4>
                      </div>
                      {props.loading == true
                        ? <div className="columns m-l-15 p-0 m-b-0"><div className="column"> <Loading showImage={false} isBig={false}/></div> </div>
                        : ""
                      }
                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label className="label fcgrey-dark-3 text-small">Source:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.error ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label className="label fcgrey-dark-3 text-normal">
                                  <a href="#"><span className="tag is-secondary is-dark">{one_ind.source}</span></a>
                                </label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column m-l-0 p-0 m-b-0 is-one-third p-5">
                          <label className="label fcgrey-dark-3 text-small">Date created:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.error ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label className="label fcclack-1">{one_ind.date_created}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label className="label fcgrey-dark-3 text-small">Last updated:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.error ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label className="label fcblack-1">{one_ind.last_updated}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label className="label fcgrey-dark-3 text-small">Geo-scope:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.error ?
                              props.indicatorData.result.dictionary.orgunits.map(one_org => (
                                <a href="#"><span className="tag is-success is-dark">{one_org.name}</span></a>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label className="label fcgrey-dark-3 text-small">Time-span:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                              <label className="label fcblack-1 display-inline-b">
                                {props.error ? "" :
                                  props.indicatorData.result.dictionary.parameters.period[0]
                                }
                              </label>
                              {props.error ? "" :
                                props.indicatorData.result.dictionary.parameters.period.length > 1 ?
                                ` &nbsp; - &nbsp; <label className="label fcblack-1 display-inline-b">
                                  ${props.indicatorData.result.dictionary.parameters.period[parseFloat(props.indicatorData.result.dictionary.parameters.period.length) - 1 ]} </label>
                                ` : ""
                              }
                        </div>
                      </div>
                  </div>

                  <div className="div m-b-30">
                    <div className="section-heading m-0 p-0 m-b-5 m-l-15">
                        <h4 className="title is-5 text-left fcsecondary-dark text-bold m-b-15">Related indicators:</h4>
                    </div>
                    <div className="content m-l-15 m-t-0">
                        {/* <a href="#" className="is-link text-normal">Impact indicators</a> <br/> */}
                    </div>
                  </div>
                </div>
            </div>
            {/* end Sidebar */}

        </div>
      </div>

    </section>
      {/* end Main Body */}
  </Layout>
));

Page.getInitialProps = async function(context) {
  let { id } = context.query; //get GET params sent to this page
  let { pe } = context.query; //get GET params sent to this page
  let { ouid } = context.query; //get GET params sent to this page
  let { level } = context.query; //get GET params sent to this page
  let loadingg = true;
  let { indicatorData, loading, levell, error } = await fetchIndicatorData(id,ouid,pe,level,loadingg)

  // for filters
  const years = ["2020","2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"];
  const countyList = await fetch(`${settings.dslBaseApi}/counties`);
  const counties = await countyList.json();
  // for filters
  if(!error){
    if(pe == undefined){
      pe=indicatorData.result.dictionary.parameters.period.map( onepe => ( onepe ) )
    }
    if(ouid == undefined){
      ouid=indicatorData.result.dictionary.parameters.location.map( oneloc => ( oneloc.ouid ) )
    }
  }
  return { indicatorData, id, ouid, pe, years, level:levell, counties, loading, error };

};


function getTableData(dictionary, row_data) {
  const main_data = {};
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  // console.log(JSON.stringify(row_data));
  // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~");
  main_data.columns = [{ dataField: 'pe', text: 'Period' }, { dataField: 'ou', text: 'Organisation Unit'}, { dataField: 'val', text: 'Value'} ];
  main_data.data = []
  // const main_data = [ ["Period", "Organisation Unit", "Value"] ]
  row_data.forEach(row => {
    // const one_innerow = [];
    const one_innerow = {};
    var ou_name = dictionary.orgunits.find(function(oneou) {
      return oneou.id == row.ou;
    });
    one_innerow.pe = row.period;
    one_innerow.ou = ou_name.name;
    one_innerow.val = parseFloat(row.value);
    main_data.data.push(one_innerow);
  });
  return main_data
}

function getLEVELname(lvl_id) {
  const level_data = [
    {"id": 1, "level": "National level"},
    {"id": 2, "level": "County level"},
    {"id": 3, "level": "Sub-county level"},
    {"id": 4, "level": "Ward level"},
    {"id": 5, "level": "Facility level"},
  ]
  var lvl_name0 = level_data.find(function(onelvl) {
    return onelvl.id == lvl_id;
  })

  var lvl_name = lvl_name0.level
  return lvl_name
}


function goToAnalysisPage(id,pe,ouid,level) {
  let analysisUrl = `/analyse/${id}`;
  if(pe != undefined){
    analysisUrl += `?pe=${pe}`;
  }
  if(ouid != undefined){
    analysisUrl += `&ouid=${ouid}`;
  }
  if(level != undefined){
    analysisUrl += `&level=${level}`;
  }
  // console.log("goToAnalysisPage URL-> "+analysisUrl);
  Router.push(analysisUrl)
}

async function fetchIndicatorData(id,ouid,pe,level,loading) {
  loading = true;
  let fetchIndicatorDataUrl = `${settings.dslBaseApi}/indicators/${id}`;
  let levell = level
  if(pe != undefined){
    fetchIndicatorDataUrl += `?pe=${pe}`;
  }
  if(ouid != undefined){
    fetchIndicatorDataUrl += `&ouid=${ouid}`;
  }
  if(level != undefined){
    fetchIndicatorDataUrl += `&level=${level}`;
  }
  console.log(`// running fetchIndicatorData. ID:${id} && OU:${ouid} && PE:${pe} && LEVEL:${level}. FINAL_URL=${fetchIndicatorDataUrl}`)
  const fetchIndicatorData = await fetch(fetchIndicatorDataUrl);
  const indicatorData = await fetchIndicatorData.json();

  let error;
  try{
    if(indicatorData.result.dictionary.indicators.length < 1){
      error = true;
      console.error("<<<<<< ERROR in fetchIndicatorData >>>>>");
    }else{
      error = false;
    }
  }catch(error){
    error = false;
  }


  // if(!error){
    loading = false;
  // }
  return {indicatorData, loading, levell, error}
}


export default Page;
