import Layout from "../components/Layout";
import Link from 'next/link';

export default class extends React.Component{

  static getInitialProps({query}) {
    return {query}
  }


  constructor (props) {
    super(props);
    let ouid=18
    if(!this.props.query.ouid == undefined){
      ouid=this.props.query.ouid;
    }
    this.state = {
      ouid: ouid,
      id: this.props.query.id,
      level: this.props.query.level,
      ou_name: this.props.query.ouid,

    };

  }


  render() {
      return (
          <div>
              <Layout>
                  <section className="section m-t-30 p-t-20">
                      {/* <!-- Title --> */}
                      <div className="section-heading m-b-5 m-t-20">
                          <div className="container columns display-flex flex-center flex-stretch m-t-20">
                              <div className="column">
                                  <span className="text-left">
                                      {" "}
                                      <a href="/">&larr; Go back</a>
                                  </span>
                              </div>
                              <div className="column">
                                  <h3 className="title fcsecondary-dark text-bold">
                                      Correlation analysis
                                  </h3>
                              </div>
                              <hr className="m-t-10 m-b-10" />
                          </div>
                      </div>
                      <div className="container text-left p-20 p-t-30 p-b-30 m-b-">
                          <div className="columns is-centered bcwhite m-t-20">
                              <div className="column">
                                  <p><strong>Correlation analysis is </strong>{" "} a data analysis model that measures the strength of association between two variables and the direction of the relationship. </p>
                                  <p> In terms of the strength of relationship, the value of the correlation coefficient varies between +1 and -1.  A value of ± 1 indicates a perfect degree of association between the two variables.</p>
                                  <p> As the correlation coefficient value goes towards 0, the relationship between the two variables will be weaker.  The direction of the relationship is indicated by the sign of the coefficient; a + sign indicates a positive relationship and a – sign indicates a negative relationship. </p>

                              </div>
                          </div>
                          <div className="columns is-centered bcwhite m-t-20">
                              <div className="column">
                                  <div className="card">
                                    <div className="card-content">
                                      <div className="media">
                                        <div className="media-left">
                                            <i className="fa fa-dashboard fa-2x fcprimary-light" aria-hidden="true"></i>
                                        </div>
                                        <div className="media-content">
                                          <Link href={`/analyses/indicator_correlation?id=${this.props.query.id}&ouid=${this.state.ouid}`}><a className="title is-5">Indicator to Indicator</a></Link>
                                        </div>
                                      </div>

                                      <div className="content">
                                        Allows for analysing the correlation between selected indicator and another in the same organisation unit.
                                      </div>
                                    </div>
                                  </div>
                              </div>
                              <div className="column">
                                  <div className="card">
                                    <div className="card-content">
                                      <div className="media">
                                        <div className="media-left">
                                            <i className="fas fa-cloud-showers-heavy fa-2x fcsecondary-light" aria-hidden="true"></i>
                                        </div>
                                        <div className="media-content">
                                          <Link href={`/analyses/weather_correlation?id=${this.props.query.id}&ouid=${this.state.ouid}`}><a className="title is-5">Indicator to Weather</a></Link>
                                        </div>
                                      </div>

                                      <div className="content">
                                        Allows for analysing the correlation between selected indicator and various weather patterns.
                                      </div>
                                    </div>
                                  </div>
                              </div>

                              <div className="column">
                                  <div className="card">
                                    <div className="card-content">
                                      <div className="media">
                                        <div className="media-left">
                                            <i className="fas fa-people-carry fa-2x fcsecondary-light" aria-hidden="true"></i>
                                        </div>
                                        <div className="media-content">
                                          <a href="#" className="title is-5">Indicator to HR/workforce</a>
                                        </div>
                                      </div>

                                      <div className="content">
                                        Allows for analysing the correlation between selected indicator and health cadres distribution.
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>
              </Layout>
          </div>
      );
  }
}
