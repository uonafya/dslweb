import Link from 'next/link';
import React, { PureComponent } from 'react';
import Layout from '../components/Layout';
import {fetchTimeSeriesData} from '../components/utils/Helpers';
import ProjectionTimeSeriesLineGraph from '../components/utils/ProjectionTimeSeriesLineGraph.js';
import TrendTimeSeriesLineGraph from '../components/utils/TrendTimeSeriesLineGraph.js';
import SeasonTimeSeriesLineGraph from '../components/utils/SeasonTimeSeriesLineGraph.js'
import PeriodType from '../components/timeseries/PeriodTypeFilter'
import PeriodSpan from '../components/timeseries/PeriodSpanFilter'
import CompareGraph from '../components/utils/CompareGraph';

class Timeseries extends React.Component {

  static getInitialProps({query}) {
    return {query}
  }

  constructor(props){
    super(props);
    this.state = {
      ouid: this.props.query.ouid,
      id: this.props.query.id,
      pe: '2019',
      data: ''
    }
    this.handlePeriodTypeChange = this.handlePeriodTypeChange.bind(this);
    this.handlePeriodSpanChange = this.handlePeriodSpanChange.bind(this);
  }

  handlePeriodTypeChange(periodType) {
    this.setState({ periodtype: periodType });
  }

  handlePeriodSpanChange(periodSpan) {
    this.setState({ periodSpan: periodSpan });
  }


  componentDidMount() {

  }

  componentDidUpdate(){

  }

