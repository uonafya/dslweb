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
          <div className="section-heading m-b-15 p-0">
            <div className="is-fullwidth p-0 m-b-10">
              <div className="columns">

                <div className="column p-t-0">
                  <div className="is-fullwidth indicator-tags bcwhite br-3 p-10">
                    <h6 className="text-left"><small className="fcgrey-dark-1 is-pulled-left">Selected indicators/cadres:</small></h6>
                    <hr className="m-t-5 m-b-5 bcwhite h-1-px"/>
                    <div class="field is-grouped is-grouped-multiline p-5 m-b-5 max-h-100-px auto-overflow-y ">
                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Malaria confirmed cases ratio</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">IPT2 utilization</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Low birth weight rate</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Patients started on ARVs</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Enrolled and eligible but not started on ART</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Facility Maternal Mortality Ratio</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">HIV+ pregnant women received ARV for PMTCT</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">HIV+ test rate - PMTCT-Maternity</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Proportion of Children under five attending CWC who under weight</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Total deliveries in facilities</a>
                          <a class="tag is-delete"></a>
                        </div>
                      </div>

                      <div class="control">
                        <div class="tags has-addons">
                          <a class="tag is-black">Still birth rate</a>
                          <a class="tag is-delete"></a>
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
                          <button className="button is-fullwidth is-light" tooltip="Pick an indicator">Indicator/cadre &#9662;</button>
                        </div>
                        <div className="column is-one-third">
                          <button className="button is-fullwidth is-light" tooltip="Pick an indicator">Organisation Unit &#9662;</button>
                        </div>
                        <div className="column is-one-third">
                          <button className="button is-fullwidth is-light" tooltip="Pick an indicator">Period &#9662;</button>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <button className="button is-secondary" tooltip="Pick an indicator">
                        <span class="icon is-small">
                          <i class="fas fa-plus"></i>
                        </span> &nbsp; Add
                      </button> &nbsp;
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          {/* =========================================Pick indicators/cadres-------------------------------------------- */}

          {/* <div class="columns">
              <div class="column is-narrow">
                <h6>Period Type:</h6>
                <div class="control">
                  <div class="select">
                    <PeriodType handler={this.handlePeriodTypeChange}/>
                  </div>
                </div>
              </div>
              <div class="column is-narrow">
                <h6>Period Span:</h6>
                <div class="control">
                  <div class="select">
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
