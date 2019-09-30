import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';

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
                  one_indi.name
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
          <h3 className="title text-left fcsecondary-dark text-bold"> 
            {props.indicatorData.result.dictionary.indicators.map(one_ind => (
              one_ind.name
            ))} &nbsp; 
          </h3>
          <hr/>
        </div>
      </div>
      <div className="container">
        <div className="columns">
          
          {/* Content */}
          <div className="column bcwhite br-5">
              <div className="text-left p-5 m-b-30">
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
                </div>
            
                <div className="container">
                    <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">At a glance</h4>
                    <hr/>
                    <div className="columns has-same-height is-gapless">
                      <div className="column">
                          <h4 className="title m-b-0 m-l-10 is-6">
                            <span className="text-bold display-inline-b text-larger fcsecondary-dark">TB curative rate</span> <br/>
                            <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Time:</label>
                            <span className="text-bold display-inline-b p-l-0 m-l-0">
                              <div className="navbar-item has-dropdown is-hoverable">
                                <a className="navbar-link m-l-0 p-l-0" href="#">
                                  May 2017 - Aug 2018
                                </a>
                                <div className="navbar-dropdown is-boxed p-5">
                                
                                  <a className="navbar-item" href="#">
                                      From &nbsp; <span className="fcsecondary">May 2017&#9662;</span>
                                  </a>
                                  <a className="navbar-item" href="#">
                                      To &nbsp; <span className="fcsecondary">Aug 2018&#9662;</span>
                                  </a>
                                </div>
                              </div>
                            </span> &nbsp;
                            <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Location:</label>
                            <span className="text-bold display-inline-b p-l-0 m-l-0">
                              <div className="navbar-item has-dropdown is-hoverable">
                                  <a className="navbar-link m-l-0 p-l-0" href="#">
                                    National
                                  </a>
                                  <div className="navbar-dropdown is-boxed p-5">
                                      <input type="text" className="input is-small m-0" placeholder="Search"/>
                                      <a href="#" className="navbar-item">National</a>
                                      <a href="#" className="navbar-item">Baringo County</a>
                                      <a href="#" className="navbar-item">Bomet County</a>
                                      <a href="#" className="navbar-item">Bungoma County</a>
                                      <a href="#" className="navbar-item">Busia County</a>
                                      <a href="#" className="navbar-item">Elgeyo Marakwet County</a>
                                      <a href="#" className="navbar-item">Embu County</a>
                                      <a href="#" className="navbar-item">Garissa County</a>
                                      <a href="#" className="navbar-item">Homa Bay County</a>
                                  </div>
                                </div>
                            </span> &nbsp;
                          </h4>
                          <figure className="image is-5by2 m-10">
                            <img src="images/g1.png" alt=""/>
                          </figure>
                      </div>
                      <div className="column">
                          <h4 className="title m-b-0 m-l-10 is-6">
                              <span className="text-bold display-inline-b text-larger fcsecondary-dark">TB Case Detection/Diagnosis Rate</span> <br/>
                              <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Time:</label>
                              <span className="text-bold display-inline-b p-l-0 m-l-0">
                                <div className="navbar-item has-dropdown is-hoverable">
                                  <a className="navbar-link m-l-0 p-l-0" href="#">
                                    May 2017 - Aug 2018
                                  </a>
                                  <div className="navbar-dropdown is-boxed p-5">
                                    <a className="navbar-item" href="#">
                                        From &nbsp; <span className="fcsecondary">May 2017&#9662;</span>
                                    </a>
                                    <a className="navbar-item" href="#">
                                        To &nbsp; <span className="fcsecondary">Aug 2018&#9662;</span>
                                    </a>
                                  </div>
                                </div>
                              </span> &nbsp;
                              <label for="" className="label fcgrey-dark-3 text-light display-inline-b m-r-0 p-r-0">Location:</label>
                              <span className="text-bold display-inline-b p-l-0 m-l-0">
                                <div className="navbar-item has-dropdown is-hoverable">
                                    <a className="navbar-link m-l-0 p-l-0" href="#">
                                      National
                                    </a>
                                    <div className="navbar-dropdown is-boxed p-5">
                                        <input type="text" className="input is-small m-0" placeholder="Search"/>
                                        <a href="#" className="navbar-item">National</a>
                                        <a href="#" className="navbar-item">Baringo County</a>
                                        <a href="#" className="navbar-item">Bomet County</a>
                                        <a href="#" className="navbar-item">Bungoma County</a>
                                        <a href="#" className="navbar-item">Busia County</a>
                                        <a href="#" className="navbar-item">Elgeyo Marakwet County</a>
                                        <a href="#" className="navbar-item">Embu County</a>
                                        <a href="#" className="navbar-item">Garissa County</a>
                                        <a href="#" className="navbar-item">Homa Bay County</a>
                                    </div>
                                  </div>
                              </span> &nbsp;
                            </h4>
                          <figure className="image is-5by2 m-10">
                            <img src="images/g2.png" alt=""/>
                          </figure>
                      </div>
                    </div>
                    <div className="div">
                      <div className="column notification shadow-heavy-light text-center is-vcentered">
                        <p><a href="login.html" className="is-link fcsecondary-dark">Log in</a> or <a href="#" className="is-link fcsecondary-dark">request for an account</a> to compare indicators</p>
                        <br/>
                        <a href="#" className="button is-secondary">Compare</a>
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
                      <div className="columns m-l-15 p-0 m-b-0">
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-normal">Source:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcgrey-dark-3 text-normal">
                                  <a href="#"><span className="tag is-secondary is-dark">{one_ind.date_created}</span></a>
                                </label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>
                      <div className="columns m-l-15 p-0 m-b-0">
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-normal">Date created:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcgrey-dark-3 text-normal">{one_ind.date_created}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>
                      <div className="columns m-l-15 p-0 m-b-0">
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-normal">Last updated:</label>
                        </div>
                        <div className="column text-bold p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.indicators.map(one_ind => (
                                <label for="" className="label fcblack-1">{one_ind.last_updated}</label>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>
                      <div className="columns m-l-15 p-0 m-b-0">
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-normal">Geo-scope:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {props.indicatorData.result.dictionary.indicators.length > 0 ?
                              props.indicatorData.result.dictionary.orgunits.map(one_org => (
                                <a href="#"><span className="tag is-success is-dark">{one_org.name}</span></a>
                              )) : ""
                            } &nbsp;
                        </div>
                      </div>
                      <div className="columns m-l-15 p-0 m-b-0">
                        <div className="column is-one-third p-5">
                          <label for="" className="label fcgrey-dark-3 text-normal">Time-span:</label>
                        </div>
                        <div className="column text-normal p-b-15 p-t-5">
                            {/* <label for="" className="label fcblack-1 display-inline-b">1<sup>st</sup> Jan, 2003</label> */}
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
  const { id } = context.query; //get GET params sent to this page
  const { indicatorId } = context.query; //get GET params sent to this page
  console.log(`Indicator ID == ${id}`);
  const fetchIndicatorData = await fetch(`http://41.89.94.105/dsl/api/indicators/${id}`);
  const indicatorData = await fetchIndicatorData.json();

  console.log(`Indicator fetched. ID: ${id}`);

  return { indicatorData };
};


export default Page;
