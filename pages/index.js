import SimpleSlider from '../components/utils/SimpleSlider'
import  IndicatorLineGraph from '../components/utils/IndicatorLineGraph'
import IndicatorLineBarGraph from '../components/utils/IndicatorBarGraph'
import UhcIndicators from '../components/LandingPageUhc'
import MalariaIndicators from '../components/LandingPageMalaria'
import LandingCadrePieChart from '../components/CadreGroupDistribution'
import FacilityTypeCountPieChart from '../components/FacilityDistribution'
import Map from '../components/Map'
import { fetchIndicators } from '../components/utils/Helpers'

import Link from 'next/link'
import { withRouter } from 'next/router'
import Router from 'next/router'
import Layout from '../components/Layout'


const Home = withRouter(props => (
  <div>
    <Layout>
      <section className="hero is-link is-fullheightz is-fullheight-with-navbarz m-t-50">
        <div className="hero-body p-t-40 p-b-40 text-center">
          <div className="container p-t-30 p-b-30">
            <div className="columns">
              <div className="column">
                  <div className="field has-addons herosearch-container">
                    <div className="control">
                      <input className="input text-left herosearch" type="text" name="search" placeholder="Find an indicator or dashboard"/>
                    </div>
                    <div className="control">
                      <button className="button is-info"
                        onClick={
                          () => {
                            console.log("searching ============================== " )
                            const searchTerm = document.getElementsByName("search")[0].value;
                            const newRoute = `/indicators?search=${encodeURI(searchTerm)}`;
                            encodeURI(searchTerm).length>2 ? Router.push(newRoute) : console.log('////////// bad search term')
                          }
                      }>
                        <i className="fas fa-search"></i>
                      </button>
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
        <div className="container text-left p-5 m-b-10">
          <p>
            <strong>Data Service Layer</strong>, Is an integration and aggregation of health and related data sources that could potentially impact on health. It is a platform for collaboration and sharing of health information with key interest in analysis, prediction, anticipation of diverging and converging health factors. This will in the end support M&E functions for decision making.
          </p>
        </div>
        <div className="container">
            <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">At a glance</h4>
            <div className="columns has-same-height is-gapless">
              <MalariaIndicators/>
              <UhcIndicators/>
            </div>

            <div className="columns has-same-height is-gapless">
              <LandingCadrePieChart/>
              <FacilityTypeCountPieChart/>
            </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading m-b-20">
            <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">Map View Explorer</h4>
            <p>Overview of county data for each indicator</p>

          <Map key = {props.id} dslIndicators = {props.dslIndicators} years = {props.years} />
          </div>
      </section>

      <section className="section">
          <div className="section-heading m-b-20">
              <h4 className="title is-5 text-center text-uppercase fcsecondary-dark text-bold">DSL Partners</h4>
          </div>
          <div className="container hide-overflow">
              <div className="columns">
                  <div className="column is-one-fifth p-10 card m-5">
                    <a href="https://www.usaid.gov/kenya" target="_blank">
                      <img src="/static/images/usaid.jpeg" className="carousel-images mx-auto" alt="Partners"/>
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">USAID Kenya</h5>
                    </a>
                  </div>
                  <div className="column is-one-fifth p-10 card m-5">
                    <a href="https://www.uonbi.ac.ke/" target="_blank">
                      <img src="/static/images/uon.jpeg" className="carousel-images mx-auto" alt="Partners" />
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">University of Nairobi</h5>
                    </a>
                  </div>
                  <div className="column is-one-fifth p-10 card m-5">
                    <a href="http://www.health.go.ke/" target="_blank">
                      <img src="/static/images/MOH.png" className="carousel-images mx-auto" alt="Partners"/>
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">Ministry of Health</h5>
                    </a>
                  </div>
                  <div className="column is-one-fifth p-10 card m-5">
                    <a href="http://www.kemsa.co.ke/" target="_blank">
                      <img src="/static/images/kemsa.jpeg" className="carousel-images mx-auto" alt="Partners"/>
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">KEMSA</h5>
                    </a>
                  </div>
                  <div className="column is-one-fifth p-10 card m-5">
                    <a href="hiskenya.org" target="_blank">
                      <img src="/static/images/khis.png" className="carousel-images mx-auto" alt="Partners"/>
                      <hr className="m-t-0 m-b-0"/>
                      <h5 className="text-bold text-center fcblack-1">KHIS</h5>
                    </a>
                  </div>
              </div>
          </div>

      </section>
    </Layout>
  </div>
));

//  async function handleMapIndicator(indicator) {
//   //console.info("<<<<<<<<< "+JSON.stringify(indicator)+" >>>>>>>>>>");
//   let yrr = document.getElementById("mapyr").value
//   document.getElementById("maptitle").innerHTML = indicator.name+" - "+yrr;

//   var elems = document.querySelectorAll(".maplink");
//   [].forEach.call(elems, function(el) {
//       el.className = el.className.replace(/\btext-bold fcsecondary\b/, "");
//   });
// }
Home.getInitialProps = async function(context) {

  const mapFilterYear = 2019;
  const mapFilterIndicator = 21030
  let { indicatorsData, loading } = await fetchIndicators();
  const years = ["2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011"];
  return { dslIndicators: indicatorsData, years, error: false, loading };
};


export default Home;
