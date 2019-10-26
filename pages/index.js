import Layout from '../components/Layout';
import Link from 'next/link';
import SimpleSlider from '../components/utils/SimpleSlider'

export default function Index() {
  return (
    <div>
      <Layout>

        <section className="hero is-link is-fullheightz is-fullheight-with-navbarz m-t-50">
          <div className="hero-body p-t-40 p-b-40 text-center">
            <div className="container p-t-30 p-b-30">
              <div className="columns">
                <div className="column">
                    <div className="field has-addons herosearch-container">
                      <div className="control">
                        <input className="input text-left herosearch" type="text" placeholder="Find an indicator or dashboard"/>
                      </div>
                      <div className="control">
                        <a className="button is-info">
                          <i className="fas fa-search"></i>
                        </a>
                      </div>
                    </div>
                    <Link href="/indicators">
                      <a  className="button is-small is-primary">View all indicators</a>
                    </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading m-b-15">
            <div className="container">
              <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">What is DSL?</h4>
            </div>
          </div>
          <div className="container text-left p-5 m-b-30">
            <p>
              <strong>Data Service Layer</strong>, Is an integration and aggregation of health and related data sources that could potentially impact on health. It is a platform for collaboration and sharing of health information with key interest in analysis, prediction, anticipation of diverging and converging health factors. This will in the end support M&E functions for decision making.

            </p>
          </div>

          <div className="container">
              <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">At a glance</h4>
              <div className="columns has-same-height is-gapless">
                <div className="column">
                    <h4 className="title m-b-0 m-l-10 is-6">UHC</h4>
                    <div>
                      <SimpleSlider/>
                    </div>
                    <div className="p-l-15">
                      <a href="#" className="is-link text-smaller">Aliquam tincidunt mauris eu risus.</a> <br/>
                      <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                      <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                      <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                    </div>
                </div>
                <div className="column">
                    <h4 className="title m-b-0 m-l-10 is-6">Fresh still birth rate</h4>
                    <figure className="image is-5by2 m-10">
                      <img src="/static/images/g2.png" alt=""/>
                    </figure>
                    <div className="p-l-15">
                      <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                      <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                      <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                      <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                    </div>
                </div>
                <div className="column">
                    <h4 className="title m-b-0 m-l-10 is-6">Facilities by owner</h4>
                    <figure className="image is-5by2 m-10">
                      <img src="/static/images/g3.png" alt=""/>
                    </figure>
                    <div className="p-l-15">
                      <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                      <a href="#" className="is-link text-smaller">Ut aliquam sollicitudin leo.</a> <br/>
                      <a href="#" className="is-link text-smaller">Cras iaculis ultricies nulla.</a> <br/>
                      <a href="#" className="is-link text-smaller">Donec quis dui at dolor tempor interdum.</a> <br/>
                    </div>
                </div>
              </div>
          </div>

        </section>

        <section className="section">
          <div className="section-heading m-b-20">
              <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Indicator groups</h4>
          </div>
          <div className="container">
            <div className="columns">
              <div className="column">
                <div className="box">
                  <div className="content">
                    <h4 className="title is-5 text-bold">Universal Health Coverage</h4>
                    <div className="columns">
                      <div className="column is-one-quarter">
                          <h4 className="title is-5 m-b-5">UHC Objectives</h4>
                          <a href="#" className="is-link text-bold">Impact indicators</a> <br/>
                          <a href="#" className="is-link text-bold">Communicable diseases</a> <br/>
                          <a href="#" className="is-link text-bold">NCDs</a> <br/>
                          <a href="#" className="is-link text-bold">Improved access to essential services</a> <br/>
                          <a href="#" className="is-link text-bold">Minimise health risks</a> <br/>
                          <a href="#" className="is-link text-bold">Improved access to essential medicines</a> <br/>
                          <a href="#" className="is-link text-bold">Human resources for Health</a> <br/>
                          <a href="#" className="is-link text-bold">Health infrastructure</a> <br/>
                          <a href="#" className="is-link text-bold">Improved social protection</a> <br/>
                      </div>
                      <div className="column">
                          <h4 className="title is-5 m-b-5">UHC Indicators <span className="text-light">(44)</span> <a href="#" className="text-underline text-small is-link fcgrey-dark-2 text-light">View all</a></h4>
                          <div className="columns p-l-10 p-r-10">
                            <div className="column">
                                &middot; <a href="#" className="is-link text-smaller">Lorem ipsum dolor sit, consectetuer adipiscing elit.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Aliquam tincidunt mauris eu risus.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                            </div>
                            <div className="column">
                                &middot; <a href="#" className="is-link text-smaller">Integer vitae libero ac risus egestas placerat.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Integer vitae libero ac risus egestas placerat.</a> <br/>
                            </div>
                            <div className="column">
                                &middot; <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Ut aliquam sollicitudin leo.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Cras iaculis ultricies nulla.</a> <br/>
                                &middot; <a href="#" className="is-link text-smaller">Donec quis dui at dolor tempor interdum.</a> <br/>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>


            <div className="columns">
              <div className="column">
                <div className="box">
                  <div className="content">
                      <h4 className="title is-5 text-bold">Programs</h4>
                      <div className="columns">
                        <div className="column is-one-quarter">
                            <h4 className="title is-5 m-b-5">Programs</h4>
                            <a href="#" className="is-link text-bold">Family planning</a> <br/>
                            <a href="#" className="is-link text-bold">TB</a> <br/>
                            <a href="#" className="is-link text-bold">Malaria</a> <br/>
                            <a href="#" className="is-link text-bold">KEMSA</a> <br/>
                            <a href="#" className="is-link text-bold">NMCP</a> <br/>
                            <a href="#" className="is-link text-bold">DHIS2</a> <br/>
                        </div>
                        <div className="column">
                            <h4 className="title is-5 m-b-5">Program Indicators <span className="text-light">(372)</span> <a href="#" className="text-underline text-small is-link fcgrey-dark-2 text-light">View all</a></h4>
                            <div className="columns p-l-10 p-r-10">
                              <div className="column">
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Aliquam tincidunt mauris eu risus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                              </div>
                              <div className="column">
                                  &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Aliquam tincidunt mauris eu risus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Integer vitae libero ac risus egestas placerat.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Fusce pellentesque suscipit nibh.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Integer vitae libero ac risus egestas placerat.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Integer vitae libero ac risus egestas placerat.</a> <br/>
                              </div>
                              <div className="column">
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum commodo felis quis tortor.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Ut aliquam sollicitudin leo.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Cras iaculis ultricies nulla.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Donec quis dui at dolor tempor interdum.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Praesent placerat risus quis eros.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Aliquam tincidunt mauris eu risus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vestibulum auctor dapibus neque.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Nunc dignissim risus id metus.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Cras ornare tristique elit.</a> <br/>
                                  &middot; <a href="#" className="is-link text-smaller">Vivamus vestibulum ntulla nec ante.</a> <br/>
                              </div>
                            </div>
                        </div>
                      </div>
                    </div>

                </div>
              </div>


            </div>
          </div>
        </section>

        <section className="section">
            <div className="section-heading m-b-20">
                <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">DSL Partners</h4>
            </div>
            <div className="container hide-overflow">

                <div id="carousel-partners" className="carousel">
                  <div className="item-1 p-10 card m-5">
                    <a href="https://www.usaid.gov/kenya" target="_blank">
                      <img src="/static/images/usaid.jpeg" className="images1" alt="Partners"/>
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">USAID Kenya</h5>
                    </a>
                    </div>
                    <div className="item-2 p-10 card m-5">
                      <a href="https://www.uonbi.ac.ke/" target="_blank">
                        <img src="/static/images/uon.jpeg" className="images1" alt="Partners" />
                        <hr className="m-t-0 m-b-0"/>
                        <h5 className="text-bold text-center fcblack-1">University of Nairobi</h5>
                      </a>
                    </div>
                    <div className="item-3 p-10 card m-5">
                      <a href="http://www.health.go.ke/" target="_blank">
                        <img src="/static/images/MOH.png" className="images1" alt="Partners"/>
                        <hr className="m-t-0 m-b-0"/>
                        <h5 className="text-bold text-center fcblack-1">Ministry of Health</h5>
                      </a>
                    </div>
                    <div className="item-5 p-10 card m-5">
                      <a href="http://www.kemsa.co.ke/" target="_blank">
                        <img src="/static/images/kemsa.jpeg" className="images1" alt="Partners"/>
                        <hr className="m-t-0 m-b-0"/>
                        <h5 className="text-bold text-center fcblack-1">KEMSA</h5>
                      </a>
                    </div>
                    <div className="item-5 p-10 card m-5">
                      <a href="hiskenya.org" target="_blank">
                        <img src="/static/images/khis.png" className="images1" alt="Partners"/>
                        <hr className="m-t-0 m-b-0"/>
                        <h5 className="text-bold text-center fcblack-1">KHIS</h5>
                      </a>
                    </div>
                </div>

            </div>
        </section>
      </Layout>
    </div>
  );

}
