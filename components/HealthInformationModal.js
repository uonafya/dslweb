import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'
import {FetchCountyList} from './utils/Helpers'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'
import IndicatorLineGraph from './utils/IndicatorLineGraph'

export default class HealthInfomation extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      period: 2019,
      ouid: 18,
      countyList: []
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleChangePeriod = this.handleChangePeriod.bind(this);
    this.handleOrgUnitChange = this.handleOrgUnitChange.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleChangePeriod(year) {
    this.setState({ period: year });
    console.log(event.target.value);
  }

  handleOrgUnitChange(orgUnitId) {
    this.setState({ ouid: orgUnitId });
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      period: 2019,
      ouid: 18
     });
  }

  componentDidMount(){
    Modal.setAppElement('#healthinfomation')
  }

  render () {
    return (

      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p onClick={this.handleOpenModal} className="subtitle text-vertical-rl">Health Information</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
          <section style={{paddingBottom: "0" }} className="section p-t-10">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
            <span style={{display: "inline-block", width: "100%", textAlign: "center"}}>
              <h4 style={{fontSize: "150%", fontWeight: "bold"}}>Health Information</h4>
            </span>
          </section>

          {/* content area */}
          <section className="section">
            <div className="columns">
              <div className="column "><strong>Health System</strong></div>
              <div className="column "><strong>Description</strong></div>
            </div>
            <div className="columns is-0">
                <div className="column is-one-fifth p-10 card m-5">
                  <a href="https://hiskenya.org" target="_blank">
                    <img src="/static/images/khis.png" className="carousel-images mx-auto" alt="Partners"/>
                    <hr className="m-t-0 m-b-0"/>
                    <h5 className="text-bold text-center fcblack-1">Kenya Health Information System (KHIS)</h5>
                  </a>
                </div>
                <div className="column">
                  <p>
                    The Kenya District Health Information system is used by MOH for reporting at facility , community unit ,county,sub-county , ward and National levels.The DHIS2 Kenya system can be accessed online at hiskenya.org. User credentials are required to access this instance ; these credentials can only be granted by the Ministry of Health. Currently DHIS2 Kenya system is supporting both service and community data reporting.
                  </p>
                </div>
            </div>


            <div className="columns is-0">
                <div className="column is-one-fifth p-10 card m-5">
                  <a href="http://kmhfl.health.go.ke/#/home" target="_blank">
                    <img src="/static/images/khmfl.png" className="carousel-images mx-auto" alt="Partners"/>
                    <hr className="m-t-0 m-b-0"/>
                    <h5 className="text-bold text-center fcblack-1">Kenya Master Health Facility List (KMHFL)</h5>
                  </a>
                </div>
                <div className="column">
                  <p>
                    Kenya Master Health Facility List (KMHFL) public is an application with all health facilities and community units in Kenya that can be viewed by the public. Each health facility and community unit is identified with unique code and their details describing the geographical location, administrative location, ownership, type and the services offered.
                  </p>
                </div>
            </div>



          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}
