import Link from 'next/link';
import React, { PureComponent } from 'react';
import Layout from '../components/Layout';
import {fetchTimeSeriesData, FetchIndicatorData} from '../components/utils/Helpers';
import ProjectionTimeSeriesLineGraph from '../components/utils/ProjectionTimeSeriesLineGraph.js';
import TrendTimeSeriesLineGraph from '../components/utils/TrendTimeSeriesLineGraph.js';
import SeasonTimeSeriesLineGraph from '../components/utils/SeasonTimeSeriesLineGraph.js'
import PeriodType from '../components/timeseries/PeriodTypeFilter'
import PeriodSpan from '../components/timeseries/PeriodSpanFilter'
import CompareGraph from '../components/utils/CompareGraph';
import FilterBar from '../components/comparison/filterBar'
import {ConvertToMonthlyLineGraph2} from '../components/utils/converters/Charts'

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
      data: '',
      queryParams: { //TODO: Clean this up. duplication
        id: this.props.query.id,
        ouid: this.props.query.ouid,
        pe: this.props.query.pe,
        level: this.props.query.level,
        ou_name: this.props.query.ouid,
        name: this.props.query.id
      },
      indicator_data: [{
          type: 'column',
          name: 'Jane',
          data: [3, 2, 1, 3, 4]
      }, {
          type: 'column',
          name: 'John',
          data: [2, 3, 5, 7, 6]
      }, {
          type: 'column',
          name: 'Joe',
          data: [4, 3, 3, 9, 0]
      }, {
          type: 'spline',
          name: 'Average',
          data: [3, 2.67, 3, 6.33, 3.33],
          marker: {
              lineWidth: 2,
              lineColor: 'red',
              fillColor: 'white'
          }
      }]
    }

    this.filterChange = this.filterChange.bind(this);
  }


  filterChange(){
    alert("filter");
  }

  componentDidMount() {
    (async () => {
      var is_error = false
      var err_msg = ''
      let {indicatorData}=await FetchIndicatorData(this.props.query.id,this.props.query.ouid,this.props.query.pe,null,null);
      var _data;
      if(indicatorData.messageType != undefined){
        is_error = true
        err_msg = indicatorData.messageType + ' ' + indicatorData.mesageContent
      }else{
        _data=ConvertToMonthlyLineGraph2(indicatorData.result);
      }

      this.setState({
         indicator_data: _data
     });
     })();

  }

  render() {

    return(
      <Layout>
        {/*
          <style jsx>
            {` a { text-decoration: none; } a:hover { opacity: 0.6; } `}
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
          <FilterBar filterCallBack = {this.filterChange} initProps={ this.state.queryParams } />

          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">Projection Analysis:  {this.state.period}</h5>
            <br/>
            <CompareGraph  indicatorData = {this.state.indicator_data}></CompareGraph>
          </div>

        </section>
      </Layout>
    );

  }
}

export default Timeseries;
