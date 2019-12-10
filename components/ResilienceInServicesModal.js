import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'
import {FetchCountyList} from './utils/Helpers'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'
import IndicatorLineGraph from './utils/IndicatorLineGraph'

export default class ResilienceInServices  extends React.Component {

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
    Modal.setAppElement('#resilienceinservices')
  }

  render () {
    return (

      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p onClick={this.handleOpenModal} className="text-uppercase fcwhite">Resilience in Essential Services Provision</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
          <section style={{paddingBottom: "0" }} class="section">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
            <span style={{display: "inline-block", width: "100%", textAlign: "center"}}>
              <h4 style={{fontSize: "150%", fontWeight: "bold"}}>Essential Services Coverage</h4>
            </span>
          </section>
          <section style={{paddingBottom: "0" }} class="section">
            <div class="columns">
                <div class="column is-narrow">
                  <h6>Period:</h6>
                  <div class="control">
                    <div class="select">
                      <YearDropDown handler={this.handleChangePeriod} />
                    </div>
                  </div>
                </div>
                <div class="column is-narrow">
                  <h6>County:</h6>
                  <div class="control">
                    <div class="select">
                      <CountyDropDown handler={this.handleOrgUnitChange}/>

                    </div>
                  </div>
                </div>
            </div>
          </section>

          {/* content area */}
          <section class="section">
            <div class="columns">
                <div class="column ">
                  <div className="box m-5">
                    <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">IP - Average Length of Stay for the period:  {this.state.period}</h5>
                    <br/>
                    <IndicatorLineGraph id={96871} pe={this.state.period} ouid={this.state.ouid}/>
                  </div>
                </div>

            </div>

          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}
