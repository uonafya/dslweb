import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import  IndicatorLineBarGraph from '../utils/IndicatorBarGraph'
import {FetchCountyList, fetchSurveyData} from '../utils/Helpers'
import CountyDropDown from '../utils/CountyDropDown'
import YearDropDown from '../utils/YearDropDown'
import IndicatorLineGraph from '../utils/IndicatorLineGraph'
import Button from '@material-ui/core/Button';
import OrgUnitNestedMenu from '../utils/OrgUnitNestedMenu'
import {uhc,uhc_groups} from '../../resources/mappings'
export default class ServicesAvailability extends React.Component {

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

  handleOrgUnitChange(orgUnitObject) {
    console.log(orgUnitObject);
    this.setState({ ouid: orgUnitObject });
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      period: 2019,
      ouid: 18
     });
  }

  componentDidMount(){
    console.log(uhc_groups.SERVICESAVAILABILITY);
    console.log(`${uhc_groups}[SERVICESAVAILABILITY]`);
    console.log(uhc.groups[uhc_groups.SERVICESAVAILABILITY]);
    (async () => {
      let indicatorMap=uhc.groups[uhc_groups.SERVICESAVAILABILITY]['indicators'];
      for(var key in indicatorMap){
        let returnedData=await fetchSurveyData(indicatorMap[key]['sourceId'],key);
        console.log(returnedData);
      }

     })();
    //Modal.setAppElement('#servicesavailability')
  }

  render () {
    return (

      <div>
        {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
        <p onClick={this.handleOpenModal} className="text-uppercase">Essential Services Availability</p>
        <Modal
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example">
          <section style={{paddingBottom: "0" }} className="section p-t-10">
            <a href="#" onClick={this.handleCloseModal}><i  class="far fa-times-circle fa-2x " style={{color: "red"}}></i></a>
            <span style={{display: "inline-block", width: "100%", textAlign: "center"}}>
              <h4 style={{fontSize: "150%", fontWeight: "bold"}}>Essential Services Availability</h4>
            </span>
          </section>

          {/* content area */}
          <section className="section">
            
          </section>
          {/*--- end content area*/}

        </Modal>
      </div>
    );
  }
}
