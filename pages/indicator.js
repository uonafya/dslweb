import Link from 'next/link';
import { withRouter } from 'next/router';
import Router from 'next/router'
import Layout from '../components/Layout';
import Loading from '../components/Loading';
import fetch from 'isomorphic-unfetch';
import Pivot from '../components/Table';
import { FetchIndicatorData } from '../components/utils/Helpers'

const Page = withRouter(props => (
  <Layout>
    {/* Breadcrumb */}
    <section className="section m-t-50 m-b-5 bcclear p-b-15">
      <div className="container">
        <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
          <ul>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/indicators"><a>All indicators</a></Link></li>
            <li className="is-active">
              <a aria-current="page">
                {props.indicatorData.result.dictionary.indicators.map(one_indi => (
                  one_indi.id
                ))} &nbsp;
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
            <div className="column">
              <h3 className="title text-left fcsecondary-dark text-bold">
                {props.indicatorData.result.dictionary.indicators.map(one_ind => (
                  one_ind.name
                ))} &nbsp;
              </h3>
              <hr/>
            </div>
            <div className="column">
              <h4 className="title m-b-5 m-l-10 text-right is-6">
                <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Time: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  {/* <!-- daterangepicker --> */}
                  <div className="navbar-item has-dropdown is-hoverable">
                    <a className="navbar-link m-l-0 p-l-0">
                      From {props.indicatorData.result.dictionary.parameters.period[0]} &nbsp;
                      {props.indicatorData.result.dictionary.parameters.period.length > 1 ?
                      "To "+props.indicatorData.result.dictionary.parameters.period[parseFloat(props.indicatorData.result.dictionary.parameters.period.length-1)]
                      :""}
                    </a>
                    <div className="navbar-dropdown is-boxed p-5">
                      <div className="select is-fullwidth">
                        <select onChange={
                          (e) => {
                            const newRoute = `/indicator/${props.id}?pe=${e.target.value}&ouid=${props.ouid}`;
                            console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value);
                            Router.push(newRoute)
                            // window.location.href = `/indicator/${props.id}?pe=${e.target.value}&ouid=${props.ouid}`
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
                  {/* <!-- daterangepicker --> */}
                </span> &nbsp;
                <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Location: </label>&nbsp;
                <span className="text-bold display-inline-b p-l-0 m-l-0">
                  {/* <!-- geopicker --> */}
                  <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link m-l-0 p-l-0">
                        {props.indicatorData.result.dictionary.parameters.location.map(one_ou => (
                            getOUname(props.indicatorData.result.dictionary.orgunits, one_ou)
                        ))}
                      </a>
                      <div className="navbar-dropdown is-boxed p-5 min-w-150-px">
                          <div className="select is-fullwidth">
                            <select  onChange={
                              (e) => {
                                const newOUroute = `/indicator/${props.id}?pe=${props.pe}&ouid=${e.target.value}`
                                console.log('//id=='+props.id+' & //ouid=='+props.ouid+' & //year='+e.target.value)
                                Router.push(newOUroute);
                                // window.location.href = `/indicator/${props.id}?pe=${props.pe}&ouid=${e.target.value}`
                              }
                            }>
                              <option disabled value="">Pick a county</option>
                              <option value="18">NATIONAL (Kenya)</option>
                              {props.counties.map(
                                onecty => (
                                  <option value={onecty.id} disabled={onecty.id==props.ouid?'"true"':''} selected={onecty.id==props.ouid?'"true"':''}>{onecty.name}</option>
                                )
                              )}
                            </select>
                          </div>
                      </div>
                    </div>
                    {/* <!-- geopicker --> */}
                </span> &nbsp;
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
                      {props.indicatorData.result.dictionary.indicators.map(one_ind => (
                        <p>
                          <strong> {one_ind.name} &nbsp; </strong> <br/> {one_ind.description}
                          <hr/>
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
                                    <a><span>{/* Pivot */} Table</span></a>
                                </li>
                                {/* <li data-target="pane-2" id="2"><a><span>Charts &amp; Graphs</span></a></li> */}
                                <li data-target="pane-3" id="3">
                                    <a><span>Compare</span></a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            {/* Tab 1 */}
                            <div className="tab-pane is-active" id="pane-1">
                              <div className="columns">
                                <div className="column text-center">
                                  {/* <h1>Pivot</h1> */}
                                  <Pivot pivotData={getPivotData(props.indicatorData.result.dictionary, props.indicatorData.result.data[props.id] )} />
                                </div>
                              </div>
                            </div>
                            {/* end Tab 1 */}

                            {/* Tab 2
                              <div className="tab-pane" id="pane-2">
                                <div className="columns">
                                  <div className="column text-center">
                                    <h1>Charts</h1>
                                  </div>
                                </div>
                              </div>
                             end Tab 2 */}

                            {/* Tab 3 - Compare*/}
                            <div className="tab-pane" id="pane-3">
                              <div className="columns m-t-20">
                                <div className="column notification shadow-heavy-light text-center is-vcentered">
                                  <p><a href="login.html" className="is-link fcsecondary-dark">Log in</a> or <a href="#" className="is-link fcsecondary-dark">request for an account</a> to compare indicators</p>
                                  <br/>
                                  <a href="#" className="button is-secondary">Compare</a>
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
                          <label for="" className="label fcgrey-dark-3 text-small">Source:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcgrey-dark-3 text-normal">
                                  <a href="#"><span className="tag is-secondary is-dark">{one_ind.source}</span></a>
                                </label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column m-l-0 p-0 m-b-0 is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-small">Date created:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcclack-1">{one_ind.date_created}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-small">Last updated:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcblack-1">{one_ind.last_updated}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-small">Geo-scope:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.orgunits.map(one_org => (
                                <a href="#"><span className="tag is-success is-dark">{one_org.name}</span></a>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>

                      <div className={props.loading == true ? "columns m-l-15 p-0 m-b-0 hidden" : "columns m-l-15 p-0 m-b-0"}>
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-small">Time-span:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                              <label for="" className="label fcblack-1 display-inline-b">
                                {props.indicatorData.result.dictionary.parameters.period[0]}
                              </label>
                              {props.indicatorData.result.dictionary.parameters.period.length > 1 ?
                                ` &nbsp; - &nbsp; <label for="" className="label fcblack-1 display-inline-b">
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
  let loadingg = true;
  let { indicatorData, loading } = await FetchIndicatorData(id,ouid,pe,loadingg)

  // for filters
  const years = ["2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"];
  const countyList = await fetch(`http://41.89.94.105/dsl/api/counties`);
  const counties = await countyList.json();
  // for filters
  if(pe == undefined){
    pe=indicatorData.result.dictionary.parameters.period.map( onepe => ( onepe ) )
  }
  if(ouid == undefined){
    ouid=indicatorData.result.dictionary.parameters.location.map( oneloc => ( oneloc ) )
  }

  return { indicatorData, id, ouid, pe, years, counties, loading };
};

function getPivotData(dictionary, row_data) {
  const main_data = [ ["Period", "Organisation Unit", "Value"] ]
  row_data.forEach(row => {
    const one_innerow = [];
    var ou_name = dictionary.orgunits.find(function(oneou) {
      return oneou.id == row.ou;
    });
    one_innerow.push(row.period);
    one_innerow.push(ou_name.name);
    one_innerow.push(parseFloat(row.value));
    main_data.push(one_innerow);
  });
  return main_data
}
function getOUname(dict, ou_id) {
    var ou_name0 = dict.find(function(oneou) {
      return oneou.id == ou_id;
    })
    var ou_name = ou_name0.name
  return ou_name
}

export default Page;
