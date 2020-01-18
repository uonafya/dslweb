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
import FilterBar from '../components/comparison/filterBar'

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
        <section className="section m-t-20 m-b-5 bcclear p-b-15">
          <a className="container">
            <a className="columns">
                <a className="column is-one-third">
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
                </a>
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
            </a>
          </a>
        </section>
        {/* Breadcrumb */}

        <section style={{paddingBottom: "0" }} className="section p-t-10">
          <FilterBar/>

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
