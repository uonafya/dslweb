import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'
import IndicatorLineGraph from './utils/IndicatorLineGraph';
import CadreGroupPieChart from './CadreGroupPie';
import {FetchCountyList} from './utils/Helpers'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'

export default class HealthWorkForce extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      date: 2019,
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
    this.setState({ date: year });
    console.log(event.target.value);
  }

  handleOrgUnitChange(orgUnitId) {
    this.setState({ ouid: orgUnitId });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentDidMount(){
    Modal.setAppElement('#healthworkforce')
  }

  render () {
    return (

      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p  onClick={this.handleOpenModal} className="subtitle text-uppercase fcwhite m-b-5">Health Workforce</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
          <section class="section">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
          </section>
          <section class="section">
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
                  <CadreGroupPieChart pe={this.state.date} ouid={this.state.ouid} title={"Cadre Grouop Distribution"}/>
                </div>
                <div class="column">
                    <CadreGroupPieChart pe={this.state.date} ouid={this.state.ouid} title={"Cadre Distribution - by cadre group"}/>
                </div>
            </div>
          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}
