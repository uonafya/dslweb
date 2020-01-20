import Link from 'next/link';
import React, { PureComponent } from 'react';
import Layout from '../components/Layout';
import {fetchTimeSeriesData} from '../components/utils/Helpers';
import TimeSeriesLineGraph from '../components/utils/TimeSeriesLineGraph0';
import PeriodType from '../components/timeseries/PeriodTypeFilter'
import PeriodSpan from '../components/timeseries/PeriodSpanFilter'

class Timeseries extends React.Component {

  static getInitialProps({query}) {
    return {query}
  }

  constructor(props){
    super(props);
    this.state = {
      ouid: this.props.query.ouid,
      id: this.props.query.id,
      periodSpan: 2,
      periodtype: 'yearly',
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
                            TimeSeries
                          </a>
                        </li>
                    </ul>
                  </nav>
                </div>
                <div className="column text-right">
                  <Link href={"/timeseries?id="+this.props.query.id+"&ouid="+this.props.query.ouid+"&level="+this.props.query.level+"&pe="+this.props.query.pe}>
                    <a className="is-link">&larr; Back to indicator summary</a>
                  </Link>
                </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb */}

        <section>
          <PeriodType handler={this.handlePeriodTypeChange}/>
          <PeriodSpan  handler={this.handlePeriodSpanChange}/>
          <TimeSeriesLineGraph ouid={this.state.ouid} periodSpan={this.state.periodSpan} periodType={this.state.periodtype} indicatorId={this.state.id}/>
        </section>
      </Layout>
    );

  }
}

export default Timeseries;
