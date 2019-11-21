import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import fetch from 'isomorphic-unfetch';
import { pivotConvert } from '../components/utils/converters/PivotConverter';
import PlotlyPivot from '../components/PlotlyPivot';


const Page = withRouter(props => (
  <Layout>
    {/* Breadcrumb */}
    <section className="section m-t-50 m-b-5 bcclear p-b-15">
      <div className="container">
        <div className="columns">
            <div className="column is-one-third">
                <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
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
            <div className="column text-right">
                <a className="is-link" onClick={() => Router.back()} >&larr; Back to indicator summary</a>
            </div>
        </div>
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
              <h3 className="title text-left fcsecondary-dark text-bold">
                {props.error ? <div><small className="is-error is-fullwidth p-4 br-3 is-6">Error loading data </small></div> :
                  props.indicatorData.result.dictionary.indicators.map(one_ind => (
                  one_ind.name
                ))} &nbsp;
              </h3>
              <hr/>
            </div>
            <div className="column">
              <h4 className="title m-b-5 m-l-10 text-right is-6">
                {/* <!-- daterangepicker --> */}
                <label className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Time: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link m-l-0 p-l-0">
                      {
                        props.error ? "" : props.indicatorData.result.dictionary.parameters.period.map(prd => ""+prd+" ")
                      }
                    </a>
                    <div className="navbar-dropdown is-boxed p-5 min-w-100-px">
                      <div className="select is-fullwidth">
                        <select onChange={
                          (e) => {
                            const newRoute = `/indicator/${props.id}?pe=${e.target.value}&ouid=${props.ouid}`;
                            // console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value);
                            Router.push(newRoute)
                          }
                        }>
                          <option value="" disabled>Year</option>
                          {props.error ? "" : props.years.map(
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
                        {props.error ? "":
                          props.indicatorData.result.dictionary.parameters.location.map(one_ou => (
                            getOUname(props.indicatorData.result.dictionary.orgunits, one_ou)
                        ))}
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
                              {props.error ? "" :
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
                        {props.error ? "":
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
      <div className="container-fluid">
        <div className="columns">

          {/* Content */}
          {props.loading == true
            ? <div className="column bcwhite br-5"> <Loading showImage={false} isBig={false}/> </div>
            : ""
          }
          <div className={props.loading == true ? "column bcwhite br-5 hidden" : "column bcwhite br-5"}>
                <div className="container-fluid">
                    <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Indicator analysis</h4>
                    <div className="columns is-gapless">
                        <div className="column">
                            {/* Pivot */}
                            {/* {JSON.stringify(props.pivotData)} */}
                            <PlotlyPivot pivotData={props.pivotData} title={props.indicatorData.result.dictionary.indicators[0].name}/>
                            {/* end Pivot */}
                        </div>
                    </div>
                </div>
          </div>
          {/* end Content   */}

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
  const years = ["2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"];
  const countyList = await fetch(`http://41.89.94.105/dsl/api/counties`);
  const counties = await countyList.json();
  // for filters
  if(!error){
    if(pe == undefined){
      pe=indicatorData.result.dictionary.parameters.period.map( onepe => ( onepe ) )
    }
    if(ouid == undefined){
      ouid=indicatorData.result.dictionary.parameters.location.map( oneloc => ( oneloc ) )
    }
  }
  const pivotData = pivotConvert(indicatorData)
  console.log("pivotData == "+JSON.stringify(pivotData));
  
  return { indicatorData, id, ouid, pe, years, level:levell, counties, loading, error, pivotData };

};

function getOUname(dict, ou_id) {
  // var ou_name0 = dict.find(function(oneou) {
  //   return oneou.id == ou_id;
  // })
  // var ou_name = ou_name0.name
  // return ou_name

  // console.log("getOUname ----->>>> "+JSON.stringify(dict));
//   return dict[0].name
  return ou_id
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
async function fetchIndicatorData(id,ouid,pe,level,loading) {
  loading = true;
  let fetchIndicatorDataUrl = `http://41.89.94.105/dsl/api/indicators/${id}`;
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
  if(indicatorData.result.dictionary.indicators.length < 1){
    error = true;
    console.error("<<<<<< ERROR in fetchIndicatorData >>>>>");
  }else{
    error = false;
  }

  // if(!error){
    loading = false;
  // }
  
  return {indicatorData, loading, levell, error}
}


export default Page;