  render() {
    //console.log(this.props.query) // The query is available in the props object
    return(
      <Layout>
        {/*
          <style jsx>
            {`
              a {
                text-decoration: none;
              }
              a:hover {
                opacity: 0.6;
              }
            `}
          </style>
        */}

        {/* Breadcrumb */}
        <section className="section m-t-50 m-b-5 bcclear p-b-15">
          <div className="container">
            <div className="columns">
                <div className="column is-one-third">
                  <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                    <ul>
                        <li><Link href="/"><a className="m-t-3">Home</a></Link></li>
                        <li><Link href="/indicators"><a>All indicators</a></Link></li>
                        <li id="thirdelem"><Link href={"/indicator/"+this.props.query.id}>
                          <a>
                              {this.props.query.id} &nbsp;
                          </a>
                        </Link></li>
                        <li className="is-active">
                          <a aria-current="page">
                            Compare
                          </a>
                        </li>
                    </ul>
                  </nav>
                </div>
                <div className="column text-right">
                  <nav className="breadcrumb m-t-10" aria-label="breadcrumbs">
                    <ul>
                      <li>
                        <Link href={"/indicator/"+this.props.query.id+"?ouid="+this.props.query.ouid+"&level="+this.props.query.level+"&pe="+this.props.query.pe}>
                          <a className="is-link">&larr; Back to indicator summary</a>
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb */}

        <section style={{paddingBottom: "0" }} className="section">
          {/* =========================================Pick indicators/cadres-------------------------------------------- */}
          <div className="section-heading m-b-15 p-0 indi-compare-add">
            <div className="is-fullwidth p-0 m-b-10">
              <div className="columns">

                <div className="column p-t-0">
                  <div className="is-fullwidth indicator-tags bcwhite br-3 p-10">
                    <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Selected indicators/cadres:</small></h6>
                    <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                    <div className="field is-grouped is-grouped-multiline p-5 m-b-5 max-h-100-px auto-overflow-y ">
                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Malaria confirmed cases ratio</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">IPT2 utilization</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Low birth weight rate</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Patients started on ARVs</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Enrolled and eligible but not started on ART</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Facility Maternal Mortality Ratio</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">HIV+ pregnant women received ARV for PMTCT</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">HIV+ test rate - PMTCT-Maternity</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Proportion of Children under five attending CWC who under weight</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Total deliveries in facilities</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                      <div className="control">
                        <div className="tags has-addons">
                          <a className="tag is-black">Still birth rate</a>
                          <a className="tag is-delete"></a>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="column is-one-third bcwhite br-3 m-b-10">
                  <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Add an indicator/cadre:</small></h6>
                  <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                  <div className="p-0 m-t-5 columns">
                    <div className="column is-four-fifths">
                      <div className="columns">
                        <div className="column is-one-third">
                          {/* <<<<<cadre/indicator */}
                          <div className="dropdown is-right one" id="dropdown-one">
                            <div className="dropdown-trigger">
                              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={ 
                                (e) => {
                                  let ddn = document.getElementById("dropdown-one");
                                  ddn.classList.toggle("is-active")
                                  if(ddn.classList.contains("is-active")){
                                    document.getElementById("search_indi_dropdown").focus()
                                  }
                                }
                              }>
                                <span>Indicator/cadre</span>
                                <span className="icon is-small">
                                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className="dropdown-menu min-w-250-px" id="dropdown-menu3" role="menu" onBlur={
                              (b) => {
                                // let drdwn = document.querySelectorAll(".dropdown.one");
                                // drdwn.forEach(element => {
                                //   element.classList.remove("is-active")
                                // });
                              }
                            }>
                              <div className="dropdown-content">
                                <div className="columns">
                                  <div className="column p-0">
                                    {/* Tabs */}
                                    <div className="tabs is-toggle" id="nav">
                                      <ul>
                                          <li data-target="pane-1" id="1" className="is-active">
                                              <a><span>Indicators</span></a>
                                          </li>
                                          <li data-target="pane-2" id="2"><a><span>Cadres</span></a></li>
                                      </ul>
                                    </div>
                                    <div className="tab-content">
                                      {/* Tab 1 */}
                                      <div className="tab-pane is-active" id="pane-1">
                                        <div className="columns">
                                          <div className="column text-left">
                                            <input type="text" placeholder="Search indicators" className="input is-fullwidth is-small" name="search_indi_dropdown" id="search_indi_dropdown"/>
                                            <hr className="dropdown-divider"/>
                                            <div className="list max-h-250-px auto-overflow-y text-small">
                                              <a href="#" className="dropdown-item">Dropdown item</a>
                                              <a className="dropdown-item">Other dropdown item with a really really really long but not wrong name</a>
                                              {/* <a href="#" className="dropdown-item is-active">Active dropdown item</a> */}
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* end Tab 1 */}
                                      {/* Tab 2  */}
                                        <div className="tab-pane" id="pane-2">
                                          <div className="columns">
                                            <div className="column text-left">
                                            <input type="text" placeholder="Search cadres" className="input is-fullwidth is-small" name="search_cadre_dropdown"/>
                                            <hr className="dropdown-divider"/>
                                            <div className="list max-h-250-px auto-overflow-y">
                                              <a href="#" className="dropdown-item">Dropdown item</a>
                                              <a className="dropdown-item">Other dropdown item</a>
                                              {/* <a href="#" className="dropdown-item is-active">Active dropdown item</a> */}
                                              <a href="#" className="dropdown-item">Other dropdown item</a>
                                              <a href="#" className="dropdown-item">With a divider</a>
                                            </div>
                                          </div>
                                        </div>
                                        </div>
                                      {/* end Tab 2 */}
                                    </div>
                                    {/* Tabs */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                         {/* cadre/indicator>>>>> */}
                        </div>
                        <div className="column is-one-third">
                          {/* org unit */}
                          <div className="dropdown is-left three" id="dropdown-three">
                            <div className="dropdown-trigger">
                              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={ 
                                (e) => {
                                  let ddn = document.getElementById("dropdown-three");
                                  ddn.classList.toggle("is-active")
                                  if(ddn.classList.contains("is-active")){
                                    document.getElementById("set_ou_level").focus()
                                  }
                                }
                              }>
                                <span>Organisation unit</span>
                                <span className="icon is-small">
                                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className="dropdown-menu min-w-250-px" id="dropdown-menu3" role="menu" onBlur={
                              (b) => {
                                // let drdwn = document.querySelectorAll(".dropdown.three");
                                // drdwn.forEach(element => {
                                //   element.classList.remove("is-active")
                                // });
                              }
                            }>
                              <div className="dropdown-content">
                                
                                <div className="columns p-10">
                                  <div className="column text-left p-10">
                                    <div className="select is-fullwidth">
                                        <select id="set_ou_level">
                                            <option disabled="true" selected="true">Org. unit level</option>
                                            <option>National</option>
                                            <option>County</option>
                                            <option>Subcounty</option>
                                            <option>Ward</option>
                                            <option>Facility</option>
                                        </select>
                                    </div>
                                    <hr className="dropdown-divider"/>
                                      <input type="text" placeholder="Search organisation units" className="input is-fullwidth is-small" name="search_ou_dropdown" id="search_ou_dropdown"/>
                                      <hr className="dropdown-divider"/>
                                      <div className="list max-h-250-px auto-overflow-y text-small">
                                        <a href="#" className="dropdown-item">Nakuru county</a>
                                        <a href="#" className="dropdown-item">Naivasha county</a>
                                        <a href="#" className="dropdown-item">Narok county</a>
                                        <a href="#" className="dropdown-item">Nanyuki county</a>
                                        <a href="#" className="dropdown-item">Kisii county</a>
                                        <a href="#" className="dropdown-item">Kisumu county</a>
                                        <a href="#" className="dropdown-item">Kakamega item</a>
                                        <a href="#" className="dropdown-item">Kericho item</a>
                                        <a href="#" className="dropdown-item">Nairobi item</a>
                                      </div>
                                  </div>
                                </div>
                                  

                              </div>
                            </div>
                          </div>
                          {/* org unit */}
                        </div>
                        <div className="column is-one-third">
                          {/* period */}
                          <div className="dropdown is-right two" id="dropdown-two">
                            <div className="dropdown-trigger">
                              <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3" onClick={ 
                                (e) => {
                                  let ddn = document.getElementById("dropdown-two");
                                  ddn.classList.toggle("is-active")
                                  if(ddn.classList.contains("is-active")){
                                    document.getElementById("monthpicker").focus()
                                  }
                                }
                              }>
                                <span>Period</span>
                                <span className="icon is-small">
                                  <i className="fas fa-angle-down" aria-hidden="true"></i>
                                </span>
                              </button>
                            </div>
                            <div className="dropdown-menu min-w-250-px" id="dropdown-menu3" role="menu" onBlur={
                              (b) => {
                                // let drdwn = document.querySelectorAll(".dropdown.two");
                                // drdwn.forEach(element => {
                                //   element.classList.remove("is-active")
                                // });
                              }
                            }>
                              <div className="dropdown-content">
                                <div className="columns">
                                  <div className="column p-0">
                                    {/* Tabs */}
                                    <div className="tabs is-toggle" id="nav">
                                      <ul>
                                          <li data-target="pane-1" id="1" className="is-active">
                                              <a><span>Monthly</span></a>
                                          </li>
                                          <li data-target="pane-2" id="2"><a><span>Yearly</span></a></li>
                                      </ul>
                                    </div>
                                    <div className="tab-content">
                                      {/* Tab 1 */}
                                      <div className="tab-pane is-active" id="pane-1">
                                        <div className="columns p-10">
                                          <div className="column text-left p-10">
                                            <hr className="dropdown-divider"/>
                                            <div className="list max-h-250-px auto-overflow-y text-small">
                                              <input type="month" className="input is-fullwidth" name="monthpicker" id="monthpicker" placeholder="Month/Year"/>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* end Tab 1 */}
                                      {/* Tab 2  */}
                                        <div className="tab-pane" id="pane-2">
                                          <div className="columns p-10">
                                            <div className="column text-left p-10">
                                            <div className="list max-h-250-px auto-overflow-y">
                                              <div className="select is-fullwidth">
                                                  <select>
                                                      <option>2019</option>
                                                      <option>2018</option>
                                                      <option>2017</option>
                                                      <option>2016</option>
                                                      <option>2015</option>
                                                  </select>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        </div>
                                      {/* end Tab 2 */}
                                    </div>
                                    {/* Tabs */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* period */}
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <button className="button is-secondary" tooltip="Pick an indicator">
                        <span className="icon is-small">
                          <i className="fas fa-plus"></i>
                        </span> &nbsp; Add
                      </button> &nbsp;
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* =========================================Pick indicators/cadres-------------------------------------------- */}

          {/* <div className="columns">
              <div className="column is-narrow">
                <h6>Period Type:</h6>
                <div className="control">
                  <div className="select">
                    <PeriodType handler={this.handlePeriodTypeChange}/>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <h6>Period Span:</h6>
                <div className="control">
                  <div className="select">
                    <PeriodSpan  handler={this.handlePeriodSpanChange}/>
                  </div>
                </div>
              </div>
          </div> */}


          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">Projection Analysis:  {this.state.period}</h5>
            <br/>
            <CompareGraph ></CompareGraph>
          </div>


        </section>
      </Layout>
    );

  }
}

export default Timeseries;
