import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';
import SurveyDataMiddleware from '../utils/survey/SurveyDataMiddleware'
import {uhc,uhc_groups} from '../../resources/mappings'

export default class ServicesAvailability extends React.Component {

  constructor () {
    super();
    this.state = {
      showModal: false,
      indicatorMap: null
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({
      showModal: false,
      period: 2019,
      ouid: 18
     });
  }

  componentDidMount(){
    let indicatorMap=uhc.groups[uhc_groups.SERVICESAVAILABILITY]['indicators'];
    this.setState({
      indicatorMap: indicatorMap
    });

  }

  render () {
    let charts = null;
    let indicatorMap=this.state.indicatorMap;
    let rowsTags=[];
    let rowTags=[]
    for(var key in indicatorMap){

      let columnTag=
        <div class="column ">
          <div className="box m-5">
            <h5 className="title m-b-0 m-l-10 is-6 fcprimary-dark text-caps text-center">{indicatorMap[key]['name']}</h5>
            <br/>
            <SurveyDataMiddleware indicatorId={key} indicatorSource={indicatorMap[key]['sourceId']}/>
          </div>
        </div>

        //create two columns with rows of chart
        if(rowTags.length!=2){
          rowTags.push(columnTag);
        }else{
          rowsTags.push(<div class="columns">{rowTags}</div>);
          rowTags=[];
          rowTags.push(columnTag);
        }

    }
    if(rowTags.length!=0) rowsTags.push(<div class="columns">{rowTags}</div>);
    console.log(rowTags);
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
          <section class="section">

            {rowsTags}

          </section>
          {/*--- end content area*/}


        </Modal>
      </div>
    );
  }
}
