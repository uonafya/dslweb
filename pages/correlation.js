import Layout from "../components/Layout";
import Link from 'next/link';

export default function Correlation() {
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
                                <p><strong>Correlation analysis is </strong>{" "} aborum adipisicing elit qui id. Occaecat deserunt id occaecat mollit magna ut aliqua nulla dolore eiusmod do. Id ex non tempor sit Lorem nulla tempor cillum adipisicing.</p>
                                <p>Minim proident mollit reprehenderit proident tempor. Eiusmod elit dolore eu occaecat incididunt aute eu quis nostrud non id. Laboris sint sit ex ut cupidatat laborum duis aliquip duis dolor nostrud cillum non ullamco. Ullamco incididunt aliquip excepteur duis dolore elit ullamco ex. Tempor aliqua id reprehenderit nostrud officia dolor laborum culpa deserunt amet. Duis pariatur non fugiat ea aliquip magna.</p>
                                <p>Proident amet culpa ex nostrud qui excepteur veniam dolore mollit voluptate irure. Et commodo aute qui minim ut minim ut. Ipsum proident laboris consectetur esse non excepteur velit exercitation officia. Cupidatat quis deserunt laborum pariatur elit incididunt aliquip qui. Proident do id non elit nulla cillum reprehenderit occaecat.</p>
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
                                        <Link href={"/analyses/indicator_correlation?id=1001&ouid=1001"}><a className="title is-5">Indicator to Indicator</a></Link>
                                      </div>
                                    </div>

                                    <div className="content">
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
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
                                        <a href="#" className="title is-5">Indicator to Weather</a>
                                      </div>
                                    </div>

                                    <div className="content">
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
                                    </div>
                                  </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="card">
                                  <div className="card-content">
                                    <div className="media">
                                      <div className="media-left">
                                          <i className="fa fa-object-group fa-2x fcprimary-light" aria-hidden="true"></i>
                                      </div>
                                      <div className="media-content">
                                        <a href="#" className="title is-5">Indicator to Cadre</a>
                                      </div>
                                    </div>

                                    <div className="content">
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
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
                                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
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
