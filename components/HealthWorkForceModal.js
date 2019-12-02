import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'
import IndicatorLineGraph from './utils/IndicatorLineGraph';
import CadreGroupPieChart from './CadreGroupPie';
import {FetchCountyList} from './utils/Helpers'
import CountyDropDown from './utils/CountyDropDown'
import YearDropDown from './utils/YearDropDown'
import CadreCountTable from './CadreAllocationTable'

export default class HealthWorkForce extends React.Component {

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
          <section style={{paddingBottom: "0" }} class="section">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
            <span style={{display: "inline-block", width: "100%", textAlign: "center"}}>
              <h4 style={{fontSize: "150%", fontWeight: "bold"}}>Health Workforce Distribution</h4>
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
                  <CadreGroupPieChart pe={this.state.period} ouid={this.state.ouid} title={"Distribution of facility human resource by Cadre grouping"}/>
                </div>
                <div class="column">
                  <CadreCountTable pe={this.state.period} ouid={this.state.ouid} />
                </div>
            </div>
          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}
