import Link from 'next/link';
import Layout from '../components/Layout';
export default function UHC() {
  return (
  <div>
    <Layout>
      <section className="section m-t-5 p-t-10">
        {/* <!-- Title --> */}
        <div className="section-heading m-b-5">
          <div className="container">
            <h3 className="title text-center fcsecondary-dark text-bold">Universal Health Coverage</h3>
            <hr/>
          </div>
        </div>
        <div className="container text-left p-5 m-b-30">
          <div className="columns is-centered">
            <div className="column is-one-quarter">
              <h4 className="title is-5 text-left text-uppercase fcsecondary-dark text-bold">What is UHC?</h4>
              <p><strong>Universal Health Coverage</strong> (UHC) means that all individuals and communities receive the health services they need without suffering financial hardship. It includes the full spectrum of essential, quality health services, from health promotion to prevention, treatment, rehabilitation, and palliative care.</p>
              <p>UHC enables everyone to access the services that address the most significant causes of disease and death, and ensures that the quality of those services is good enough to improve the health of the people who receive them.
              </p>
              <p>Protecting people from the financial consequences of paying for health services out of their own pockets reduces the risk that people will be pushed into poverty because unexpected illness requires them to use up their life savings, sell assets, or borrow – destroying their futures and often those of their children.</p>
              <p>Achieving UHC is one of the targets the nations of the world set when adopting the Sustainable Development Goals in 2015. Countries that progress towards UHC will make progress towards the other health-related targets, and towards the other goals. Good health allows children to learn and adults to earn, helps people escape from poverty, and provides the basis for long-term economic development.</p>
              <blockquote>
                <ul>
                  <li><a href="https://uhckenya.org/" target="_blank">- <small>UHC Kenya</small></a></li>
                  <li><a href="https://www.who.int/news-room/fact-sheets/detail/universal-health-coverage-(uhc)" target="_blank">- <small>World Health Organisation</small></a></li>
                  <li><a href="http://www.health.go.ke/wp-content/uploads/2019/01/UHC-QI-Policy-Brief.pdf" target="_blank">- <small>MoH Policy Brief - UHC</small></a></li>
                </ul>
              </blockquote>
              <br/>
              <h4 className="title is-5 text-left text-uppercase fcsecondary-dark text-bold m-t-10 m-b-5">UHC Objectives</h4>
              <div className="m-l-20">
                <li>
                  <Link href="/indicators?search=impact" as="/indicators?search=impact"><a className="is-link text-bold">Impact indicators</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=communicable" as="/indicators?search=communicable"><a className="is-link text-bold">Communicable diseases</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=NCDs" as="/indicators?search=NCDs"><a className="is-link text-bold">NCDs</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=essential%20services" as="/indicators?search=essential%20services"><a className="is-link text-bold">Improved access to essential services</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=minimise%20risks" as="/indicators?search=minimise%20risks"><a className="is-link text-bold">Minimise health risks</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=essential%20medicines" as="/indicators?search=essential%20medicines"><a className="is-link text-bold">Improved access to essential medicines</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=human%20resources" as="/indicators?search=human%20resources"><a className="is-link text-bold">Human resources for Health</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=infrastructure" as="/indicators?search=infrastructure"><a className="is-link text-bold">Health infrastructure</a></Link>
                </li>
                <li>
                  <Link href="/indicators?search=social%20protection" as="/indicators?search=social%20protection"><a className="is-link text-bold">Improved social protection</a></Link>
                </li>
              </div>
            </div>

            <div className="column" id="uhc-diag">
              <div className="tile is-ancestor text-center">
                <div className="tile is-parent p-5 is-vertical is-1">
                  <article className="tile is-child notification is-warning">
                    <p className="subtitle text-vertical-rl fcwhite">Effectiveness</p>
                  </article>
                  <article className="tile is-child notification is-warning">
                    <p className="subtitle text-vertical-rl fcwhite">Equity</p>
                  </article>
                  <article className="tile is-child notification is-warning">
                    <p className="subtitle text-vertical-rl fcwhite">Efficiency</p>
                  </article>
                </div>
                <div className="tile is-vertical"> {/* <!--  is-8  --> */}
                  <div className="tile is-parent p-5">
                    <article className="tile is-child notification">
                      <div className="columns">
                        <div className="column bcerror br-5 fcwhite">
                          <p className="subtitle text-uppercase m-t-15">Healthy lives and wellbeing for all at all ages</p>
                          <div className="content text-center">
                            <div className="columns">
                              <div className="column"><small className="fcwhite text-uppercase">Healthy Life</small></div>
                              <div className="column"><small className="fcwhite text-uppercase">Burden of Disease</small></div>
                              <div className="column"><small className="fcwhite text-uppercase">Burden of Risk Factors</small></div>
                            </div>
                          </div>
                        </div>
                        <div className="column is-one-fifth">
                            <div className="content centr text-center m-t-10">
                              <p className="subtitle fcsecondary-dark text-uppercase">Impact SDG3</p>
                              <span className="icon is-medium">
                                <i className="fas fa-arrow-circle-right fa-2x fcsecondary-dark"></i>
                                <i className="fas fa-arrow-circle-left fa-2x fcsecondary-dark"></i>
                              </span>
                            </div>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="tile is-parent p-5">
                    <article className="tile is-child notification bcdefault p-10">
                      <div className="columns">
                        <div className="column text-center p-5">
                          <span className="icon">
                            <i className="fas fa-arrow-up fa-3x fcprimary-dark"></i>
                          </span>
                        </div>
                      </div>
                    </article>
                  </div>
                  <div className="tile is-parent p-5">
                      <article className="tile is-child notification">
                        <div className="columns">
                          <div className="column bcprimary-light br-5">
                            {/* <!-- zz --> */}
                            <div className="columns">
                                <div className="column is-2">
                                    <article className="notification is-success">
                                    <p className="subtitle text-vertical-rl">Effectiveness</p>
                                    </article>
                                </div>
                                <div className="column is-three-fifths">
                                    <div className="columns p-5">
                                        <div className="column p-3">
                                            <article className="notification is-success p-5">
                                                <p className="text-uppercase">Essential Services Availability</p>
                                            </article>
                                        </div>
                                        <div className="column p-3">
                                            <article className="notification is-success p-5">
                                                <p className="text-uppercase">Essential Services Coverage</p>
                                            </article>
                                        </div>
                                        <div className="column p-3">
                                            <article className="notification is-success p-5">
                                                <p className="text-uppercase">Financial Risk Protection</p>
                                            </article>
                                        </div>
                                    </div>
                                    <div className="columns">
                                        <div className="column p-3">
                                            <article className="notification is-success p-5">
                                                <p className="subtitle text-uppercase m-b-5">Other SDGs Health Interventions</p>
                                                <small>Social, commercial, environmental, political</small>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-one-fifth">
                                    <article className="tile notification is-success">
                                    <p className="subtitle text-vertical-rl">Service <br/> Satisfaction</p>
                                    </article>
                                </div>
                            </div>
                            {/* <!-- zz/ --> */}
                          </div>
                          <div className="column is-one-fifth">
                            <div className="content centr text-center m-t-10">
                              <p className="subtitle fcsecondary-dark text-uppercase m-b-0">Outcomes</p>
                              <p className="l-h-1 text-small m-b-0">Essential services utilization</p> <br/>
                              <span className="icon is-medium">
                                <i className="fas fa-hands-helping fa-2x fcsecondary-dark"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                        </article>
                  </div>
                  <div className="tile is-parent p-5">
                      <article className="tile is-child notification bcdefault p-10">
                        <div className="columns">
                          <div className="column text-center p-5">
                            <span className="icon">
                              <i className="fas fa-arrow-up fa-3x fcsecondary-dark"></i>
                            </span>
                          </div>
                          <div className="column text-center p-5">
                            <span className="icon">
                              <i className="fas fa-arrow-up fa-3x fcsecondary-dark"></i>
                            </span>
                          </div>
                          <div className="column text-center p-5">
                            <span className="icon">
                              <i className="fas fa-arrow-up fa-3x fcsecondary-dark"></i>
                            </span>
                          </div>
                          <div className="column text-center p-5">
                            <span className="icon">
                              <i className="fas fa-arrow-up fa-3x fcsecondary-dark"></i>
                            </span>
                          </div>
                          <div className="column text-center p-5"></div>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent p-5">
                        <article className="tile is-child notification">
                            <div className="columns">
                                <div className="column bcsecondary-light br-5">
                                    {/* <!-- yy --> */}
                                    <div className="columns">
                                        <div className="column">
                                            <div className="columns p-5">
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Access to Essential Services</p>
                                                    </article>
                                                </div>
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Quality of Essential Services</p>
                                                    </article>
                                                </div>
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Demand for Essential Services</p>
                                                    </article>
                                                </div>
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Resilience in Essential Services Provision</p>
                                                    </article>
                                                </div>
                                            </div>                
                                        </div>
                                    </div>
                                    {/* <!-- yy/ --> */}
                                </div>
                                <div className="column is-one-fifth">
                                    <div className="content centr text-center m-t-10">
                                        <p className="subtitle fcsecondary-dark text-uppercase m-b-0">Outputs</p>
                                        <p className="l-h-1 text-small m-b-0">Health systems performance</p> <br/>
                                        <span className="icon is-medium">
                                            <i className="fas fa-chart-bar fa-2x fcsecondary-dark"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent p-5">
                      <article className="tile is-child notification bcdefault p-10">
                        <div className="columns">
                          <div className="column text-center p-5">
                            <span className="icon">
                              <i className="fas fa-arrow-up fa-3x fcsecondary"></i>
                            </span>
                          </div>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent p-5">
                        <article className="tile is-child notification">
                            <div className="columns">
                                <div className="column bcsecondary-light-1 br-5">
                                    {/* <!-- ww --> */}
                                    <div className="columns">
                                        <div className="column is-2">
                                            <article className="notification is-info">
                                            <p className="subtitle text-vertical-rl">Health Financing</p>
                                            </article>
                                        </div>
                                        <div className="column">
                                            <div className="columns">
                                                <div className="column p-3">
                                                    <article className="notification is-info p-5">
                                                        <p className="subtitle text-uppercase m-b-5">National and Sub-national Service Delivery Systems</p>
                                                    </article>
                                                </div>
                                            </div>
                                            <div className="columns">
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Health Infrastructure</p>
                                                    </article>
                                                </div>
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="text-uppercase fcwhite">Medicines, Products &amp; Supplies</p>
                                                    </article>
                                                </div>
                                            </div>
                                            <div className="columns">
                                                <div className="column p-3">
                                                    <article className="notification bcsecondary-dark p-5">
                                                        <p className="subtitle text-uppercase fcwhite m-b-5">Health Workforce</p>
                                                    </article>
                                                </div>
                                            </div>
                                            <div className="columns">
                                                <div className="column p-3">
                                                    <article className="notification is-info p-5">
                                                        <p className="subtitle text-uppercase m-b-5">Health Governance</p>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-2">
                                            <article className="tile notification is-info">
                                            <p className="subtitle text-vertical-rl">Health Information</p>
                                            </article>
                                        </div>
                                    </div>
                                    {/* <!-- ww/ --> */}
                                </div>
                                <div className="column is-one-fifth">
                                    <div className="content centr text-center m-t-10">
                                        <p className="subtitle fcsecondary-dark text-uppercase m-b-0">Inputs/Processes</p>
                                        <p className="l-h-1 text-small m-b-0">Health system building block investments</p> <br/>
                                        <span className="icon is-medium">
                                            <i className="fas fa-hands-helping fa-2x fcsecondary-dark"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>
                  
                </div>

              </div>
            </div>
          </div>
        </div>

        
      </section>
    </Layout>
  </div>
)

}

