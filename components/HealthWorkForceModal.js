import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from './utils/IndicatorBarGraph'
import LineChart from './utils/DemoLine'
import IndicatorLineGraph from './utils/IndicatorLineGraph';
import CadreGroupPieChart from './CadreGroupPie';
import {FetchCountyList} from './utils/Helpers'

Modal.setAppElement('#healthworkforce')

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

  handleChangePeriod(event) {
    this.setState({ date: event.target.value });
    console.log(event.target.value);
  }

  handleOrgUnitChange(event) {
    this.setState({ ouid: event.target.value });
  }


  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentDidMount(){
    //fetch counties
    (async () => {
      let returnedData = await FetchCountyList();
      this.setState({
       countyList: returnedData
      });
    })()
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
                      <select onChange={this.handleChangePeriod}  value={this.state.date}>
                        <option>Select dropdown</option>
                        <option value="2014">2014</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="column is-narrow">
                  <h6>County:</h6>
                  <div class="control">
                    <div class="select">
                    <select onChange={this.handleOrgUnitChange}  value={this.state.date}>
                      {this.state.countyList.map(entry =>
                        <option key={entry.id} value={entry.id}>{entry.name}</option>
                      )};
                    </select>
                    </div>
                  </div>
                </div>
            </div>
          </section>

          <CadreGroupPieChart pe={this.state.date} ouid={this.state.ouid} id={7} title={"new title"}/>
        </Modal>
      </div>
    );
  }
}
